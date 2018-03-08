import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
    message: Message;

    constructor(private spinnerService: Ng4LoadingSpinnerService,private messageService: MessageService) {}

    onSubmit(form: NgForm) {
        this.spinnerService.show();
        if (this.message) {
            // Edit
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
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
            this.message = null;
        } else {
            // Create
            const message = new Message(form.value.content, 'Varun');
            this.messageService.addMessage(message)
                .subscribe(
                    data => {
                        this.spinnerService.hide();
                    },
                    error => {
                        this.spinnerService.hide();
                        //console.error(error)
                    }
                );
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.message = null;
        form.resetForm();
    }

    ngOnInit() {
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        );
    }
}