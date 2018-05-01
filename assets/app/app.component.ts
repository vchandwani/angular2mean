import { Component, OnInit } from '@angular/core';
import { MessageService } from "./messages/message.service";
import { AuthService } from "./auth/auth.service";
import { PortfolioService } from "./portfolio/portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        private messageService: MessageService,
        private authService: AuthService,
        private portfolioService: PortfolioService) { }
    ngOnInit() {
        this.spinnerService.hide();
    }
    title = 'Mean Stack';
}
