import { Component, Input } from "@angular/core";

import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})
export class MessageComponent {
    @Input() message: Message;

    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        private messageService: MessageService
    ) {}

    onEdit() {
        this.messageService.editMessage(this.message);
    }

    onDelete() {
        this.spinnerService.show();
        this.messageService.deleteMessage(this.message)
            .subscribe(
                data => {
                    this.spinnerService.hide();
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                }
                //result => console.log(result)
            );
    }

    belongsToUser() {
        return localStorage.getItem('userId') == this.message.userId;
    }
}