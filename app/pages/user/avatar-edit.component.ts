import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Auth} from "../../entities/user";
import {UserInterface} from "../../entities/user";

@Component({
    selector: 'user-avatar',
    template: `<div class="user-avatar">
    <button (click)="getUserPhoto()" clear dark class="edit"><ion-icon name="camera"></ion-icon></button>

        <div class="icon">
            <ion-icon name="contact" *ngIf="!user.avatar"></ion-icon>
            <img src="{{ user.avatar }}" *ngIf="user.avatar" />
        </div>
    </div>`
})
export class AvatarEdit {

    @Input('user') user:UserInterface;

    @Output('takePhoto') takePhoto:EventEmitter<any> = new EventEmitter();

    getUserPhoto(){
        this.takePhoto.emit(null);
    }
}