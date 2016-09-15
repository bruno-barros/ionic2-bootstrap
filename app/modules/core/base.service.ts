import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export abstract class BaseService {

    /**
     * Path to mocked object
     * @type {string}
     */
    protected mock:{user:string,children:string,child:string, post:string, posts:string, activities:string} = {
        "user": "mocks/user.json",
        "child": "mocks/user.child.json",
        "children": "mocks/users.children.json",
        "post": "mocks/post.json",
        "posts": "mocks/posts.json",
        "activities": "mocks/activities.json"
    };

    constructor(protected http:Http) {
    }


    /**
     *
     * @param res
     * @returns {any|{}}
     */
    protected extractData(res:Response):[Object|any[]] {
        let body = res.json();
        return body.data || {};
    }

    /**
     *
     * @param error
     * @returns {ErrorObservable}
     */
    protected handleError(error:any):Observable<any> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}