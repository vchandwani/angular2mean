import { Component } from "@angular/core";
import { PortfolioService } from "../portfolio/portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
var PortfolioDetailComponent = /** @class */ (function () {
    function PortfolioDetailComponent(spinnerService, portfolioService) {
        this.spinnerService = spinnerService;
        this.portfolioService = portfolioService;
        this.lineChartData = [];
        this.lineChartDataTemp = [];
        this.chartData = [];
        this.lineChartLabels = [];
        this.chartLabels = [];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartType = 'line';
        this.mutualOptionsChart = Array();
        this.activeFunds = [];
        this.rows = [];
        this.reversePortfolio = [];
        this.totalAmount = 0;
        this.tempArrayMain = Array();
        this.tempMonthMain = Array();
        this.dataMain = Array();
        this.dataLabel = '';
        this.chartDisplay = false;
        this.mutualDisplay = false;
        this.stockDisplay = false;
        this.month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "Septmeber", "October", "November", "December");
    }
    PortfolioDetailComponent.prototype.chartHovered = function (e) {
    };
    PortfolioDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerService.show();
        this.portfolioService.getNames()
            .subscribe(function (data) {
            var mainArray = Array();
            _this.portfolioNames = data;
            _this.portfolioService.getPortfolioDetails()
                .subscribe(function (portfolio) {
                var nameItems = [];
                var i = 0;
                var z = 0;
                for (var _i = 0, portfolio_1 = portfolio; _i < portfolio_1.length; _i++) {
                    var nameWise = portfolio_1[_i];
                    if (nameItems[nameWise.Name]) {
                    }
                    else {
                        nameItems[nameWise.Name] = [];
                    }
                    if (_this.chartLabels[nameWise.Name]) {
                    }
                    else {
                        _this.chartLabels[nameWise.Name] = [];
                    }
                    if (_this.chartData[nameWise.Name]) {
                    }
                    else {
                        _this.chartData[nameWise.Name] = [];
                    }
                    var priceBe = nameWise.Price;
                    var unitBe = nameWise.Unit;
                    var amount = priceBe * unitBe;
                    if (amount) {
                        var dateString = nameWise.Date.toString();
                        var res = dateString.split("-");
                        var time = new Date(res[0] + '-' + res[1] + '-' + res[2]).getTime();
                        var tempArray = Array();
                        tempArray.push(time);
                        tempArray.push(amount);
                        nameItems[nameWise.Name].push(tempArray);
                        _this.chartLabels[nameWise.Name].push(new Date(time).getDay() + '-' + _this.month[new Date(time).getMonth()] + '-' + new Date(time).getFullYear());
                        _this.chartData[nameWise.Name].push(amount);
                    }
                    i++;
                }
                _this.reversePortfolio = portfolio.reverse();
                _this.tempMonthMain = Array();
                var _loop_1 = function (nameWise) {
                    var amount = nameWise.Price * nameWise.Unit;
                    if (amount) {
                        var dateString = nameWise.Date;
                        var res = dateString.split("-");
                        var timeMain = new Date(res[0] + '-' + res[1] + '-' + '31').getTime();
                        if (_this.tempMonthMain.indexOf(timeMain) < 0) {
                            _this.tempMonthMain.push(timeMain);
                        }
                        if (!_this.tempArrayMain[timeMain]) {
                            _this.tempArrayMain[timeMain] = Array();
                        }
                        if (!_this.tempArrayMain[timeMain]['names']) {
                            _this.tempArrayMain[timeMain]['names'] = Array();
                        }
                        if (_this.tempArrayMain[timeMain]['names'].indexOf(nameWise.Name) < 0) {
                            // Check whether name alread pushes to avoid duplicate for the Month
                            // Check whether name alread pushes to avoid duplicate for the Month                                        
                            _this.tempArrayMain[timeMain]['names'].push(nameWise.Name);
                            if (!_this.tempArrayMain[timeMain]['amount']) {
                                _this.tempArrayMain[timeMain]['amount'] = Array();
                                _this.tempArrayMain[timeMain]['amount'][0] = 0;
                            }
                            _this.tempArrayMain[timeMain]['amount'][0] += parseInt(nameWise.Price) * parseInt(nameWise.Unit);
                        }
                    }
                    z++;
                    if (z == _this.reversePortfolio.length) {
                        var y_1 = 0;
                        var mainItem_1 = [];
                        _this.mainOptions = [];
                        _this.dataMain = [];
                        _this.dataLabel = 'Portfolio Total';
                        mainItem_1['main'] = [];
                        _this.tempMonthMain.reverse();
                        // Display Main chart
                        // Display Main chart
                        _this.tempMonthMain.forEach(function (item, index) {
                            y_1++;
                            var tempArray = Array();
                            var time = item;
                            if (y_1 != _this.tempMonthMain.length) {
                                tempArray.push(time);
                                tempArray.push(_this.tempArrayMain[item]['amount'][0]);
                                mainItem_1['main'].push(tempArray);
                                _this.dataMain.push(_this.tempArrayMain[item]['amount'][0]);
                                _this.lineChartLabels.push(new Date(time).getDay() + '-' + _this.month[new Date(time).getMonth()] + '-' + new Date(time).getFullYear());
                            }
                            else if (y_1 == _this.tempMonthMain.length) {
                                // Get altest price and add it to main Item array
                                // Get altest price and add it to main Item array
                                _this.totalAmount = parseInt(localStorage.getItem('totalAmount'));
                                var tempArray_1 = Array();
                                var time_1 = item;
                                tempArray_1.push(new Date().getTime());
                                tempArray_1.push(_this.totalAmount);
                                _this.dataMain.push(_this.totalAmount);
                                _this.lineChartLabels.push(new Date().getDate() + '-' + _this.month[new Date().getMonth()] + '-' + new Date().getFullYear());
                                mainItem_1['main'].push(tempArray_1);
                                _this.mainOptions.push({
                                    title: { text: 'Portfolio Total' },
                                    series: [{
                                            name: 'Portfolio Total',
                                            data: mainItem_1['main'],
                                            tooltip: {
                                                valueDecimals: 2
                                            }
                                        }]
                                });
                                _this.lineChartData = [{ data: _this.dataMain, label: _this.dataLabel }];
                                _this.chartDisplay = true;
                            }
                        });
                    }
                };
                for (var _a = 0, _b = _this.reversePortfolio; _a < _b.length; _a++) {
                    var nameWise = _b[_a];
                    _loop_1(nameWise);
                }
                _this.options = [];
                _this.stockOptions = [];
                _this.mutualOptionsChart = [];
                _this.stockOptionsChart = [];
                var _loop_2 = function (detail) {
                    var name_1 = detail.name;
                    _this.portfolioService.getFundLastEntry(name_1)
                        .subscribe(function (portfolio) {
                        var tempArray = Array();
                        var amount = portfolio[0].latestPrice * portfolio[0].Unit;
                        tempArray.push(new Date().getTime());
                        tempArray.push(amount);
                        nameItems[name_1].push(tempArray);
                        _this.chartData[name_1].push(amount);
                        _this.chartLabels[name_1].push(new Date().getDate() + '-' + _this.month[new Date().getMonth()] + '-' + new Date().getFullYear());
                        _this.lineChartDataTemp = Array();
                        if (portfolio[0].type == 'MF') {
                            _this.options.push({
                                title: { text: name_1 },
                                series: [{
                                        name: name_1,
                                        data: nameItems[name_1],
                                        tooltip: {
                                            valueDecimals: 2
                                        }
                                    }]
                            });
                            _this.lineChartDataTemp = [{ data: _this.chartData[name_1], label: name_1 }];
                            _this.mutualOptionsChart.push({
                                label: _this.chartLabels[name_1],
                                series: _this.lineChartDataTemp
                            });
                        }
                        else if (portfolio[0].type == 'Stock') {
                            _this.stockOptions.push({
                                title: { text: name_1 },
                                series: [{
                                        name: name_1,
                                        data: nameItems[name_1],
                                        tooltip: {
                                            valueDecimals: 2
                                        }
                                    }]
                            });
                            _this.lineChartDataTemp = [{ data: _this.chartData[name_1], label: name_1 }];
                            _this.stockOptionsChart.push({
                                label: _this.chartLabels[name_1],
                                series: _this.lineChartDataTemp
                            });
                        }
                        // All entries pushed
                        if (_this.portfolioNames.length == _this.mutualOptionsChart.length + _this.stockOptionsChart.length) {
                            _this.stockDisplay = true;
                            _this.mutualDisplay = true;
                        }
                    }, function (error) {
                        _this.spinnerService.hide();
                        //console.error(error)
                    });
                };
                for (var _c = 0, _d = _this.portfolioNames; _c < _d.length; _c++) {
                    var detail = _d[_c];
                    _loop_2(detail);
                }
                ;
            });
            _this.spinnerService.hide();
        }, function (error) {
            _this.spinnerService.hide();
            //console.error(error)
        });
    };
    PortfolioDetailComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-portfolio-detail',
                    styles: ["\n      chart {\n        display: block; \n      }\n    "],
                    template: "\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div style=\"display: block;\" *ngIf=\"chartDisplay\">\n                <canvas baseChart width=\"100%\" [datasets]=\"lineChartData\" [labels]=\"lineChartLabels\" [options]=\"lineChartOptions\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\"></canvas>\n            </div>\n        </div>\n    </div>\n    <!--<div *ngFor=\"let optionsVal of mainOptions\">\n        <chart type=\"StockChart\" [options]=\"optionsVal\"></chart>\n    </div>-->\n    <ul class=\"nav nav-pills\">\n        <li class=\"active\"><a data-toggle=\"pill\" href=\"portfolio-detail#mutual_funds\">Mutual Funds</a></li>\n        <li><a data-toggle=\"pill\" href=\"portfolio-detail#stocks\">Stocks</a></li>\n    </ul>\n    <div class=\"tab-content\">\n        <div id=\"mutual_funds\" class=\"tab-pane fade in active\">\n            <h3>Mutual Funds</h3>\n            <!--<div *ngFor=\"let optionsVal of options\">\n                <chart type=\"StockChart\" [options]=\"optionsVal\"></chart>\n            </div>-->\n            <div class=\"row\" *ngIf=\"mutualDisplay\">\n                <div class=\"col-md-12\" *ngFor=\"let optionsVal of mutualOptionsChart\">\n                    <div style=\"display: block;\">\n                        <canvas baseChart width=\"100%\" [datasets]=\"optionsVal.series\" [labels]=\"optionsVal.label\" [options]=\"lineChartOptions\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\"></canvas>\n                    </div>\n                </div>                \n            </div>\n        </div>\n        <div id=\"stocks\" class=\"tab-pane fade\">\n            <h3>Stocks</h3>\n            <!--<div *ngFor=\"let optionsVal of stockOptions\">\n                <chart type=\"StockChart\" [options]=\"optionsVal\"></chart>\n            </div>-->\n            <div class=\"row\" *ngIf=\"stockDisplay\">\n                <div class=\"col-md-12\" *ngFor=\"let optionsVal of stockOptionsChart\">\n                    <div style=\"display: block;\">\n                        <canvas baseChart width=\"100%\" [datasets]=\"optionsVal.series\" [labels]=\"optionsVal.label\" [options]=\"lineChartOptions\" [chartType]=\"lineChartType\" (chartHover)=\"chartHovered($event)\"></canvas>\n                    </div>\n                </div>                \n            </div>\n        </div>\n    </div>\n"
                },] },
    ];
    /** @nocollapse */
    PortfolioDetailComponent.ctorParameters = function () { return [
        { type: Ng4LoadingSpinnerService, },
        { type: PortfolioService, },
    ]; };
    return PortfolioDetailComponent;
}());
export { PortfolioDetailComponent };
