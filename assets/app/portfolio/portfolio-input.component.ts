import { Component, Input, OnInit  } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { PortfolioService } from "../portfolio/portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-portfolio-input',
    styles: [`
      chart {
        display: block; 
      }
    `],
    templateUrl: './portfolio-input.component.html'
})
export class PortfolioInputComponent {
    
    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        private portfolioService: PortfolioService
    ) { }
    ngOnInit() {
    }
}