import { Component } from "@angular/core";
import { ErrorService } from "./error.service";
var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(errorService) {
        this.errorService = errorService;
        this.display = 'none';
        this.displaySuccess = 'none';
        this.displayError = 'none';
    }
    ErrorComponent.prototype.onErrorHandled = function () {
        this.display = 'none';
    };
    ErrorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errorService.errorOccurred
            .subscribe(function (error) {
            if (error.success) {
                _this.displaySuccess = '';
                _this.displayError = 'none';
            }
            else {
                _this.displayError = '';
                _this.displaySuccess = 'none';
            }
            _this.error = error;
            _this.display = 'block';
        });
    };
    ErrorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-error',
                    templateUrl: './error.component.html'
                },] },
    ];
    /** @nocollapse */
    ErrorComponent.ctorParameters = function () { return [
        { type: ErrorService, },
    ]; };
    return ErrorComponent;
}());
export { ErrorComponent };
