import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable, BehaviorSubject } from "rxjs";
import API from '../../core/api';
import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService) {}
    
    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(API.api_url+API.user, body, {headers: headers})
            .map((response: Response) => {
                response.json()
                this.errorService.handleSuccess(response.json());
                return Observable.throw(response.json());
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(API.api_url+API.userSignIn, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    logout() {
        localStorage.clear();
        this.errorService.handleSuccess({'title':'Logged Out','message':'','successs':true});
        return Observable.throw({'title':'Logged Out','message':'','successs':true});
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}