import { Injectable }    from '@angular/core';
import {BaseService} from "../../modules/core/base.service";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import '../../modules/core/rxjs-operators';

@Injectable()
export class SignUpService extends BaseService{

    constructor(protected http:Http) {
        super(http);
    }

    /**
     * TODO just faking it. It should be a POST and get the user back
     * Send user data to store
     */
    create(user):Observable<any> {

        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.mock.user)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     *
     * @param res
     * @returns {Object}
     */
    protected extractData(res:Response):[Object] {
        let body = res.json();
        return body.data || {};
    }


}