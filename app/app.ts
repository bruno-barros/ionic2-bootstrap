import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform, Nav, Events, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Welcome} from './pages/welcome/welcome';
import {MainMenu, MenuItemInterface} from './modules/menus/main.menu';
import {Auth, USER_ROLES} from './entities/user'
import {UserEdit} from "./pages/user/user-edit";
import {UserService} from './modules/user.service';
import {UserCard} from './modules/menus/user-card';
import {UserDb} from './modules/user.db';
import {DB} from './modules/core/base.db';


@Component({
    templateUrl: 'build/app.html',
    providers: [UserService, NavController],
    directives: [UserCard]
})
export class MyApp {
    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    //noinspection TypeScriptValidateTypes
    @ViewChild(Nav) nav:Nav;

    // List of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    appPages:MenuItemInterface[];
    //loggedInPages:MenuItemInterface[];
    //loggedOutPages:MenuItemInterface[];

    rootPage:any = Welcome;

    constructor(private platform:Platform,
                private menu:MainMenu,
                private auth:Auth,
                private ev:Events,
                private userService:UserService) {

        this.initializeApp();

    }

    private initializeApp():void {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();

            this.registerMenuItems();
            this.registerListeners();
            //this.performAutoLogin();// << development purpose

            var u = new UserDb();
            //u.reset().then((res) => {
            //   console.log('reseted');
            //u.create({name:'Bruno'});
            //}, (e) => {
            //    console.log(e);
            //});
            //u.create({name:'Anna'});

        });
    }

    openPage(page:MenuItemInterface) {
        // the nav component was found using @ViewChild(Nav)
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            this.nav.setRoot(page.component, {tabIndex: page.index});
        } else {
            this.nav.setRoot(page.component);
        }

    }

    registerMenuItems() {
        this.appPages = this.menu.getMenuItems();
    }

    registerListeners() {

        this.ev.subscribe('user:signup', (params) => {
            this.auth.fill(params[0]);// log user
            this.menu.enable();// enable menu
            this.appPages = this.menu.getMenuItems();// fill menu with pages
            this.nav.setRoot(Home);
        });
        this.ev.subscribe('user:updated', (params) => {
            console.log('User updated: ', params[0].toJson());
        });
        this.ev.subscribe('user:login', (params) => {
            console.log('User loggedIn: ', params[0].toJson());

            this.menu.enable();
            this.appPages = this.menu.getMenuItems();
            this.nav.setRoot(Home);
        });
        this.ev.subscribe('user:logout', (userId) => {
            this.appPages = this.menu.getMenuItems();
            this.nav.setRoot(Login);
        });

    }

    // user-card event
    //gotoUserEdit(){
    //    this.menu.getMenuInstance().close();
    //    this.nav.push(UserEdit);
    //}


    performAutoLogin() {
        this.userService.findWithCredentials('', '')
            .subscribe((validUser) => {
                if (validUser) {
                    this.auth.fill(validUser);
                    this.ev.publish('user:login', this.auth);
                }

                setTimeout(() => {
                    //this.nav.setRoot(SomePage);
                }, 500);
            });
    }


}

ionicBootstrap(MyApp, [
    MainMenu,
    Auth
], {
    backButtonText: ''
});
