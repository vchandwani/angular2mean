import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PortfolioDetailComponent } from "./portfolio-detail.component";
import { DataTableModule, SharedModule, DialogModule,DataGridModule ,InputTextModule,ButtonModule} from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular2-highcharts';

@NgModule({
    declarations: [
        PortfolioDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DataTableModule, SharedModule, DialogModule,DataGridModule ,InputTextModule,ButtonModule,
        ChartsModule,
        ChartModule.forRoot(require('highcharts/highstock'))
    ]
})
export class PortfolioDetailModule {

}