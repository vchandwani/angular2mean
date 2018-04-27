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
    newUnitDisplay: Number;
    activeName: Array<string>;
    activeType: Array<string>;
    Date: Date;
    edit: boolean;

    constructor(private http: Http, private errorService: ErrorService, private spinnerService: Ng4LoadingSpinnerService, private portfolioService: PortfolioService) {
    }

    onSubmit(form: NgForm) {
        this.spinnerService.show();
        if (this.portfolio) {
            // Edit            
            this.portfolio.Date = form.value.Date ? form.value.Date.toISOString() : '';
            this.portfolio.Transaction = form.value.Transaction;
            this.portfolio.Amount = form.value.Amount;
            this.portfolio.Price = form.value.Price;
            this.portfolio.Unit = this.newUnitDisplay ? this.newUnitDisplay : 0;
            this.portfolio.Units = this.unitsDisplay ? this.unitsDisplay : '';
            this.portfolioService.updatePortfolio(this.portfolio).subscribe(
                data => {
                    this.spinnerService.hide();
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                }
            );
            this.portfolio = null;
            this.uidDisplay = '';
            this.unitsDisplay = 0;
            this.unitDisplay = 0;
            this.newUnitDisplay = 0;
            this.edit = false;
        } else {
            // Create
            let name = form.value.Name ? form.value.Name[0].text : '';
            let type = form.value.type ? form.value.type[0].text : '';
            let date = form.value.Date ? form.value.Date.toISOString() : '';
            let units = this.unitsDisplay ? this.unitsDisplay : '';
            let unit:any = this.newUnitDisplay ? this.newUnitDisplay : '';
            const portfolio = new Portfolio(name, date, form.value.Transaction, form.value.Amount, units, form.value.Price, unit, type, this.uidDisplay);
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
        this.uidDisplay = '';
        this.unitsDisplay = 0;
        this.unitDisplay = 0;
        this.newUnitDisplay = 0;
        this.edit = false;
    }

    onClear(form: NgForm) {
        this.portfolio = null;
        form.resetForm();
    }
    calculateUnit(form: NgForm) {
        this.unitsDisplay = 0;
        this.newUnitDisplay = 0;
        this.unitsDisplay = form.value.Amount / form.value.Price;
        this.newUnitDisplay = this.unitDisplay + this.unitsDisplay;
        // Edit Case
        if (this.edit) {
            if (this.portfolio.Units >= this.unitsDisplay) {
                let unit:any = this.portfolio.Unit;
                let units:any = this.portfolio.Units;
                this.newUnitDisplay = unit - (units - this.unitsDisplay);
            } else if (this.portfolio.Units < this.unitsDisplay) {
                let units:any = this.portfolio.Units;
                this.newUnitDisplay = this.portfolio.Unit + this.unitsDisplay - units;
            }
        }
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
        this.edit = false;
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
            (portfolio: Portfolio) => {
                this.edit = true;
                this.portfolio = portfolio;
                this.Date = new Date(portfolio.Date.toString());
                this.unitsDisplay = portfolio.Units;
                this.unitDisplay = portfolio.Unit;
                this.newUnitDisplay = portfolio.Unit;
                this.uidDisplay = portfolio.uid;
                this.activeName = [portfolio.Name];
                this.activeType = [portfolio.type];
            }
        );
    }
}