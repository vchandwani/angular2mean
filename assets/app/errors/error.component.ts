import { Component, OnInit } from "@angular/core";

import { Error } from "./error.model";
import { ErrorService } from "./error.service";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    error: Error;
    display = 'none';
    displaySuccess = 'none';
    displayError = 'none';

    constructor(private errorService: ErrorService) {}

    onErrorHandled() {
        this.display = 'none';
    }

    ngOnInit() {
        this.errorService.errorOccurred
            .subscribe(
                (error: Error) => {
                    if(error.success){
                        this.displaySuccess = '';
                        this.displayError = 'none';
                    } else {
                        this.displayError = '';
                        this.displaySuccess = 'none';
                    }
                    this.error = error;
                    this.display = 'block';
                }
            );
    }
}