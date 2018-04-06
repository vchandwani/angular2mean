import { Component, OnInit } from "@angular/core";
import { PortfolioService } from "./portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-portfolio',
    styles: [`
        .chart {display: block; width: 100%;}
    `],
    template: `
    <div style="display: block">
        <canvas baseChart *ngIf="chartDisplay" [data]="chartDataMain" [labels]="chartLabelsMain" [chartType]="doughnutChartType"></canvas>
    </div>
    <div style="display: block">
        <canvas baseChart *ngIf="chartDisplay"
                [data]="chartDataMain"
                [labels]="chartLabelsMain"
                [chartType]="pieChartType"
                (chartHover)="chartHovered($event)"
                (chartClick)="chartClicked($event)"></canvas>
    </div>
    `
})
export class PortfolioComponent implements OnInit {
    constructor(private spinnerService: Ng4LoadingSpinnerService, private portfolioService: PortfolioService) { }
    rows = [];
    // Doughnut
    public chartLabelsMain: string[] = [];
    public chartDataMain: number[] = [];
    public doughnutChartType: string = 'doughnut';
    public pieChartType: string = 'pie';
    public chartDisplay = false;

    ngOnInit() {
        this.spinnerService.show();
        this.portfolioService.getActiveFunds()
            .subscribe(
                data => {
                    this.rows = data;
                    let i = 0;
                    this.rows.forEach((item) => {
                        this.portfolioService.getFundLastEntry(item.name)
                            .subscribe(
                                data => {
                                    i++;
                                    this.chartLabelsMain.push(data[0].Name);
                                    this.chartDataMain.push(data[0].Price * data[0].Unit);
                                    if (this.rows.length == i) {
                                        this.spinnerService.hide();
                                        this.chartDisplay = true;
                                    }
                                },
                                error => {
                                    this.spinnerService.hide();
                                    //console.error(error)
                                }
                            );
                    });
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                }
            );
    }
}