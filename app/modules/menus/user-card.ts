import {Component, Output, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {Events, IONIC_DIRECTIVES, NavController} from 'ionic-angular';
import {Auth} from "../../entities/user";
import {MainMenu} from './main.menu';
import {UserEdit} from '../../pages/user/user-edit.component';

@Component({
    selector: 'user-card',
    templateUrl: 'build/modules/menus/user-card.html',
    directives: [IONIC_DIRECTIVES]
})
export class UserCard implements OnInit, OnDestroy {


    @Output() onEdit:EventEmitter<any> = new EventEmitter();

    user:{avatar:string, name:string} = {
        avatar: '', name: ''
    };
    private _userSignedUpEvent:(patams:any[]) => void;
    private _userLoginEvent:(patams:any[]) => void;
    private _userUpdatedEvent:(patams:any[]) => void;

    constructor(private auth:Auth,
                private ev:Events,
                private menu:MainMenu,
                private nav:NavController) {
    }

    ngOnInit():void {

        this._userSignedUpEvent = (params) => {
            // user = params[0]
            this.user.avatar = params[0].avatar;
            this.user.name = params[0].name;
        };

        this._userLoginEvent = (params) => {
            // Auth = params[0]
            this.user.avatar = params[0].user().avatar;
            this.user.name = params[0].user().name;
        };

        this._userUpdatedEvent = (params) => {
            // Auth = params[0]
            this.user.avatar = params[0].user().avatar;
            this.user.name = params[0].user().name;
        };

        this.ev.subscribe('user:signup', this._userSignedUpEvent);
        this.ev.subscribe('user:login', this._userLoginEvent);
        this.ev.subscribe('user:updated', this._userUpdatedEvent);
    }

    ngOnDestroy():void {
        this.ev.unsubscribe('user:signup', this._userSignedUpEvent);
        this.ev.unsubscribe('user:login', this._userLoginEvent);
        this.ev.unsubscribe('user:updated', this._userUpdatedEvent);
    }


    /**
     * Tell to app to navigate to user edit page
     */
    gotoUserEdit() {
        this.menu.getMenuInstance().close();
        this.nav.push(UserEdit);
        //this.onEdit.emit(null);
    }
}