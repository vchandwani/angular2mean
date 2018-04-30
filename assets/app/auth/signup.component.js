import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
var SignupComponent = /** @class */ (function () {
    function SignupComponent(spinnerService, authService) {
        this.spinnerService = spinnerService;
        this.authService = authService;
    }
    SignupComponent.prototype.onSubmit = function () {
        var _this = this;
        this.spinnerService.show();
        var user = new User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
        this.authService.signup(user)
            .subscribe(function (data) { console.log(data), _this.spinnerService.hide(); }, function (error) { console.error(error), _this.spinnerService.hide(); });
        this.myForm.reset();
    };
    SignupComponent.prototype.ngOnInit = function () {
        this.spinnerService.show();
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
        this.spinnerService.hide();
    };
    SignupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-signup',
                    templateUrl: './signup.component.html'
                },] },
    ];
    /** @nocollapse */
    SignupComponent.ctorParameters = function () { return [
        { type: Ng4LoadingSpinnerService, },
        { type: AuthService, },
    ]; };
    return SignupComponent;
}());
export { SignupComponent };
