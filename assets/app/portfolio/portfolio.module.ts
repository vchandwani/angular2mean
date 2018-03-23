import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PortfolioComponent } from "./portfolio.component";
import { PortfolioService } from "./portfolio.service";
import { ChartModule } from 'angular2-highcharts'; 


@NgModule({
    declarations: [
        PortfolioComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ChartModule.forRoot(require('highcharts/highstock'))
    ],
    providers: [PortfolioService]
})
export class PortfolioModule {

}