import { Routes, RouterModule } from "@angular/router";
import { MessagesComponent } from "./messages/messages.component";
import { PortfolioDetailComponent } from "./portfolio-detail/portfolio-detail.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PortfolioInputComponent } from "./portfolio/portfolio-input.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'portfolio-input', component: PortfolioInputComponent},
    { path: 'portfolio-detail', component: PortfolioDetailComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);