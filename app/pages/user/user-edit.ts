import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, Events} from 'ionic-angular';
import {Auth, UserInterface} from '../../entities/user';
import {AvatarEdit} from './avatar-edit';

@Component({
    templateUrl: 'build/pages/user/user-edit.html',
    directives: [AvatarEdit]
})
export class UserEdit implements OnInit {

    user:UserInterface;

    constructor(private auth:Auth,
                private nav:NavController,
                private ev:Events,
                private alert:AlertController) {
    }

    ngOnInit():void {
        this.user = this.auth.user();
    }

    saveUserData(form) {

        if (!form.valid) {
            let alert = this.alert.create({
                title: 'Atenção',
                subTitle: 'Todos os campos são obrigatórios',
                buttons: ['OK']
            });
            alert.present();
        } else {

        }
    }

    /**
     * TODO implement camera access
     */
    getUserPhoto() {
        // get image
        let newAvatar = '';

        // update user
        this.user.avatar = newAvatar;

        // update on Auth instance
        this.auth.avatar = newAvatar;

        this.ev.publish('user:updated', this.auth);

    }
}