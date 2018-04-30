import { Component, Input } from "@angular/core";
import { Portfolio } from "./portfolio.model";
import { PortfolioService } from "./portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
var PortfolioListComponent = /** @class */ (function () {
    function PortfolioListComponent(spinnerService, portfolioService) {
        this.spinnerService = spinnerService;
        this.portfolioService = portfolioService;
    }
    PortfolioListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cols = [
            { field: 'Name', header: 'Name' },
            { field: 'Date', header: 'Date' },
            { field: 'Amount', header: 'Amount' },
            { field: 'Units', header: 'Units' },
            { field: 'Unit', header: 'Unit' },
            { field: 'Price', header: 'Price' },
            { field: 'type', header: 'Type' },
            { field: '_id', header: 'Action' }
        ];
        this.spinnerService.show();
        this.portfolioService.getPortfolioDetails()
            .subscribe(function (portfolios) {
            _this.portfolios = portfolios;
            _this.spinnerService.hide();
        });
    };
    PortfolioListComponent.prototype.onEdit = function (portfolio) {
        this.portfolioService.editPortfolio(portfolio);
    };
    PortfolioListComponent.prototype.onDelete = function (portfolio) {
        var _this = this;
        this.spinnerService.show();
        this.portfolioService.deletePortfolio(portfolio)
            .subscribe(function (data) {
            _this.spinnerService.hide();
        }, function (error) {
            _this.spinnerService.hide();
            //console.error(error)
        }
        //result => console.log(result)
        );
    };
    PortfolioListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-portfolio-list',
                    template: "        \n        <div class=\"col-md-8 col-md-offset-2\">\n            <p-table #dt [columns]=\"cols\" [value]=\"portfolios\" [paginator]=\"true\" sortMode=\"multiple\" [rows]=\"20\">\n                <ng-template pTemplate=\"caption\">\n                    <div style=\"text-align: right\">\n                        <i class=\"fa fa-search\" style=\"margin:4px 4px 0 0\"></i>\n                        <input type=\"text\" pInputText size=\"50\" placeholder=\"Global Filter\" (input)=\"dt.filterGlobal($event.target.value, 'contains')\"\n                            style=\"width:auto\">\n                    </div>\n                </ng-template>\n                <ng-template pTemplate=\"header\" let-columns>\n                    <tr>\n                        <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\">\n                            {{col.header}}\n                            <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                        </th>\n                    </tr>\n                </ng-template>\n                <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n                    <tr>\n                        <td *ngFor=\"let col of columns\">\n                            <ng-container *ngIf='col.field == \"Date\"'>\n                                {{rowData[col.field] | date }}\n                            </ng-container>\n                            <div *ngIf='col.field == \"Amount\" || col.field == \"Units\" || col.field == \"Unit\" || col.field == \"Price\"'>\n                                {{rowData[col.field] | number : '1.2-2'}}\n                            </div>\n                            <div *ngIf='col.field != \"_id\" && col.field != \"Date\" && col.field != \"Amount\" && col.field != \"Units\" && col.field != \"Unit\" && col.field != \"Price\"'>\n                                {{rowData[col.field]}}\n                            </div>\n                            <ng-container *ngIf='col.field == \"_id\"'>\n                                <div class=\"config\">\n                                    <a (click)=\"onEdit(rowData)\">Edit</a>\n                                    <a (click)=\"onDelete(rowData)\">Delete</a>\n                                </div>\n                            </ng-container>\n                        </td>\n                    </tr>\n                </ng-template>\n            </p-table>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    PortfolioListComponent.ctorParameters = function () { return [
        { type: Ng4LoadingSpinnerService, },
        { type: PortfolioService, },
    ]; };
    PortfolioListComponent.propDecorators = {
        "portfolio": [{ type: Input },],
    };
    return PortfolioListComponent;
}());
export { PortfolioListComponent };
