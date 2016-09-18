import {NavController} from 'ionic-angular';
import {Login} from '../../pages/login/login.component';

export abstract class BasePage {

    constructor(protected nav:NavController){

    }


    /**
     * TODO check if is logged in
     * Runs when the page has loaded.
     * This event only happens once per page being created and added to the DOM.
     * If a page leaves but is cached, then this event will not fire again
     * on a subsequent viewing.
     * The ionViewLoaded event is good place to put your setup code for the page.
     */
    ionViewLoaded():void {
        //this.nav.push(Login); // if not logged in
    }

    ionViewWillLeave():void {
    }

    ionViewDidLeave():void {
    }

    ionViewWillEnter():void {
    }

    ionViewDidEnter():void {
    }

    ionViewWillUnload():void {
    }

    ionViewDidUnload():void {
    }

}