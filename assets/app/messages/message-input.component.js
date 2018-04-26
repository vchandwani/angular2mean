import { Component } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
var MessageInputComponent = /** @class */ (function () {
    function MessageInputComponent(spinnerService, messageService) {
        this.spinnerService = spinnerService;
        this.messageService = messageService;
    }
    MessageInputComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.spinnerService.show();
        if (this.message) {
            // Edit
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(function (data) {
                _this.spinnerService.hide();
            }, function (error) {
                _this.spinnerService.hide();
                //console.error(error)
            }
            //result => console.log(result)
            );
            this.message = null;
        }
        else {
            // Create
            var message = new Message(form.value.content, 'Varun');
            this.messageService.addMessage(message)
                .subscribe(function (data) {
                _this.spinnerService.hide();
            }, function (error) {
                _this.spinnerService.hide();
                //console.error(error)
            });
        }
        form.resetForm();
    };
    MessageInputComponent.prototype.onClear = function (form) {
        this.message = null;
        form.resetForm();
    };
    MessageInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.messageIsEdit.subscribe(function (message) { return _this.message = message; });
    };
    MessageInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-message-input',
                    templateUrl: './message-input.component.html'
                },] },
    ];
    /** @nocollapse */
    MessageInputComponent.ctorParameters = function () { return [
        { type: Ng4LoadingSpinnerService, },
        { type: MessageService, },
    ]; };
    return MessageInputComponent;
}());
export { MessageInputComponent };
