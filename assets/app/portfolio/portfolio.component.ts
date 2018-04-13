import { Component, OnInit } from "@angular/core";
import { PortfolioService } from "./portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-portfolio',
    styles: [`
        .chart {display: block; width: 100%;}
    `],
    template: `
    <div class="col-md-8 col-md-offset-2">
        <button class="btn btn-primary" (click)="latestPrices()">Get Latest Prices</button>
    </div>
    <div class="col-md-12">
        <h3>
        Total : 
            <ng2-odometer 
                [number]="totalAmount" 
                [observable]="observable" 
                [config]="config"></ng2-odometer>        
        </h3>
    </div>
    <div style="display: block">
        <canvas baseChart *ngIf="chartDisplay" [data]="chartDataMain" [labels]="chartLabelsMain" [chartType]="doughnutChartType"></canvas>
    </div>
    `
})
export class PortfolioComponent implements OnInit {
    constructor(private spinnerService: Ng4LoadingSpinnerService, private portfolioService: PortfolioService) { }
    rows = [];
    tempUID = [];
    totalAmount : number = 0;
    // Doughnut
    public activeFunds = [];
    public chartLabelsMain: string[] = [];
    public chartDataMain: number[] = [];
    public doughnutChartType: string = 'doughnut';
    public pieChartType: string = 'pie';
    public chartDisplay = false;

    ngOnInit() {
        this.totalAmount = 0;
        this.spinnerService.show();
        this.portfolioService.getActiveFunds()
            .subscribe(
                data => {
                    this.rows = data;
                    let i = 0;
                    this.rows.forEach((item) => {
                        if (item.type == 'MF') {
                            i++;
                            this.activeFunds.push(item.name);
                        }
                    });
                    if (this.rows.length == i) {
                        this.portfolioService.getLastEntry()
                            .subscribe(
                                data => {
                                    let z = 0;
                                    data.forEach((item) => {
                                        if (this.activeFunds.indexOf(item._id) > -1) {
                                            z++;
                                            this.chartLabelsMain.push(item._id);
                                            this.chartDataMain.push(item.latestPrice * item.unit);
                                            this.totalAmount += item.latestPrice * item.unit;
                                            localStorage.setItem('totalAmount', this.totalAmount.toString());
                                        }
                                    });
                                    if (this.rows.length == z) {
                                        this.spinnerService.hide();
                                        this.chartDisplay = true;
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
                    //console.error(error)
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
                                this.portfolioService.latestValue(item.uid)
                                    .subscribe(
                                        data => {
                                            this.portfolioService.updateLatestValue(item.uid, data)
                                                .subscribe(
                                                    data => {
                                                        k++;
                                                        if( k == this.rows.length){
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
                            if( k == this.rows.length){
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
}