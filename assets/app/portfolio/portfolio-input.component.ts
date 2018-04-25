import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PortfolioService } from "./portfolio.service";
import { Portfolio } from "./portfolio.model";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import API from '../../core/api';
import { Http, Headers, Response } from "@angular/http";
import { ErrorService } from "../errors/error.service";
import { Observable, BehaviorSubject } from "rxjs";
import { port } from "_debugger";

@Component({
    selector: 'app-portfolio-input',
    templateUrl: './portfolio-input.component.html'
})
export class PortfolioInputComponent implements OnInit {
    portfolio: Portfolio;
    names = Array();
    namesMain = Array();
    details = Array();
    uidDisplay: string;
    unitsDisplay: any;
    unitDisplay: any;
    newUnitDisplay: any;

    constructor(private http: Http, private errorService: ErrorService, private spinnerService: Ng4LoadingSpinnerService, private portfolioService: PortfolioService) {
    }

    onSubmit(form: NgForm) {
        this.spinnerService.show();
        if (this.portfolio) {
            // Edit
            this.portfolio.Name = form.value.Name[0].text;
            this.portfolio.Date = form.value.Date.toISOString();
            this.portfolio.Transaction = form.value.Transaction;
            this.portfolio.Amount = form.value.Amount;
            this.portfolio.Price = form.value.Price;
            this.portfolio.Unit = this.newUnitDisplay;
            this.portfolio.Units = this.unitsDisplay;
            this.portfolio.type = form.value.type[0].text;
            this.portfolio.uid = this.uidDisplay;

            this.portfolioService.insertOneEntryPortfolio(this.portfolio).subscribe(
                data => {
                    this.spinnerService.hide();
                    return 'portfolio entry added';
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                }
            );            
            this.portfolio = null;
        } else {
            // Create
            const portfolio = new Portfolio(form.value.Name[0].text, form.value.Date.toISOString(),form.value.Transaction,form.value.Amount,this.unitsDisplay,form.value.Price,this.newUnitDisplay,form.value.type[0].text,this.uidDisplay );
            this.portfolioService.insertOneEntryPortfolio(portfolio).subscribe(
                data => {
                    this.spinnerService.hide();
                    return 'portfolio entry added';
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
        this.portfolio = null;
        form.resetForm();
    }
    calculateUnit(form: NgForm) {
        this.unitsDisplay = form.value.Amount / form.value.Price;
        this.newUnitDisplay = this.unitDisplay + this.unitsDisplay;
    }
    selected(event) {
        this.unitDisplay = 0;
        this.newUnitDisplay = 0;
        for (let detail of this.details) {
            if (detail.name == event.id) {
                this.uidDisplay = detail.uid;
            }
        }
       // Call to get last Unit entry for the fund
        this.portfolioService.getFundLastEntry(event.id)
            .subscribe(
                (portfolio) => {
                    this.unitDisplay = portfolio[0].Unit;                    
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                });
    }
    ngOnInit() {

        this.portfolioService.getNames()
            .subscribe(
                data => {
                    let i = 0;
                    for (let detail of data) {
                        this.details.push(detail);
                        this.namesMain.push(detail.name);
                        i++;
                        if (data.length == i) {
                            this.names = this.namesMain;
                        }
                    }
                });
        this.portfolioService.portfolioIsEdit.subscribe(
            (portfolio: Portfolio) => this.portfolio = portfolio
        );
    }
}