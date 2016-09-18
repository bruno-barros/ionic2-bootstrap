import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SETTINGS} from '../../settings';
import {NavController, Events, AlertController} from 'ionic-angular';
import {MainMenu} from '../../modules/menus/main.menu';
import {SignUpStep1} from '../signup/signup.step1.component';
import {Auth} from '../../entities/user';
import {UserService} from '../../modules/user.service';
import {User} from "../../entities/user";

@Component({
    templateUrl: 'build/pages/login/login.html',
    providers: [UserService]
})
export class Login implements OnInit {

    data:{ login: string, pwd: string } = {login: '', pwd: ''};
    submitted = false;

    loginForm:FormGroup;

    constructor(protected nav:NavController,
                private auth:Auth,
                private ev:Events,
                private fb:FormBuilder,
                private menu:MainMenu,
                private userService:UserService,
                private alert:AlertController) {

        this.loginForm = fb.group({
            username: [''],
            password: ['']
        });
    }

    ngOnInit():void {
    }

    ionViewLoaded():void {
        // if logged, go to homepage
        if (this.auth.check()) {
            this.nav.setRoot(this.menu.getHome());
        }
    }

    onLogin(form) {
        this.submitted = true;


        if (!form.valid) {
            this.showErrorMessage('Preencha todos os campos');
        } else {
            //this.userData.login(this.login.username);

            // TODO if success log user in
            this.userService.findWithCredentials(this.data.login, this.data.pwd)
                .subscribe((validUser) => {

                    if (validUser) {
                        this.auth.fill(validUser);
                        this.ev.publish('user:login', this.auth);
                    } else {
                        this.showErrorMessage('Ops', 'Houve uma falha na autenticação.');
                        this.ev.publish('user:login:fail', 'USER.LOGIN.FAIL');
                    }

                    this.submitted = false;
                });

        }
    }

    /**
     *
     * @param title
     * @param body
     */
    showErrorMessage(title:string = '', body:any = null) {

        if (body == null) {
            body = title;
            title = 'Atenção';
        }

        let alert = this.alert.create({
            title: title,
            subTitle: body,
            buttons: ['OK']
        });
        alert.present();
    }

    gotoCreateAccount() {
        this.nav.push(SignUpStep1);
    }

    // TODO this page need to be build
    gotoNeedHelp() {
    }

    onSignup() {
        //this.nav.push(SignupPage);
    }
}