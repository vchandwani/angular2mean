import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable, BehaviorSubject } from "rxjs";
import API from '../../core/api';
import { ErrorService } from "../errors/error.service";
import { Portfolio } from "./portfolio.model";

@Injectable()
export class PortfolioService {
    private portfolios: Portfolio[] = [];
    portfolioIsEdit = new EventEmitter<Portfolio>();

    constructor(private http: Http, private errorService: ErrorService) { }
    getNames() {
        return this.http.get(API.api_url+API.portfolioNames)
            .map((response: Response) => {
                const portfolioDetails = response.json().obj;
                let portfolioNames = [];
                portfolioDetails.forEach((item, index) => {
                    portfolioNames.push(item);
                });
                return portfolioNames;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    getMutualFundNames() {
        return this.http.get(API.api_url+API.mutualFundNames)
            .map((response: Response) => {
                const portfolioDetails = response.json().obj;
                let portfolioNames = [];
                portfolioDetails.forEach((item, index) => {
                    portfolioNames.push(item);
                });
                return portfolioNames;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    getPortfolioDetails() {
        return this.http.get(API.api_url+API.portfolio)
            .map((response: Response) => {
                const portfolioDetails = response.json().obj;
                let transformedPortfolioDetail: Portfolio[] = [];
                for (let portfolioDetail of portfolioDetails) {
                    transformedPortfolioDetail.push(new Portfolio(
                        portfolioDetail.Name,
                        portfolioDetail.Date,
                        portfolioDetail.Transaction,
                        portfolioDetail.Amount,
                        portfolioDetail.Units,
                        portfolioDetail.Price,
                        portfolioDetail.Unit,
                        portfolioDetail.type,
                        portfolioDetail.uid,
                        portfolioDetail._id)
                    );
                }
                this.portfolios = transformedPortfolioDetail;
                return transformedPortfolioDetail;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    getAllMonthlyData() {
        return this.http.get(API.api_url+API.portfolioMonthly)
            .map((response: Response) => {
                const portfolioMonthlyDetails = response.json().obj;
                let transformedPortfolioMonthlyDetail = [];
                for (let portfolioDetail of portfolioMonthlyDetails) {
                    transformedPortfolioMonthlyDetail.push(
                        Array(
                            portfolioDetail.totalAmount,
                            portfolioDetail._id.month,
                            portfolioDetail._id.year
                        )
                    );
                }
                return transformedPortfolioMonthlyDetail;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    getActiveFunds() {
        return this.http.get(API.api_url+API.fundWise)
            .map((response: Response) => {
                const activeFundsDetails = response.json().obj;
                let activeFundName = [];
                activeFundsDetails.forEach((item, index) => {
                    activeFundName.push(item);
                });
                return activeFundName;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    getFundLastEntry(name) {
        return this.http.get(API.api_url+API.fundLastEntry , {
            params: {
                name: name
            }
        })
            .map((response: Response) => {
                const activeFundLastDetail = response.json().obj;
                const latestPrice = response.json().latestPrice;
                const datePrice = response.json().datePrice;
                const active = response.json().active;
                let fundLast = [];
                activeFundLastDetail.forEach((item, index) => {
                    fundLast.push(item);
                });
                fundLast[0].latestPrice = latestPrice;
                fundLast[0].datePrice = datePrice;
                fundLast[0].active = active;
                return fundLast;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    getLastEntry() {
        return this.http.get(API.api_url+API.lastEntry)
            .map((response: Response) => {
                const details = response.json().obj;
                let lastEntries = [];
                details.forEach((item, index) => {
                    lastEntries.push(item);
                });
                return lastEntries;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    zeroEntries() {
        return this.http.get(API.api_url+API.zeroLastEntry)
            .map((response: Response) => {
                const zeroActiveFundLastDetail = response.json().obj;
                return zeroActiveFundLastDetail;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    fundZeroEntries(obj, fromDate, toDate) {
        let startDate = fromDate;
        let endDate = toDate;
        let api = API.api_url+API.dataForDates;
        return this.http.get(API.api_url+API.dataForDates, {
            params: {
                name: obj._id,
                startDate: startDate,
                endDate: endDate
            }
        })
            .map((response: Response) => {
                const details = response.json().obj;
                if (details == null) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    insertOneEntryPortfolio(portfolio: Portfolio) {
        const body = JSON.stringify(portfolio);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(API.api_url+API.portfolio + token, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const portfolio = new Portfolio(
                    result.obj.Name,
                    result.obj.Date,
                    result.obj.Transaction,
                    result.obj.Amount,
                    result.obj.Units,
                    result.obj.Price,
                    result.obj.Unit,
                    result.obj.type,
                    result.obj.uid,
                    result.obj._id
                );
                this.portfolios.push(portfolio);
                if (portfolio) {
                    this.errorService.handleSuccess(response.json());
                    return portfolio;
                }
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    insertPortfolio(obj, fromDate, toDate) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        let startDate = fromDate;
        let endDate = toDate;
        const body = JSON.stringify(obj);
        // Insert New Entry Call function for insert
        return this.http.post(API.api_url+API.portfolio + token, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                return 'Detail added';
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    latestValue(uid, type) {
        let api = API.quandlApi;
        if (type == 'MF') {
            api = API.quandlApi;
        } else if (type == 'Stock') {
            api = API.quandlStockApi;
        }
        api = api.replace('XXX', uid);
        return this.http.get(api)
            .map((response: Response) => {
                const details = response.json().dataset;
                return details['data'][0];
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    updateLatestValue(uid, type, data) {
        let latestData: number;
        latestData = data[1];
        if (type == 'Stock') {
            latestData = data[5];
        }
        // Update FundNames for UID with latest Value                
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        const body = JSON.stringify({ uid: uid, price: latestData });
        return this.http.post(API.api_url+API.updatePrice + token, body, { headers: headers })
            .map((response: Response) => {
                const updateDetail = response.json();
                return true;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    editPortfolio(portfolio: Portfolio) {
        this.portfolioIsEdit.emit(portfolio);
    }
    updatePortfolio(portfolio: Portfolio) {
        const body = JSON.stringify(portfolio);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(API.api_url+API.portfolio+'/' + portfolio.portfolioId + token, body, {headers: headers})
            .map((response: Response) => {                
                this.errorService.handleSuccess(response.json());                
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deletePortfolio(portfolio: Portfolio) {
        this.portfolios.splice(this.portfolios.indexOf(portfolio), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(API.api_url+API.portfolio+'/' + portfolio.portfolioId + token)
            .map((response: Response) => {                
                this.errorService.handleSuccess(response.json());                
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}