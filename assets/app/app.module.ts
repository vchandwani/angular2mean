import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { MessageModule } from "./messages/message.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ChartModule } from 'angular2-highcharts';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        MessageModule,
        PortfolioModule,
        Ng4LoadingSpinnerModule.forRoot(),
        ChartModule.forRoot(require('highcharts/highstock'))
    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {
    }

}
platformBrowserDynamic().bootstrapModule(AppModule);