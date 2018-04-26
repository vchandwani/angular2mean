import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PortfolioDetailComponent } from "./portfolio-detail.component";
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { DataTableModule, SharedModule, DialogModule, DataGridModule, InputTextModule, ButtonModule } from 'primeng/primeng';
export function highchartsFactory() {
    var hc = require('highcharts');
    var dd = require('highcharts/highstock');
    dd(hc);
    return hc;
}
var PortfolioDetailModule = /** @class */ (function () {
    function PortfolioDetailModule() {
    }
    PortfolioDetailModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        PortfolioDetailComponent
                    ],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        DataTableModule, SharedModule, DialogModule, DataGridModule, InputTextModule, ButtonModule,
                        ChartModule
                    ], providers: [
                        {
                            provide: HighchartsStatic,
                            useFactory: highchartsFactory
                        }
                    ],
                },] },
    ];
    /** @nocollapse */
    PortfolioDetailModule.ctorParameters = function () { return []; };
    return PortfolioDetailModule;
}());
export { PortfolioDetailModule };
