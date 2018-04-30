import { Component, Input } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
var MessageComponent = /** @class */ (function () {
    function MessageComponent(spinnerService, messageService) {
        this.spinnerService = spinnerService;
        this.messageService = messageService;
    }
    MessageComponent.prototype.onEdit = function () {
        this.messageService.editMessage(this.message);
    };
    MessageComponent.prototype.onDelete = function () {
        var _this = this;
        this.spinnerService.show();
        this.messageService.deleteMessage(this.message)
            .subscribe(function (data) {
            _this.spinnerService.hide();
        }, function (error) {
            _this.spinnerService.hide();
            //console.error(error)
        }
        //result => console.log(result)
        );
    };
    MessageComponent.prototype.belongsToUser = function () {
        return localStorage.getItem('userId') == this.message.userId;
    };
    MessageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-message',
                    templateUrl: './message.component.html'
                },] },
    ];
    /** @nocollapse */
    MessageComponent.ctorParameters = function () { return [
        { type: Ng4LoadingSpinnerService, },
        { type: MessageService, },
    ]; };
    MessageComponent.propDecorators = {
        "message": [{ type: Input },],
    };
    return MessageComponent;
}());
export { MessageComponent };
