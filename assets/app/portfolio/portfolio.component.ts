import { Component, OnInit } from "@angular/core";
import { PortfolioService } from "./portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ErrorService } from "../errors/error.service";

@Component({
    selector: 'app-portfolio',
    styles: [`
        .chart {display: block; width: 100%;}
    `],
    template: `
    <div class="col-md-4 col-sm-4">
        <button class="btn btn-primary" (click)="latestPrices()">Get Latest Prices</button>
    </div>
    <div class="col-md-4 col-sm-4">
        <button class="btn btn-primary" (click)="duplicateZero()">Duplicate Zero Value Stocks/Funds</button>
    </div>
    <div class="col-md-4 col-sm-4">
        <nav class="col-md-8 col-md-offset-2">
            <ul class="nav nav-pills">
                <li routerLinkActive="active"><a [routerLink]="['/portfolio-input']">Portfolio Entry</a></li>
            </ul>
        </nav>
    </div>
    <div class="col-md-12">
        <h3>
        Total : 
            <ng2-odometer 
                [number]="totalAmount"></ng2-odometer>        
        </h3>
    </div>
    <div class="col-md-12">
        <h3>
        Stock Total : 
            <ng2-odometer 
                [number]="totalMutualFundAmount" 
                ></ng2-odometer>        
        </h3>
    </div>
    <div style="display: block">
        <canvas baseChart *ngIf="chartDisplay" [data]="chartDataMain" [labels]="chartLabelsMain" [chartType]="doughnutChartType"></canvas>
    </div>
    <div class="col-md-12">
        <h3>
        Mutual Fund Total : 
            <ng2-odometer 
                [number]="totalStockAmount" 
                ></ng2-odometer>        
        </h3>
    </div>
    <div style="display: block">
        <canvas baseChart *ngIf="stockChartDisplay" [data]="stockChartDataMain" [labels]="stockChartLabelsMain" [chartType]="doughnutChartType"></canvas>
    </div>
    `
})
export class PortfolioComponent implements OnInit {
    constructor(private spinnerService: Ng4LoadingSpinnerService, private portfolioService: PortfolioService, private errorService: ErrorService) { }
    rows = [];
    tempUID = [];
    tempNames = [];
    totalAmount: number = 0;
    totalMutualFundAmount: number = 0;
    totalStockAmount: number = 0;
    resultFlag = false;
    tempArrayNames = [];
    // Doughnut
    public activeFunds = [];
    public activeStocks = [];
    public chartLabelsMain: string[] = [];
    public stockChartLabelsMain: string[] = [];
    public chartDataMain: number[] = [];
    public stockChartDataMain: number[] = [];
    public doughnutChartType: string = 'doughnut';
    public polarAreaChartType: string = 'polarArea';
    public polarAreaLegend: boolean = true;
    public pieChartType: string = 'pie';
    public chartDisplay = false;
    public stockChartDisplay = false;

