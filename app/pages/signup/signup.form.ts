import {Component, OnInit, OnDestroy} from '@angular/core';
//import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController, NavController, Events, LoadingController} from 'ionic-angular';
import {TermsService} from './terms.service';
import {Auth} from '../../entities/user';
import {SignUpService} from './signup.service';

@Component({
    templateUrl: 'build/pages/signup/signup.form.html',
    providers: [SignUpService]
})
export class SignUpForm implements OnInit, OnDestroy {


    user:{
        name:string, email: string, pwd: string, pwd_conf: string, agreed:boolean
    } = {
        name: '',
        email: '',
        pwd: '',
        pwd_conf: '',
        agreed: false
    };

    signUpForm:FormGroup;

    submitted:boolean = false;

    private _ModalCloseHandler:() => void;

    constructor(private nav:NavController,
                private ev:Events,
                private auth:Auth,
                private fb:FormBuilder,
                private service:SignUpService,
                private loading:LoadingController,
                private modal:ModalController) {


        this.signUpForm = fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            pwd: ['', Validators.required],
            pwd_conf: ['', Validators.required],
            agreed: [false, Validators.required],
        });
    }

    ngOnInit():void {
        this._ModalCloseHandler = () => {
            this.user.agreed = true;
        };
        this.ev.subscribe('modal:close', this._ModalCloseHandler);
    }

    ngOnDestroy():void {
        this.ev.unsubscribe('modal:close', this._ModalCloseHandler);
    }

    onSubmit() {

        //console.log(this.signUpForm.valid);
        //console.log(this.signUpForm.value);

        //this.submitted = true;

        // TODO just faking server communication
        let loading = this.loading.create({
            content: "Simulação...",
            duration: 3000
        });
        loading.present();

        this.service.create(this.user)
            .subscribe((user) => {
                this.ev.publish('user:signup', user);
            });

    }

    openTerms() {
        let modal = this.modal.create(TermsService);
        modal.present();
    }

}