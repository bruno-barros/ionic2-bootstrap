import {Injectable, Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 *
 administrator, school, school admin, school financial, staff, parent, helper, children
 */
export enum USER_ROLES {adm = 0, sch = 1, sadm = 2, sfin = 3, stf = 4, par = 5, hlp = 6, chi = 7};

export interface UserInterface {
    id?:number,
    account_status: number,
    name: string,
    login: string,
    email: string,
    emails: string[],
    avatar: string,
    role: string

};

@Injectable()
export class User {

    protected defaultRole = 5;

    protected model:UserInterface = {
        id:null,
        "account_status": null,
        name: null,
        login: null,
        email: null,
        emails: [],
        avatar: '',
        role: USER_ROLES[this.defaultRole]
    };


    /**
     * Just store user data to access later
     * @param data
     */
    fill(data) {

        let email = '';
        if (typeof data.emails !== 'string') {
            email = data.emails[0];
        } else {
            email = data.emails || data.email;
        }

        this.model.id = data.id;
        this.model.name = data.name || 'desconhecido';
        this.model.login = email || '';
        this.model.email = email || '';// just keep main email easy to get
        this.model.emails = data.emails || [];
        this.model.avatar = data.avatar || '';
        //this.model.role = data.type || USER_ROLES[this.defaultRole];


    }


    /**
     * Return user
     */
    user():UserInterface {
        return this.model;
    }

    /**
     * Return user model as string
     * @returns {string}
     */
    toJson():string {
        return JSON.stringify(this.user());
    }

    /**
     * Check user permission based on a action
     */
    can() {

    }



    /**
     * Get the user role as string
     * @returns {string}
     */
    get role() {
        return this.model.role;
    }

    set role(_role:any) {

        let newRole:string;
        if (typeof _role === 'string') {
            newRole = USER_ROLES[USER_ROLES[_role]]
                || USER_ROLES[this.defaultRole];
        } else {
            newRole = USER_ROLES[_role] || USER_ROLES[this.defaultRole];
        }

        this.model.role = newRole;
    }

    set avatar(newAvatar:string){
        this.model.avatar = newAvatar;
    }


}



@Injectable()
export class Auth extends User {

    //constructor(@Inject(UserRead) private userRead:UserRead){super();}

    /**
     * Check if is logged in
     * @returns {boolean}
     */
    check():boolean {
        if (this.model && this.model.id && this.model.role) {
            return true;
        }
        return false;
    }


    /**
     *
     * @param neededRole
     * @param modifier
     * @returns {boolean}
     */
    is(neededRole:string|number, modifier:string = '='):boolean {

        if(!this.check()){
            return false;
        }

            let authRole:any = USER_ROLES[this.model.role];
        let needRole:any = USER_ROLES[neededRole];

        // get the number
        if(typeof authRole !== 'number'){
            authRole = USER_ROLES[USER_ROLES[this.model.role]];
        }
        // get the number
        if(typeof needRole !== 'number'){
            needRole = USER_ROLES[USER_ROLES[neededRole]];
        }

        if((modifier === '=' || modifier === '<=' || modifier === '>=')
            && (authRole === needRole)){
            return true;
        }
        if((modifier === '!=' || modifier === '<>')
            && (authRole !== needRole)){
            return true;
        }
        if((modifier === '>' || modifier === '>=')
            && (authRole > needRole)){
            return true;
        }
        if((modifier === '<' || modifier === '<=')
            && (authRole < needRole)){
            return true;
        }

        return false;
    }

}

@Injectable()
export class Child extends User {

    // TODO maybe we should overwrite because a child
    // TODO would be very different of a regular user
    //fill()


}