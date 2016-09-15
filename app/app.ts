import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform, Nav, Events, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Welcome} from './pages/welcome/welcome';
import {MainMenu, MenuItemInterface} from './modules/menus/main.menu';
import {Auth, USER_ROLES} from './entities/user'
import {UserEdit} from "./pages/user/user-edit";
import {UserRead} from './modules/user.service';

@Component({
    templateUrl: 'build/app.html',
    providers: [UserRead]
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
    private login:UserRead) {

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

    registerMenuItems(){
        this.appPages = this.menu.getMenuItems();
    }

    registerListeners() {

        this.ev.subscribe('user:signup', (params) => {
            //this.auth.fill(params[0]);
            //this.menu.enable();
            //this.appPages = this.menu.getMenuItems();
            //this.nav.setRoot(SignUpStep2);
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

    // TODO to remove
    //gotoUserEdit(){
    //    this.menu.getMenuInstance().close();
    //    this.nav.push(UserEdit);
    //}


    performAutoLogin(){
        this.login.findWithCredentials('', '')
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