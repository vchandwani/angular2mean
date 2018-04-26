import { EventEmitter } from "@angular/core";
import { Error } from "./error.model";
var ErrorService = /** @class */ (function () {
    function ErrorService() {
        this.errorOccurred = new EventEmitter();
    }
    ErrorService.prototype.handleError = function (error) {
        var errorData = new Error(error.title, error.error.message, false);
        this.errorOccurred.emit(errorData);
    };
    ErrorService.prototype.handleSuccess = function (error) {
        var successData = new Error(error.title, '', true);
        this.errorOccurred.emit(successData);
    };
    return ErrorService;
}());
export { ErrorService };
