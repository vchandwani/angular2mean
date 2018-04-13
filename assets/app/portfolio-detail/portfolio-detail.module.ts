import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PortfolioDetailComponent } from "./portfolio-detail.component";
import { ChartModule } from 'angular2-highcharts';
import { DataTableModule, SharedModule, DialogModule,DataGridModule ,InputTextModule,ButtonModule} from 'primeng/primeng';


@NgModule({
    declarations: [
        PortfolioDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DataTableModule, SharedModule, DialogModule,DataGridModule ,InputTextModule,ButtonModule,
        ChartModule.forRoot(require('highcharts/highstock'))
    ]
})
export class PortfolioDetailModule {

}