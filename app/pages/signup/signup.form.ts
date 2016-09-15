import {Component, OnInit, OnDestroy} from '@angular/core';
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

    submitted:boolean = false;

    private _ModalCloseHandler:() => void;

    constructor(private nav:NavController,
                private ev:Events,
                private auth:Auth,
                private service:SignUpService,
                private loading:LoadingController,
                private modal:ModalController) {
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

    onSubmit(form) {

        this.submitted = true;

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