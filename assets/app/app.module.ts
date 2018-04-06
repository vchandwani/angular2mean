import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { DataTableModule, SharedModule, DialogModule,DataGridModule ,InputTextModule,ButtonModule} from 'primeng/primeng';
import { MessageModule } from "./messages/message.module";
import { PortfolioDetailModule } from "./portfolio-detail/portfolio-detail.module";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ChartsModule } from 'ng2-charts';
import { PortfolioService } from "./portfolio/portfolio.service";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PortfolioInputComponent } from "./portfolio/portfolio-input.component";

@NgModule({    
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        routing,
        HttpModule,
        MessageModule,
        PortfolioDetailModule,
        Ng4LoadingSpinnerModule.forRoot(),
        ChartsModule,
        DataTableModule,
        DataGridModule,
        ButtonModule,
        InputTextModule,
        SharedModule,
        DialogModule
    ],
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent,
        PortfolioComponent,
        PortfolioInputComponent
    ],
    providers: [AuthService, ErrorService,PortfolioService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {
    }

}
platformBrowserDynamic().bootstrapModule(AppModule);