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
    <div *ngFor="let optionsVal of mainOptions">
        <chart type="StockChart" [options]="optionsVal"></chart>
    </div>
    <ul class="nav nav-pills">
        <li class="active"><a data-toggle="pill" href="portfolio-detail#mutual_funds">Mutual Funds</a></li>
        <li><a data-toggle="pill" href="portfolio-detail#stocks">Stocks</a></li>
    </ul>
    <div class="tab-content">
        <div id="mutual_funds" class="tab-pane fade in active">
            <h3>Mutual Funds</h3>
            <div *ngFor="let optionsVal of options">
                <chart type="StockChart" [options]="optionsVal"></chart>
            </div>        
        </div>
        <div id="stocks" class="tab-pane fade">
            <h3>Stocks</h3>
            <div *ngFor="let optionsVal of stockOptions">
                <chart type="StockChart" [options]="optionsVal"></chart>
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
    mainOptions: any;
    options: any;
    stockOptions: any;
    public activeFunds = [];
    rows = [];
    reversePortfolio = [];
    totalAmount: number = 0;
    tempArrayMain = Array();
    tempMonthMain = Array();

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
                                    let price:any = nameWise.Price;
                                    let unit:any = nameWise.Unit;
                                    let amount: number = price * unit;

                                    if (amount) {
                                        let dateString:String = nameWise.Date.toString();
                                        let res = dateString.split("-");
                                        let time: number = new Date(res[0] + '-' + res[1] + '-' + res[2]).getTime();
                                        let tempArray = Array();
                                        tempArray.push(time);
                                        tempArray.push(amount);
                                        nameItems[nameWise.Name].push(tempArray);
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
                                            } else if (y == this.tempMonthMain.length) {
                                                // Get altest price and add it to main Item array
                                                this.totalAmount = parseInt(localStorage.getItem('totalAmount'));
                                                let tempArray = Array();
                                                let time: number = item;
                                                tempArray.push(new Date().getTime());
                                                tempArray.push(this.totalAmount);
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
                                            }
                                        });
                                    }
                                }

                                this.options = [];
                                this.stockOptions = [];
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
                                                }
                                            },
                                            error => {
                                                this.spinnerService.hide();
                                                //console.error(error)
                                            });
                                };
                                this.spinnerService.hide();
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
