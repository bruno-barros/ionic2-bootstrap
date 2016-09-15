import {Component, Output, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {Events, IONIC_DIRECTIVES} from 'ionic-angular';
import {Auth} from "../../entities/user";

@Component({
    selector: 'user-card',
    templateUrl: 'build/modules/menus/user-card.html',
    directives: [IONIC_DIRECTIVES]
})
export class UserCard implements OnInit, OnDestroy{


    @Output() onEdit: EventEmitter<any> = new EventEmitter();

    user:{avatar:string, name:string} = {
        avatar: '', name: ''
    };
    private _userSignedUpEvent:(patams:any[]) => void;
    private _userLoginEvent:(patams:any[]) => void;
    private _userUpdatedEvent:(patams:any[]) => void;

    constructor(private auth:Auth, private ev:Events){}

    ngOnInit():void{

        this._userSignedUpEvent = (params) => {
            this.user.avatar = params[0].avatar;
            this.user.name = params[0].name;
        };

        this._userLoginEvent = (params) => {
            this.user.avatar = params[0].user().avatar;
            this.user.name = params[0].user().name;
        };

        this._userUpdatedEvent = (params) => {
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
    gotoUserEdit(){
        this.onEdit.emit(null);
    }
}