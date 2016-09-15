import {Component, Injectable, OnInit} from '@angular/core';
import {MenuController} from 'ionic-angular';
import {User, Auth} from "../../entities/user";
import {Home} from '../../pages/home/home';
import {Login} from '../../pages/login/login';
import {BasePage} from "../core/base.page";

export interface MenuItemInterface {
    title: string;
    type:string;//'link'|'dash'|'heading';
    component?: any;
    icon?: string;
    index?: number;
}


@Injectable()
export class MainMenu implements OnInit {

    activeMenu:string = '';

    loggedInPages:MenuItemInterface[] = [
        {title: 'Início', type: 'link', component: Home, icon: 'chatbubbles', index: 1},
        {title: '', type: 'dash'},
        {title: 'Conta', type: 'heading'},
        {title: 'Sair', type: 'link', component: Login, icon: 'log-out'}
    ];

    adminPages:MenuItemInterface[] = [
        {title: 'Início', type: 'link', component: Home, icon: 'chatbubbles'},
        {title: 'Conta', type: 'heading'},
        {title: 'Sair', type: 'link', component: Login, icon: 'log-out'}
    ];

    loggedOutPages:MenuItemInterface[] = [
        {title: 'Login', type: 'link', component: Login, icon: 'log-in'}
    ];

    constructor(private menu:MenuController, private auth:Auth) {

    }

    ngOnInit():void {
    }

    getMenuInstance():MenuController {
        return this.menu;
    }

    getActive():string {
        return this.activeMenu;
    }


    setDefault():void {
        this.activeMenu = 'menu-default';
        this.menu.enable(true, 'menu-default');
        //this.menu.enable(false, 'menu-admin');
    }

    setAdmin():void {
        this.activeMenu = 'menu-admin';
        this.menu.enable(false, 'menu-default');
        //this.menu.enable(true, 'menu-admin');
    }

    getHome():any {
        return Home;
    }

    enable():void {
        this.activeMenu = '';
        this.menu.enable(true, 'menu-default');
    }

    disable():void {
        this.activeMenu = '';
        this.menu.enable(false, 'menu-default');
        //this.menu.enable(false, 'menu-admin');
    }

    /**
     * Get menu array for user
     * @returns {MenuItemInterface[]}
     */
    getMenuItems():MenuItemInterface[] {
        if (this.auth.is(4, '<=')) {
            return this.adminPages;
        } else if (this.auth.is(5, '>=')) {
            return this.loggedInPages;
        }

        return this.loggedOutPages;
    }

}