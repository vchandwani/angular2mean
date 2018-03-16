import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable, BehaviorSubject } from "rxjs";
import API from '../../core/api';
import { ErrorService } from "../errors/error.service";
import { Portfolio } from "./portfolio.model";

@Injectable()
export class PortfolioService {

    constructor(private http: Http, private errorService: ErrorService) {}
    getNames(){
        return this.http.get(API.portfolioNames)
            .map((response: Response) => {
                const portfolioDetails = response.json().obj;
                let portfolioNames  = [];
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
        return this.http.get(API.portfolio)
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
}