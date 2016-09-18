import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Login} from '../login/login.component';
import {SignUpStep1} from '../signup/signup.step1.component';
import {MainMenu} from '../../modules/menus/main.menu';

@Component({
    templateUrl: 'build/pages/welcome/welcome.html'
})
export class Welcome implements OnInit{

    constructor(private nav:NavController, private menu:MainMenu){}

    ngOnInit():void {
    }

    ionViewLoaded():void {
        this.menu.disable();
    }

    gotoLogin(){
        this.nav.push(Login);
    }

    gotoSignup(){
        this.nav.push(SignUpStep1);
    }

}