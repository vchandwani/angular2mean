import { Component, Input, OnInit } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { PortfolioService } from "../portfolio/portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Portfolio } from '../portfolio/portfolio.model';
import { port } from "_debugger";

@Component({
    selector: 'app-portfolio-detail',
    styles: [`
      chart {
        display: block; 
      }
    `],
    template: `
    <div class="row">
        <div class="col-md-12">
            <div style="display: block;" *ngIf="chartDisplay">
                <canvas baseChart width="100%" [datasets]="lineChartData" [labels]="lineChartLabels" [options]="lineChartOptions" [chartType]="lineChartType" (chartHover)="chartHovered($event)"></canvas>
            </div>
        </div>
    </div>
    <!--<div *ngFor="let optionsVal of mainOptions">
        <chart type="StockChart" [options]="optionsVal"></chart>
    </div>-->
    <ul class="nav nav-pills">
        <li class="active"><a data-toggle="pill" href="portfolio-detail#mutual_funds">Mutual Funds</a></li>
        <li><a data-toggle="pill" href="portfolio-detail#stocks">Stocks</a></li>
    </ul>
    <div class="tab-content">
        <div id="mutual_funds" class="tab-pane fade in active">
            <h3>Mutual Funds</h3>
            <!--<div *ngFor="let optionsVal of options">
                <chart type="StockChart" [options]="optionsVal"></chart>
            </div>-->
            <div class="row" *ngIf="mutualDisplay">
                <div class="col-md-12" *ngFor="let optionsVal of mutualOptionsChart">
                    <div style="display: block;">
                        <canvas baseChart width="100%" [datasets]="optionsVal.series" [labels]="optionsVal.label" [options]="lineChartOptions" [chartType]="lineChartType" (chartHover)="chartHovered($event)"></canvas>
                    </div>
                </div>                
            </div>
        </div>
        <div id="stocks" class="tab-pane fade">
            <h3>Stocks</h3>
            <!--<div *ngFor="let optionsVal of stockOptions">
                <chart type="StockChart" [options]="optionsVal"></chart>
            </div>-->
            <div class="row" *ngIf="stockDisplay">
                <div class="col-md-12" *ngFor="let optionsVal of stockOptionsChart">
                    <div style="display: block;">
                        <canvas baseChart width="100%" [datasets]="optionsVal.series" [labels]="optionsVal.label" [options]="lineChartOptions" [chartType]="lineChartType" (chartHover)="chartHovered($event)"></canvas>
                    </div>
                </div>                
            </div>
        </div>
    </div>
`
})
export class PortfolioDetailComponent implements OnInit {
    portfolioNames: any;

    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        private portfolioService: PortfolioService
    ) { }
    public lineChartData: Array<any> = [];
    public lineChartDataTemp: Array<any> = [];
    public chartData = [];
    public lineChartLabels: Array<any> = [];
    public chartLabels = [];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartType: string = 'line';
    public chartHovered(e: any): void {
    }
    mainOptions: any;
    options: any;
    stockOptions: any;
    mutualOptionsChart = Array();
    stockOptionsChart: any;
    public activeFunds = [];
    rows = [];
    reversePortfolio = [];
    totalAmount: number = 0;
    tempArrayMain = Array();
    tempMonthMain = Array();
    dataMain = Array();
    dataLabel = '';
    chartDisplay = false;
    mutualDisplay = false;
    stockDisplay = false;
    month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "Septmeber", "October", "November", "December");

    ngOnInit() {
        this.spinnerService.show();
        this.portfolioService.getNames()
            .subscribe(
                data => {
                    let mainArray = Array();
                    this.portfolioNames = data;
                    this.portfolioService.getPortfolioDetails()
                        .subscribe(
                            (portfolio: Portfolio[]) => {
                                let nameItems = [];
                                let i = 0;
                                let z = 0;
                                for (let nameWise of portfolio) {
                                    if (nameItems[nameWise.Name]) {

                                    } else {
                                        nameItems[nameWise.Name] = [];
                                    }
                                    if (this.chartLabels[nameWise.Name]) {

                                    } else {
                                        this.chartLabels[nameWise.Name] = [];
                                    }
                                    if (this.chartData[nameWise.Name]) {

                                    } else {
                                        this.chartData[nameWise.Name] = [];
                                    }
                                    let priceBe: any = nameWise.Price;
                                    let unitBe: any = nameWise.Unit;
                                    let amount: number = priceBe * unitBe;

                                    if (amount) {
                                        let dateString = nameWise.Date.toString();
                                        let res = dateString.split("-");
                                        let time: number = new Date(res[0] + '-' + res[1] + '-' + res[2]).getTime();
                                        let tempArray = Array();
                                        tempArray.push(time);
                                        tempArray.push(amount);
                                        nameItems[nameWise.Name].push(tempArray);
                                        this.chartLabels[nameWise.Name].push(new Date(time).getDay() + '-' + this.month[new Date(time).getMonth()] + '-' + new Date(time).getFullYear());
                                        this.chartData[nameWise.Name].push(amount);
                                    }
                                    i++;
                                }
                                this.reversePortfolio = portfolio.reverse();
                                this.tempMonthMain = Array();
                                for (let nameWise of this.reversePortfolio) {
                                    let amount: number = nameWise.Price * nameWise.Unit;
                                    if (amount) {
                                        let dateString = nameWise.Date;
                                        let res = dateString.split("-");

                                        let timeMain: number = new Date(res[0] + '-' + res[1] + '-' + '31').getTime();
                                        if (this.tempMonthMain.indexOf(timeMain) < 0) {
                                            this.tempMonthMain.push(timeMain);
                                        }
                                        if (!this.tempArrayMain[timeMain]) {
                                            this.tempArrayMain[timeMain] = Array();
                                        }

                                        if (!this.tempArrayMain[timeMain]['names']) {
                                            this.tempArrayMain[timeMain]['names'] = Array();
                                        }

                                        if (this.tempArrayMain[timeMain]['names'].indexOf(nameWise.Name) < 0) {
                                            // Check whether name alread pushes to avoid duplicate for the Month                                        
                                            this.tempArrayMain[timeMain]['names'].push(nameWise.Name);
                                            if (!this.tempArrayMain[timeMain]['amount']) {
                                                this.tempArrayMain[timeMain]['amount'] = Array();
                                                this.tempArrayMain[timeMain]['amount'][0] = 0;
                                            }
                                            this.tempArrayMain[timeMain]['amount'][0] += parseInt(nameWise.Price) * parseInt(nameWise.Unit);
                                        }
                                    }
                                    z++;
                                    if (z == this.reversePortfolio.length) {
                                        let y = 0;
                                        let mainItem = [];
                                        this.mainOptions = [];
                                        this.dataMain = [];
                                        this.dataLabel = 'Portfolio Total';
                                        mainItem['main'] = [];
                                        this.tempMonthMain.reverse();
                                        // Display Main chart
                                        this.tempMonthMain.forEach((item, index) => {
                                            y++;
                                            let tempArray = Array();
                                            let time: number = item;
                                            if (y != this.tempMonthMain.length) {
                                                tempArray.push(time);
                                                tempArray.push(this.tempArrayMain[item]['amount'][0]);
                                                mainItem['main'].push(tempArray);
                                                this.dataMain.push(this.tempArrayMain[item]['amount'][0]);
                                                this.lineChartLabels.push(new Date(time).getDay() + '-' + this.month[new Date(time).getMonth()] + '-' + new Date(time).getFullYear());
                                            } else if (y == this.tempMonthMain.length) {
                                                // Get altest price and add it to main Item array
                                                this.totalAmount = parseInt(localStorage.getItem('totalAmount'));
                                                let tempArray = Array();
                                                let time: number = item;
                                                tempArray.push(new Date().getTime());
                                                tempArray.push(this.totalAmount);
                                                this.dataMain.push(this.totalAmount);
                                                this.lineChartLabels.push(new Date().getDate() + '-' + this.month[new Date().getMonth()] + '-' + new Date().getFullYear());
                                                mainItem['main'].push(tempArray);
                                                this.mainOptions.push({
                                                    title: { text: 'Portfolio Total' },
                                                    series: [{
                                                        name: 'Portfolio Total',
                                                        data: mainItem['main'],
                                                        tooltip: {
                                                            valueDecimals: 2
                                                        }
                                                    }]
                                                });
                                                this.lineChartData = [{ data: this.dataMain, label: this.dataLabel }];
                                                this.chartDisplay = true;
                                            }
                                        });
                                    }
                                }

                                this.options = [];
                                this.stockOptions = [];
                                this.mutualOptionsChart = [];
                                this.stockOptionsChart = [];
                                for (let detail of this.portfolioNames) {
                                    let name = detail.name;
                                    this.portfolioService.getFundLastEntry(name)
                                        .subscribe(
                                            (portfolio) => {
                                                let tempArray = Array();
                                                let amount: number = portfolio[0].latestPrice * portfolio[0].Unit;
                                                tempArray.push(new Date().getTime());
                                                tempArray.push(amount);
                                                nameItems[name].push(tempArray);
                                                this.chartData[name].push(amount);
                                                this.chartLabels[name].push(new Date().getDate() + '-' + this.month[new Date().getMonth()] + '-' + new Date().getFullYear());
                                                this.lineChartDataTemp = Array();
                                                if (portfolio[0].type == 'MF') {
                                                    this.options.push({
                                                        title: { text: name },
                                                        series: [{
                                                            name: name,
                                                            data: nameItems[name],
                                                            tooltip: {
                                                                valueDecimals: 2
                                                            }
                                                        }]
                                                    });
                                                    this.lineChartDataTemp = [{ data: this.chartData[name], label: name }];
                                                    this.mutualOptionsChart.push({
                                                        label: this.chartLabels[name],
                                                        series: this.lineChartDataTemp
                                                    });
                                                } else if (portfolio[0].type == 'Stock') {
                                                    this.stockOptions.push({
                                                        title: { text: name },
                                                        series: [{
                                                            name: name,
                                                            data: nameItems[name],
                                                            tooltip: {
                                                                valueDecimals: 2
                                                            }
                                                        }]
                                                    });
                                                    this.lineChartDataTemp = [{ data: this.chartData[name], label: name }];
                                                    this.stockOptionsChart.push({
                                                        label: this.chartLabels[name],
                                                        series : this.lineChartDataTemp
                                                    });

                                                }
                                                // All entries pushed
                                                if(this.portfolioNames.length == this.mutualOptionsChart.length+this.stockOptionsChart.length){
                                                    this.stockDisplay = true;
                                                    this.mutualDisplay = true;
                                                }
                                            },
                                            error => {
                                                this.spinnerService.hide();
                                                //console.error(error)
                                            });
                                };
                            }
                        );
                    this.spinnerService.hide();
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                }
            );
    }
}
