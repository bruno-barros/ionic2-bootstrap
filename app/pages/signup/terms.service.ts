import {Component} from '@angular/core';
import {Modal, NavController,ViewController, NavParams, Events} from 'ionic-angular';
import {SignUpForm} from './signup.form.component';


@Component({
    templateUrl:'build/pages/signup/terms.service.html'
})
export class TermsService{
    name:string;

    constructor(
        private ev:Events,
        private params:NavParams,
        private viewCtrl: ViewController
        ) {}

    close() {
        this.ev.publish('modal:close');
        this.viewCtrl.dismiss();
    }

    ionViewLoaded():void {
        //console.log('form: ', this.share.name);
    }

}