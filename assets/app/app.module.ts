import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2OdometerModule } from 'ng2-odometer';
import { CalendarModule} from 'primeng/calendar';
import {SelectModule} from 'ng2-select';
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { DataTableModule, SharedModule, DialogModule,DataGridModule ,InputTextModule,ButtonModule} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { PortfolioService } from "./portfolio/portfolio.service";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PortfolioListComponent } from "./portfolio/portfolio-list.component";
import { PortfolioInputComponent } from "./portfolio/portfolio-input.component";
import { PortfolioDetailComponent } from "./portfolio-detail/portfolio-detail.component";
import { MessagesComponent } from "./messages/messages.component";
import { MessageListComponent } from "./messages/message-list.component";
import { MessageComponent } from "./messages/message.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { MessageService } from "./messages/message.service";

@NgModule({    
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        routing,
        HttpModule,
        Ng4LoadingSpinnerModule.forRoot(),
        Ng2OdometerModule.forRoot(),
        ChartsModule,
        ChartModule.forRoot(require('highcharts/highstock')),
        DataTableModule,
        DataGridModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        SharedModule,
        DialogModule,
        CalendarModule,
        SelectModule
    ],
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent,
        PortfolioComponent,
        PortfolioListComponent,
        PortfolioInputComponent,
        MessagesComponent,
        MessageListComponent,
        MessageComponent,
        MessageInputComponent,
        PortfolioDetailComponent
    ],
    providers: [AuthService, ErrorService,PortfolioService,MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {
    }

}
platformBrowserDynamic().bootstrapModule(AppModule);