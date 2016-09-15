import {Injectable} from '@angular/core';
import {BaseService} from "./core/base.service";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import './core/rxjs-operators';

/**
 * Dedicated service to read routines
 */
@Injectable()
export class UserRead extends BaseService{

    constructor(protected http:Http) {
        super(http);
    }

    /**
     * TODO just faking it
     */
    findWithCredentials(login:string, password:string):Observable<any> {

        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.mock.user)
            .map(this.extractData)
            .catch(this.handleError);
    }

}