    ngOnInit() {
        this.totalAmount = 0;
        this.totalMutualFundAmount = 0;
        this.totalStockAmount = 0;
        this.spinnerService.show();
        this.portfolioService.getActiveFunds()
            .subscribe(
                data => {
                    this.rows = data;
                    let i = 0;
                    this.rows.forEach((item) => {
                        if (item.type == 'MF') {
                            this.activeFunds.push(item.name);
                        }
                        if (item.type == 'Stock') {
                            this.activeStocks.push(item.name);
                        }
                        i++;
                    });
                    if (this.rows.length == i) {
                        this.portfolioService.getLastEntry()
                            .subscribe(
                                data => {
                                    let z = 0;
                                    let k = 0;
                                    data.forEach((item) => {
                                        if (item.type = 'MF' && this.activeFunds.indexOf(item._id) > -1) {
                                            this.chartLabelsMain.push(item._id);
                                            this.chartDataMain.push(item.latestPrice * item.unit);
                                            this.totalMutualFundAmount += item.latestPrice * item.unit;
                                            localStorage.setItem('totalMutualFundAmount', this.totalMutualFundAmount.toString());
                                            z++;
                                        } else if (item.type = 'Stock' && this.activeStocks.indexOf(item._id) > -1) {
                                            this.stockChartLabelsMain.push(item._id);
                                            this.stockChartDataMain.push(item.latestPrice * item.unit);
                                            this.totalStockAmount += item.latestPrice * item.unit;
                                            localStorage.setItem('totalStockAmount', this.totalStockAmount.toString());
                                            k++;
                                        }
                                    });
                                    if (this.rows.length == (z + k)) {
                                        this.spinnerService.hide();
                                        this.totalAmount = this.totalStockAmount + this.totalMutualFundAmount;
                                        localStorage.setItem('totalAmount', this.totalAmount.toString());
                                        this.chartDisplay = true;
                                        this.stockChartDisplay = true;
                                    }
                                },
                                error => {
                                    this.spinnerService.hide();
                                    //console.error(error)
                                }
                            );
                    }

                },
                error => {
                    this.spinnerService.hide();
                    // console.error(error)
                }
            );
    }
    latestPrices() {
        this.spinnerService.show();
        this.tempUID = [];
        // Get Latest values of MF and Stocks
        this.portfolioService.getActiveFunds()
            .subscribe(
                data => {
                    let k = 0;
                    let i = 0;
                    this.rows = data;
                    this.rows.forEach((item) => {
                        if (this.tempUID.indexOf(item.uid) < 0) {
                            i++;
                            this.tempUID.push(item.uid);
                            setTimeout(() => {
                                this.portfolioService.latestValue(item.uid, item.type)
                                    .subscribe(
                                        data => {
                                            this.portfolioService.updateLatestValue(item.uid, item.type, data)
                                                .subscribe(
                                                    data => {
                                                        k++;
                                                        if (k == this.rows.length) {
                                                            this.spinnerService.hide();
                                                            this.ngOnInit();
                                                        }
                                                    },
                                                    error => {
                                                        this.spinnerService.hide();
                                                        //console.error(error)
                                                    }
                                                );
                                        },
                                        error => {
                                            this.spinnerService.hide();
                                            //console.error(error)
                                        }
                                    );
                            }, i * 1000);
                        } else {
                            k++;
                            if (k == this.rows.length) {
                                this.spinnerService.hide();
                                this.ngOnInit();
                            }
                        }
                    });
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                }
            );
    }
    duplicateZero() {
        this.spinnerService.show();
        let date = new Date();
        let y = 0;
        let k = 1;
        // Will try for Three months zero entries as I value is set to three

        for (let i = 0; i < 3; i++) {
            let endDate = new Date(date.getFullYear(), date.getMonth() + k, 1).toISOString();
            let startDate = new Date(date.getFullYear(), date.getMonth() - y, 0).toISOString();

            setTimeout(() => {
                // Get Last Entries for Zero values funds and stocks
                this.portfolioService.zeroEntries()
                    .subscribe(
                        data => {
                            if (typeof data != 'undefined' && data) {
                                // Data Exist for Zero Unit
                                data.forEach((item) => {
                                    this.tempArrayNames[item._id] = false;
                                    setTimeout(() => {
                                        this.databaseEntryForFund(item, startDate, endDate);
                                    }, 400);
                                    this.spinnerService.hide();
                                });
                                if (i == 2) {
                                    this.spinnerService.hide();
                                    this.errorService.handleSuccess({ title: 'Process Completed', success: true });
                                }
                            }
                        },
                        error => {
                            this.spinnerService.hide();
                            //console.error(error)
                        }
                    );
            }, 500);
            y++; k--;

        }
    }

    databaseEntryForFund(obj, startDate, endDate) {
        this.portfolioService.fundZeroEntries(obj, startDate, endDate).subscribe(
            data => {
                if (data) {
                    setTimeout(() => {
                        this.portfolioService.insertPortfolio(obj, startDate, endDate).subscribe(
                            data => {
                                return 'portfolio entry added';
                            },
                            error => {
                                this.spinnerService.hide();
                                //console.error(error)
                            }
                        );
                    }, 100);
                }
            },
            error => {
                this.spinnerService.hide();
                //console.error(error)
            }
        );
    }
}