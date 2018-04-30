import { Component } from "@angular/core";
import { PortfolioService } from "./portfolio.service";
import { Portfolio } from "./portfolio.model";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Http } from "@angular/http";
import { ErrorService } from "../errors/error.service";
var PortfolioInputComponent = /** @class */ (function () {
    function PortfolioInputComponent(http, errorService, spinnerService, portfolioService) {
        this.http = http;
        this.errorService = errorService;
        this.spinnerService = spinnerService;
        this.portfolioService = portfolioService;
        this.names = Array();
        this.namesMain = Array();
        this.details = Array();
    }
    PortfolioInputComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.spinnerService.show();
        if (this.portfolio) {
            // Edit
            this.portfolio.Date = form.value.Date ? form.value.Date.toISOString() : '';
            this.portfolio.Transaction = form.value.Transaction;
            this.portfolio.Amount = form.value.Amount;
            this.portfolio.Price = form.value.Price;
            this.portfolio.Unit = this.newUnitDisplay ? this.newUnitDisplay : 0;
            this.portfolio.Units = this.unitsDisplay ? this.unitsDisplay : '';
            this.portfolioService.updatePortfolio(this.portfolio).subscribe(function (data) {
                _this.spinnerService.hide();
            }, function (error) {
                _this.spinnerService.hide();
                //console.error(error)
            });
            this.portfolio = null;
            this.uidDisplay = '';
            this.unitsDisplay = 0;
            this.unitDisplay = 0;
            this.newUnitDisplay = 0;
            this.edit = false;
        }
        else {
            // Create
            var name_1 = form.value.Name ? form.value.Name[0].text : '';
            var type = form.value.type ? form.value.type[0].text : '';
            var date = form.value.Date ? form.value.Date.toISOString() : '';
            var units = this.unitsDisplay ? this.unitsDisplay : '';
            var unit = this.newUnitDisplay ? this.newUnitDisplay : '';
            var portfolio = new Portfolio(name_1, date, form.value.Transaction, form.value.Amount, units, form.value.Price, unit, type, this.uidDisplay);
            this.portfolioService.insertOneEntryPortfolio(portfolio).subscribe(function (data) {
                _this.spinnerService.hide();
                return 'portfolio entry added';
            }, function (error) {
                _this.spinnerService.hide();
                //console.error(error)
            });
        }
        form.resetForm();
        this.uidDisplay = '';
        this.unitsDisplay = 0;
        this.unitDisplay = 0;
        this.newUnitDisplay = 0;
        this.edit = false;
    };
    PortfolioInputComponent.prototype.onClear = function (form) {
        this.portfolio = null;
        form.resetForm();
    };
    PortfolioInputComponent.prototype.calculateUnit = function (form) {
        this.unitsDisplay = 0;
        this.newUnitDisplay = 0;
        this.unitsDisplay = form.value.Amount / form.value.Price;
        this.newUnitDisplay = this.unitDisplay + this.unitsDisplay;
        // Edit Case
        if (this.edit) {
            if (this.portfolio.Units >= this.unitsDisplay) {
                var unit = this.portfolio.Unit;
                var units = this.portfolio.Units;
                this.newUnitDisplay = unit - (units - this.unitsDisplay);
            }
            else if (this.portfolio.Units < this.unitsDisplay) {
                var units = this.portfolio.Units;
                this.newUnitDisplay = this.portfolio.Unit + this.unitsDisplay - units;
            }
        }
    };
    PortfolioInputComponent.prototype.selected = function (event) {
        var _this = this;
        this.unitDisplay = 0;
        this.newUnitDisplay = 0;
        for (var _i = 0, _a = this.details; _i < _a.length; _i++) {
            var detail = _a[_i];
            if (detail.name == event.id) {
                this.uidDisplay = detail.uid;
            }
        }
        // Call to get last Unit entry for the fund
        this.portfolioService.getFundLastEntry(event.id)
            .subscribe(function (portfolio) {
            _this.unitDisplay = portfolio[0].Unit;
        }, function (error) {
            _this.spinnerService.hide();
            //console.error(error)
        });
    };
    PortfolioInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.edit = false;
        this.portfolioService.getNames()
            .subscribe(function (data) {
            var i = 0;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var detail = data_1[_i];
                _this.details.push(detail);
                _this.namesMain.push(detail.name);
                i++;
                if (data.length == i) {
                    _this.names = _this.namesMain;
                }
            }
        });
        this.portfolioService.portfolioIsEdit.subscribe(function (portfolio) {
            _this.edit = true;
            _this.portfolio = portfolio;
            _this.Date = new Date(portfolio.Date.toString());
            _this.unitsDisplay = portfolio.Units;
            _this.unitDisplay = portfolio.Unit;
            _this.newUnitDisplay = portfolio.Unit;
            _this.uidDisplay = portfolio.uid;
            _this.activeName = [portfolio.Name];
            _this.activeType = [portfolio.type];
        });
    };
    PortfolioInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-portfolio-input',
                    templateUrl: './portfolio-input.component.html'
                },] },
    ];
    /** @nocollapse */
    PortfolioInputComponent.ctorParameters = function () { return [
        { type: Http, },
        { type: ErrorService, },
        { type: Ng4LoadingSpinnerService, },
        { type: PortfolioService, },
    ]; };
    return PortfolioInputComponent;
}());
export { PortfolioInputComponent };
