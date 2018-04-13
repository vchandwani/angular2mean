import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable, BehaviorSubject } from "rxjs";
import API from '../../core/api';
import { ErrorService } from "../errors/error.service";
import { Portfolio } from "./portfolio.model";

@Injectable()
export class PortfolioService {

    constructor(private http: Http, private errorService: ErrorService) { }
    getNames() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.portfolioNames + token)
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
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.mutualFundNames + token)
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
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.portfolio + token)
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
                        portfolioDetail.Unit)
                    );
                }
                return transformedPortfolioDetail;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    getAllMonthlyData() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.portfolioMonthly + token)
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
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.fundWise + token)
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
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.fundLastEntry + token, {
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
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(API.lastEntry + token)
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
    latestValue(uid) {
        let api = API.quandlApi;
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
    updateLatestValue(uid, data) {
        let latestData: number;
        latestData = data[1];
        // Update FundNames for UID with latest Value                
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        const body = JSON.stringify({ uid: uid, price: latestData });
        return this.http.post(API.updatePrice + token, body, { headers: headers })
            .map((response: Response) => {
                const updateDetail = response.json();
                return true;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}