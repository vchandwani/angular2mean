import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService) {
        this.authService = authService;
    }
    HeaderComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-header',
                    template: "\n        <header class=\"row\">\n            <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-pills\">\n                    <li routerLinkActive=\"active\"><a [routerLink]=\"['/messages']\">Messenger</a></li>\n                    <li routerLinkActive=\"active\" *ngIf=\"!isLoggedIn()\"><a [routerLink]=\"['/auth/signup']\">Authentication</a></li>\n                    <li routerLinkActive=\"active\" *ngIf=\"isLoggedIn()\"><a [routerLink]=\"['/auth']\">Authentication</a></li>\n                    <li routerLinkActive=\"active\" *ngIf=\"isLoggedIn()\"><a [routerLink]=\"['/portfolio']\">Portfolio</a></li>\n                    <li routerLinkActive=\"active\" *ngIf=\"isLoggedIn()\"><a [routerLink]=\"['/portfolio-detail']\">Portfolio Details</a></li>\n                </ul>\n            </nav>\n        </header>\n    "
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: AuthService, },
    ]; };
    return HeaderComponent;
}());
export { HeaderComponent };
