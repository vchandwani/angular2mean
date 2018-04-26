import { Component, OnInit, Input } from "@angular/core";

import { Portfolio } from "./portfolio.model";
import { PortfolioService } from "./portfolio.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-portfolio-list',
    template: `        
        <div class="col-md-8 col-md-offset-2">
            <p-table #dt [columns]="cols" [value]="portfolios" [paginator]="true" sortMode="multiple" [rows]="20">
                <ng-template pTemplate="caption">
                    <div style="text-align: right">
                        <i class="fa fa-search" style="margin:4px 4px 0 0"></i>
                        <input type="text" pInputText size="50" placeholder="Global Filter" (input)="dt.filterGlobal($event.target.value, 'contains')"
                            style="width:auto">
                    </div>
                </ng-template>
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th *ngFor="let col of columns" [pSortableColumn]="col.field">
                            {{col.header}}
                            <p-sortIcon [field]="col.field"></p-sortIcon>
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowData let-columns="columns">
                    <tr>
                        <td *ngFor="let col of columns">
                            <ng-container *ngIf='col.field == "Date"'>
                                {{rowData[col.field] | date }}
                            </ng-container>
                            <div *ngIf='col.field == "Amount" || col.field == "Units" || col.field == "Unit" || col.field == "Price"'>
                                {{rowData[col.field] | number : '1.2-2'}}
                            </div>
                            <div *ngIf='col.field != "_id" && col.field != "Date" && col.field != "Amount" && col.field != "Units" && col.field != "Unit" && col.field != "Price"'>
                                {{rowData[col.field]}}
                            </div>
                            <ng-container *ngIf='col.field == "_id"'>
                                <div class="config">
                                    <a (click)="onEdit(rowData)">Edit</a>
                                    <a (click)="onDelete(rowData)">Delete</a>
                                </div>
                            </ng-container>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class PortfolioListComponent implements OnInit {
    portfolios: Portfolio[];
    @Input() portfolio: Portfolio;
    cols: any[];

    constructor(private spinnerService: Ng4LoadingSpinnerService, private portfolioService: PortfolioService) { }

    ngOnInit() {
        this.cols = [
            { field: 'Name', header: 'Name' },
            { field: 'Date', header: 'Date' },
            { field: 'Amount', header: 'Amount' },
            { field: 'Units', header: 'Units' },
            { field: 'Unit', header: 'Unit' },
            { field: 'Price', header: 'Price' },
            { field: 'type', header: 'Type' },
            { field: '_id', header: 'Action' }
        ];
        this.spinnerService.show();
        this.portfolioService.getPortfolioDetails()
        .subscribe(
            (portfolios: Portfolio[]) => {
                this.portfolios = portfolios;
                this.spinnerService.hide();
            }
        );
    }
    onEdit(portfolio) {
        this.portfolioService.editPortfolio(portfolio);
    }

    onDelete(portfolio) {
        this.spinnerService.show();
        this.portfolioService.deletePortfolio(portfolio)
            .subscribe(
                data => {
                    this.spinnerService.hide();
                },
                error => {
                    this.spinnerService.hide();
                    //console.error(error)
                }
                //result => console.log(result)
            );
    }
}