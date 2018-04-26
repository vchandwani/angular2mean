import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import API from '../../core/api';
import { ErrorService } from "../errors/error.service";
import { Portfolio } from "./portfolio.model";
var PortfolioService = /** @class */ (function () {
    function PortfolioService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
        this.portfolios = [];
        this.portfolioIsEdit = new EventEmitter();
    }
    PortfolioService.prototype.getNames = function () {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.portfolioNames + token)
            .map(function (response) {
            var portfolioDetails = response.json().obj;
            var portfolioNames = [];
            portfolioDetails.forEach(function (item, index) {
                portfolioNames.push(item);
            });
            return portfolioNames;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.getMutualFundNames = function () {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.mutualFundNames + token)
            .map(function (response) {
            var portfolioDetails = response.json().obj;
            var portfolioNames = [];
            portfolioDetails.forEach(function (item, index) {
                portfolioNames.push(item);
            });
            return portfolioNames;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.getPortfolioDetails = function () {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.portfolio + token)
            .map(function (response) {
            var portfolioDetails = response.json().obj;
            var transformedPortfolioDetail = [];
            for (var _i = 0, portfolioDetails_1 = portfolioDetails; _i < portfolioDetails_1.length; _i++) {
                var portfolioDetail = portfolioDetails_1[_i];
                transformedPortfolioDetail.push(new Portfolio(portfolioDetail.Name, portfolioDetail.Date, portfolioDetail.Transaction, portfolioDetail.Amount, portfolioDetail.Units, portfolioDetail.Price, portfolioDetail.Unit, portfolioDetail.type, portfolioDetail.uid, portfolioDetail._id));
            }
            _this.portfolios = transformedPortfolioDetail;
            return transformedPortfolioDetail;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.getAllMonthlyData = function () {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.portfolioMonthly + token)
            .map(function (response) {
            var portfolioMonthlyDetails = response.json().obj;
            var transformedPortfolioMonthlyDetail = [];
            for (var _i = 0, portfolioMonthlyDetails_1 = portfolioMonthlyDetails; _i < portfolioMonthlyDetails_1.length; _i++) {
                var portfolioDetail = portfolioMonthlyDetails_1[_i];
                transformedPortfolioMonthlyDetail.push(Array(portfolioDetail.totalAmount, portfolioDetail._id.month, portfolioDetail._id.year));
            }
            return transformedPortfolioMonthlyDetail;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.getActiveFunds = function () {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.fundWise + token)
            .map(function (response) {
            var activeFundsDetails = response.json().obj;
            var activeFundName = [];
            activeFundsDetails.forEach(function (item, index) {
                activeFundName.push(item);
            });
            return activeFundName;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.getFundLastEntry = function (name) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.fundLastEntry + token, {
            params: {
                name: name
            }
        })
            .map(function (response) {
            var activeFundLastDetail = response.json().obj;
            var latestPrice = response.json().latestPrice;
            var datePrice = response.json().datePrice;
            var active = response.json().active;
            var fundLast = [];
            activeFundLastDetail.forEach(function (item, index) {
                fundLast.push(item);
            });
            fundLast[0].latestPrice = latestPrice;
            fundLast[0].datePrice = datePrice;
            fundLast[0].active = active;
            return fundLast;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.getLastEntry = function () {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.lastEntry + token)
            .map(function (response) {
            var details = response.json().obj;
            var lastEntries = [];
            details.forEach(function (item, index) {
                lastEntries.push(item);
            });
            return lastEntries;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.zeroEntries = function () {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.zeroLastEntry + token)
            .map(function (response) {
            var zeroActiveFundLastDetail = response.json().obj;
            return zeroActiveFundLastDetail;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.fundZeroEntries = function (obj, fromDate, toDate) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        var startDate = fromDate;
        var endDate = toDate;
        var api = API.dataForDates;
        return this.http.get(API.dataForDates + token, {
            params: {
                name: obj._id,
                startDate: startDate,
                endDate: endDate
            }
        })
            .map(function (response) {
            var details = response.json().obj;
            if (details == null) {
                return true;
            }
            else {
                return false;
            }
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.insertOneEntryPortfolio = function (portfolio) {
        var _this = this;
        var body = JSON.stringify(portfolio);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(API.portfolio + token, body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            var portfolio = new Portfolio(result.obj.Name, result.obj.Date, result.obj.Transaction, result.obj.Amount, result.obj.Units, result.obj.Price, result.obj.Unit, result.obj.type, result.obj.uid, result.obj._id);
            _this.portfolios.push(portfolio);
            if (portfolio) {
                _this.errorService.handleSuccess(response.json());
                return portfolio;
            }
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.insertPortfolio = function (obj, fromDate, toDate) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        var startDate = fromDate;
        var endDate = toDate;
        var body = JSON.stringify(obj);
        // Insert New Entry Call function for insert
        return this.http.post(API.portfolio + token, body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            return 'Detail added';
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.latestValue = function (uid, type) {
        var _this = this;
        var api = API.quandlApi;
        if (type == 'MF') {
            api = API.quandlApi;
        }
        else if (type == 'Stock') {
            api = API.quandlStockApi;
        }
        api = api.replace('XXX', uid);
        return this.http.get(api)
            .map(function (response) {
            var details = response.json().dataset;
            return details['data'][0];
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.updateLatestValue = function (uid, type, data) {
        var _this = this;
        var latestData;
        latestData = data[1];
        if (type == 'Stock') {
            latestData = data[5];
        }
        // Update FundNames for UID with latest Value
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        var body = JSON.stringify({ uid: uid, price: latestData });
        return this.http.post(API.updatePrice + token, body, { headers: headers })
            .map(function (response) {
            var updateDetail = response.json();
            return true;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.editPortfolio = function (portfolio) {
        this.portfolioIsEdit.emit(portfolio);
    };
    PortfolioService.prototype.updatePortfolio = function (portfolio) {
        var _this = this;
        var body = JSON.stringify(portfolio);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(API.portfolio + '/' + portfolio.portfolioId + token, body, { headers: headers })
            .map(function (response) {
            _this.errorService.handleSuccess(response.json());
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.prototype.deletePortfolio = function (portfolio) {
        var _this = this;
        this.portfolios.splice(this.portfolios.indexOf(portfolio), 1);
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(API.portfolio + '/' + portfolio.portfolioId + token)
            .map(function (response) {
            _this.errorService.handleSuccess(response.json());
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PortfolioService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PortfolioService.ctorParameters = function () { return [
        { type: Http, },
        { type: ErrorService, },
    ]; };
    return PortfolioService;
}());
export { PortfolioService };
