import { Component, Input, OnInit } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { PortfolioService } from "../portfolio/portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from "@angular/forms";
import { Portfolio } from "./portfolio.model";

@Component({
    selector: 'app-portfolio-input',
    styles: [`
      chart {
        display: block; 
      }
    `],
    templateUrl: './portfolio-input.component.html'
})
export class PortfolioInputComponent implements OnInit {
    portfolios: Portfolio[];
    @Input() portfolio: Portfolio;
    cols: any[];

    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        private portfolioService: PortfolioService
    ) { }

    // onSubmit(form: NgForm) {
    //     this.spinnerService.show();
    //     if (this.message) {
    //         // Edit
    //         this.message.content = form.value.content;
    //         this.messageService.updateMessage(this.message)
    //             .subscribe(
    //                 data => {
    //                     this.spinnerService.hide();
    //                 },
    //                 error => {
    //                     this.spinnerService.hide();
    //                     //console.error(error)
    //                 }
    //                 //result => console.log(result)
    //             );
    //         this.message = null;
    //     } else {
    //         // Create
    //         const message = new Message(form.value.content, 'Varun');
    //         this.messageService.addMessage(message)
    //             .subscribe(
    //                 data => {
    //                     this.spinnerService.hide();
    //                 },
    //                 error => {
    //                     this.spinnerService.hide();
    //                     //console.error(error)
    //                 }
    //             );
    //     }
    //     form.resetForm();
    // }

    // onClear(form: NgForm) {
    //     this.message = null;
    //     form.resetForm();
    // }

    ngOnInit() {
        this.cols = [
            { field: 'Name', header: 'Name' },
            { field: 'Date', header: 'Date' },
            { field: 'Amount', header: 'Amount' },
            { field: 'Units', header: 'Units' },
            { field: 'Unit', header: 'Unit' },
            { field: 'Price', header: 'Price' },
            { field: 'type', header: 'Type' },
            { field: '_id', header: 'Action' }
        ];

        // this.messageService.messageIsEdit.subscribe(
        //     (message: Message) => this.message = message
        // );
        this.portfolioService.getPortfolioDetails()
            .subscribe(
                (portfolios: Portfolio[]) => {
                    this.portfolios = portfolios;
                    this.spinnerService.hide();
                }
            );
    }
}