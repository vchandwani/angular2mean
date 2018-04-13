import { Component, OnInit, Input } from "@angular/core";

import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">

            <p-table [columns]="cols" [value]="messages" sortMode="multiple">
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th *ngFor="let col of columns" [pSortableColumn]="col.field">
                            {{col.header}}
                            <p-sortIcon [field]="col.field"></p-sortIcon>
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowData let-columns="columns">
                    <tr>
                        <td *ngFor="let col of columns">
                            <div *ngIf='col.field != "userId"'>
                                {{rowData[col.field]}}
                            </div>
                            <ng-container *ngIf='col.field == "userId"'>
                                <div class="config" *ngIf="belongsToUser(rowData[col.field])">                                    
                                    <a (click)="onEdit(rowData)">Edit</a>
                                    <a (click)="onDelete(rowData)">Delete</a>                                    
                                </div>
                            </ng-container>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
            <!--<app-message [message]="message" *ngFor="let message of messages"></app-message>-->
        </div>
    `
})
export class MessageListComponent implements OnInit {
    messages: Message[];
    @Input() message: Message;
    cols: any[];

    constructor(private spinnerService: Ng4LoadingSpinnerService, private messageService: MessageService) { }

    ngOnInit() {
        this.cols = [
            { field: 'content', header: 'Content' },
            { field: 'username', header: 'Username' },
            { field: 'userId', header: 'Action' }
        ];
        this.spinnerService.show();
        this.messageService.getMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                    this.spinnerService.hide();
                }
            );
    }
    onEdit(message) {
        this.messageService.editMessage(message);
    }

    onDelete(message) {
        this.spinnerService.show();
        this.messageService.deleteMessage(message)
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
    belongsToUser(userId) {
        if(localStorage.getItem('userId') == userId){
            return true;
        } else {
            return false;
        }
    }
}