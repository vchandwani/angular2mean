import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(spinnerService, authService, router) {
        this.spinnerService = spinnerService;
        this.authService = authService;
        this.router = router;
    }
    LogoutComponent.prototype.onLogout = function () {
        this.spinnerService.show();
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
        this.spinnerService.hide();
    };
    LogoutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-logout',
                    template: "\n        <div class=\"col-md-8 col-md-offset-2\">\n            <button class=\"btn btn-danger\" (click)=\"onLogout()\">Logout</button>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    LogoutComponent.ctorParameters = function () { return [
        { type: Ng4LoadingSpinnerService, },
        { type: AuthService, },
        { type: Router, },
    ]; };
    return LogoutComponent;
}());
export { LogoutComponent };
