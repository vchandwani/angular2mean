import {Component} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "./message.model";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-message 
                [message]="message" 
                *ngFor="let message of messages">
            </app-message>
        </div>
    `
})

export class MessageListComponent implements OnInit {
    constructor(private messageService:MessageService){}
    messages: Message[];
    ngOnInit(){
        this.messageService.getMessage()
        .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
            }
        );
    }
}