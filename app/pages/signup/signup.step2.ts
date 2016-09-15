import {Component, OnInit} from '@angular/core';
import {NavController, Loading, Events} from 'ionic-angular';
import {Timeline} from '../timeline/timeline';
import {Auth, USER_ROLES} from '../../entities/user';
import  {WelcomeParent} from '../welcome/welcome.parent';
import  {WelcomeAdmin} from '../welcome/welcome.admin';

@Component({
    templateUrl: 'build/pages/signup/signup.step2.html'
})
export class SignUpStep2 implements OnInit{

    name:string;

    constructor(private nav:NavController,
                private auth:Auth,
                private ev:Events) {
    }

    ngOnInit(){
        this.name = this.auth.user().name;
    }

    iAm(iAm:USER_ROLES) {

        // TODO just faking server communication
        let loading = Loading.create({
            content: "Simulação...",
            duration: 3000
        });
        this.nav.present(loading);

        // just logged
        // go to first directions page
        setTimeout(() => {
            this.auth.role = iAm;
            this.ev.publish('user:updated', this.auth);

            if(this.auth.is(5, '<')){
                this.nav.setRoot(WelcomeAdmin);
            } else {
                this.nav.setRoot(WelcomeParent);
            }

        }, 2000);

    }
}