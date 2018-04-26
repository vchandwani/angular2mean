import { Component, Input } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
var MessageListComponent = /** @class */ (function () {
    function MessageListComponent(spinnerService, messageService) {
        this.spinnerService = spinnerService;
        this.messageService = messageService;
    }
    MessageListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cols = [
            { field: 'content', header: 'Content' },
            { field: 'username', header: 'Username' },
            { field: 'userId', header: 'Action' }
        ];
        this.spinnerService.show();
        this.messageService.getMessages()
            .subscribe(function (messages) {
            _this.messages = messages;
            _this.spinnerService.hide();
        });
    };
    MessageListComponent.prototype.onEdit = function (message) {
        this.messageService.editMessage(message);
    };
    MessageListComponent.prototype.onDelete = function (message) {
        var _this = this;
        this.spinnerService.show();
        this.messageService.deleteMessage(message)
            .subscribe(function (data) {
            _this.spinnerService.hide();
        }, function (error) {
            _this.spinnerService.hide();
            //console.error(error)
        }
        //result => console.log(result)
        );
    };
    MessageListComponent.prototype.belongsToUser = function (userId) {
        if (localStorage.getItem('userId') == userId) {
            return true;
        }
        else {
            return false;
        }
    };
    MessageListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-message-list',
                    template: "\n        <div class=\"col-md-8 col-md-offset-2\">\n\n            <p-table [columns]=\"cols\" [value]=\"messages\" sortMode=\"multiple\">\n                <ng-template pTemplate=\"header\" let-columns>\n                    <tr>\n                        <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                            {{col.header}}\n                            <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                        </th>\n                    </tr>\n                </ng-template>\n                <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                    <tr>\n                        <td *ngFor=\"let col of columns\">\n                            <div *ngIf='col.field != \"userId\"'>\n                                {{rowData[col.field]}}\n                            </div>\n                            <ng-container *ngIf='col.field == \"userId\"'>\n                                <div class=\"config\" *ngIf=\"belongsToUser(rowData[col.field])\">                                    \n                                    <a (click)=\"onEdit(rowData)\">Edit</a>\n                                    <a (click)=\"onDelete(rowData)\">Delete</a>                                    \n                                </div>\n                            </ng-container>\n                        </td>\n                    </tr>\n                </ng-template>\n            </p-table>\n            <!--<app-message [message]=\"message\" *ngFor=\"let message of messages\"></app-message>-->\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    MessageListComponent.ctorParameters = function () { return [
        { type: Ng4LoadingSpinnerService, },
        { type: MessageService, },
    ]; };
    MessageListComponent.propDecorators = {
        "message": [{ type: Input },],
    };
    return MessageListComponent;
}());
export { MessageListComponent };
