import { Component, Input, OnInit } from "@angular/core";

import { Portfolio } from "./portfolio.model";
import { PortfolioService } from "./portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-portfolio',
    styles: [`
      chart {
        display: block; 
      }
    `],
    template: `
    <div *ngFor="let optionsVal of options">
        <chart [options]="optionsVal"></chart>
    </div>
    <div class="col-md-8 col-md-offset-2">
        <div *ngFor="let portfolioInv of portfolio">
            <article class="panel panel-default">
                <div class="panel-body">
                    {{ portfolioInv.Name }}
                </div>
                <footer class="panel-footer">
                    <div class="author">
                        {{ portfolioInv.Date }}
                    </div>                    
                </footer>
            </article>
        </div>
    </div>
`
})
export class PortfolioComponent implements OnInit {
    portfolio: Portfolio[];
    portfolioNames: any;

    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        private portfolioService: PortfolioService
    ) { }
    options: any;

    ngOnInit() {
        this.spinnerService.show();
        this.portfolioService.getNames()
            .subscribe(
                data => {
                    this.portfolioNames = data;
                    this.portfolioService.getPortfolioDetails()
                        .subscribe(
                            (portfolio: Portfolio[]) => {
                                this.portfolio = portfolio;

                                let nameItems =  [];
                                let i = 0;
                                for (let nameWise of portfolio) {
                                    i++;
                                    if (nameItems[nameWise.Name]) {

                                    } else {
                                        nameItems[nameWise.Name] = [];
                                    }
                                    let time:number = new Date(nameWise.Date);
                                    let amount:number = nameWise.Price * nameWise.Unit;
                                    if (amount > 0) {
                                        let tempArray = Array();
                                        tempArray.push(time.getTime());
                                        tempArray.push(amount);
                                        nameItems[nameWise.Name].push(tempArray);
                                    }
                                }
                                setTimeout(() => {
                                    this.options = [];
                                    for (let name of this.portfolioNames) {
                                        this.options.push({
                                            name : {
                                                title: { text: name },
                                                series: [{
                                                    name: name,
                                                    data: nameItems[name],
                                                    tooltip: {
                                                        valueDecimals: 2
                                                    }
                                                }]
                                            }
                                        });
                                    };
                                }, 3000);
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