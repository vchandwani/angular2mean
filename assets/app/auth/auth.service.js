import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import API from '../../core/api';
import { ErrorService } from "../errors/error.service";
var AuthService = /** @class */ (function () {
    function AuthService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
    }
    AuthService.prototype.signup = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('https://powerful-ridge-82271.herokuapp.com/' + API.user, body, { headers: headers })
            .map(function (response) {
            response.json();
            _this.errorService.handleSuccess(response.json());
            return Observable.throw(response.json());
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    AuthService.prototype.signin = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('https://powerful-ridge-82271.herokuapp.com/' + API.userSignIn, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.clear();
        this.errorService.handleSuccess({ 'title': 'Logged Out', 'message': '', 'successs': true });
        return Observable.throw({ 'title': 'Logged Out', 'message': '', 'successs': true });
    };
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem('token') !== null;
    };
    AuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: Http, },
        { type: ErrorService, },
    ]; };
    return AuthService;
}());
export { AuthService };
