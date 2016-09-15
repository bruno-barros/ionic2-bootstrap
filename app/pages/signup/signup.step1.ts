import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SignUpForm} from './signup.form';
@Component({
    templateUrl: 'build/pages/signup/signup.step1.html'
})



export class SignUpStep1 {


    constructor(private nav:NavController) {
    }

    /**
     * TODO need implementation
     * @param socialAccount
     */
    loginWith(socialAccount: 'facebook' | 'google'){

        // open modal
        // wait the social provider
        // if fails > show message
        // if success > redirect do form to get more fields
        //console.log(`Perform login with: ${socialAccount}`);

    }

    gotoCreateAccount() {
        this.nav.push(SignUpForm);
    }

}