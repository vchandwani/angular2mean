import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PortfolioDetailComponent } from "./portfolio-detail.component";
import { DataTableModule, SharedModule, DialogModule, DataGridModule, InputTextModule, ButtonModule } from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
export function highchartsFactory() {
    const hc = require('highcharts/highstock');
    const dd = require('highcharts/modules/exporting');
    dd(hc);
    return hc;
}

@NgModule({
    declarations: [
        PortfolioDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DataTableModule, SharedModule, DialogModule, DataGridModule, InputTextModule, ButtonModule,
        ChartsModule,
        ChartModule
    ],
    providers: [
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        }
    ]
})
export class PortfolioDetailModule {

}