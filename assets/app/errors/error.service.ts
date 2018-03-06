import { EventEmitter } from "@angular/core";

import { Error } from "./error.model";

export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

    handleError(error: any) {
        const errorData = new Error(error.title, error.error.message,false);
        this.errorOccurred.emit(errorData);
    }
    handleSuccess(error: any) {
        const successData = new Error(error.title,'',true);
        this.errorOccurred.emit(successData);
    }
}