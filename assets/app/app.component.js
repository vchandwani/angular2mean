import { Component } from '@angular/core';
import { MessageService } from "./messages/message.service";
import { AuthService } from "./auth/auth.service";
import { PortfolioService } from "./portfolio/portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
var AppComponent = /** @class */ (function () {
    function AppComponent(spinnerService, messageService, authService, portfolioService) {
        this.spinnerService = spinnerService;
        this.messageService = messageService;
        this.authService = authService;
        this.portfolioService = portfolioService;
        this.title = 'Mean Stack';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.spinnerService.hide();
    };
    AppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-app',
                    templateUrl: './app.component.html'
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = function () { return [
        { type: Ng4LoadingSpinnerService, },
        { type: MessageService, },
        { type: AuthService, },
        { type: PortfolioService, },
    ]; };
    return AppComponent;
}());
export { AppComponent };
