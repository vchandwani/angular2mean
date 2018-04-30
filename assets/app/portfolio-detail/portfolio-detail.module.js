import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PortfolioDetailComponent } from "./portfolio-detail.component";
import { DataTableModule, SharedModule, DialogModule, DataGridModule, InputTextModule, ButtonModule } from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts';
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
                        ChartsModule
                    ]
                },] },
    ];
    return PortfolioDetailModule;
}());
export { PortfolioDetailModule };
