var gulp = require('gulp'),
    fs = require('fs'),
    gulpWatch = require('gulp-watch'),
    del = require('del'),
    runSequence = require('run-sequence'),
    argv = process.argv;


/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
var buildBrowserify = require('ionic-gulp-browserify-typescript');
var buildSass = require('ionic-gulp-sass-build');
var copyHTML = require('ionic-gulp-html-copy');
var copyFonts = require('ionic-gulp-fonts-copy');
var copyScripts = require('ionic-gulp-scripts-copy');
var tslint = require('ionic-gulp-tslint');

var isRelease = argv.indexOf('--release') > -1;
var isIonView = argv.indexOf('--ionview') > -1;

gulp.task('watch', ['clean'], function (done) {
    runSequence(
        ['sass', 'html', 'fonts', 'scripts'],
        function () {
            gulpWatch('app/settings.*.json', function () {
                gulp.start('settings');
            });
            gulpWatch('app/**/*.scss', function () {
                gulp.start('sass');
            });
            gulpWatch('app/**/*.html', function () {
                gulp.start('html');
            });
            buildBrowserify({watch: true}).on('end', done);
        }
    );
});

gulp.task('build', ['clean'], function (done) {
    runSequence(
        ['settings', 'sass', 'html', 'fonts', 'scripts'],
        function () {
            buildBrowserify({
                minify: isRelease,
                browserifyOptions: {
                    debug: !isRelease
                },
                uglifyOptions: {
                    mangle: false
                }
            }).on('end', done);
        }
    );
});

gulp.task('sass', buildSass);
gulp.task('html', copyHTML);
gulp.task('fonts', copyFonts);
gulp.task('scripts', copyScripts);
gulp.task('clean', function () {
    return del('www/build');
});

gulp.task('lint', tslint);

gulp.task('settings', function (cb) {

    var file = 'settings.development.json';
    if (isRelease || isIonView) {
        file = 'settings.production.json';
    }

    var json = require('./'+file);

    var settingsFile = `// !! This file will be overwritten by settings.*.json
`;
     settingsFile += 'export const SETTINGS = ';
     settingsFile += JSON.stringify(json);
     settingsFile += ';';

    fs.writeFile('app/settings.ts', settingsFile, cb);

});
