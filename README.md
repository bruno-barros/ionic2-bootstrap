# Ionic2 Bootstrap

## Settings.json

Create a `settings.development.json` and `settings.production.json` for configuration depending on environment.
See `settings.example.json` to example. 

## Events

`('user:signup', User)`

`('user:login', Auth)`
    
`('user:logout', id)`

`('user:updated', Auth)`

`('user:removed', id)`

`('user:login:fail', 'USER.LOGIN.FAIL')`


## Tests

Prepare for tests:

    $ npm install -g typings    
    $ typings install --save --global registry:dt/jasmine registry:dt/node
    
Running tests:

    $ npm test // unit
    
    $ npm run karma // run on browser with watchfy
    
    # e2e (aka. end-to-end, integration) - In two different shell windows
    # Make sure you don't have a global instance of Protractor
    $ npm start 
    $ npm run e2e
    
For a detailed test coverage: `./coverage/lcov-report/index.html`

Run specific test cases:

    fdescribe
    fit
    // @link http://thejsguy.com/2016/01/03/controlling-which-tests-run-in-jasmine.html
