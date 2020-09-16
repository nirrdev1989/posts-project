import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from "../../../services/auth.service";
import { Router } from '@angular/router';
import { errorMessage } from "../../../services/forms/error.message";
import { HttpEventsService } from 'src/app/services/http-events.service';


@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit, OnDestroy {

    public authForm: FormGroup

    constructor(
        private formBulider: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private httpEventsService: HttpEventsService
    ) { }

    ngOnInit(): void {
        this.authForm = this.formBulider.group({
            email: [null, [
                Validators.required
            ]],
            password: [null, [
                Validators.required
            ]]
        })
    }


    onSubmit() {
        if (this.authForm.invalid) {
            return
        }
        this.httpEventsService.setStatus(true)

        const { email, password } = this.authForm.value

        this.authService.logIn(email, password)
            .subscribe((result) => {
                this.router.navigate(['/'])
                this.authForm.reset()
            })

    }


    getFormControl(controlName: string): FormControl {
        return this.authForm.get(controlName) as FormControl
    }

    getErrorMessage(control: FormControl) {
        return errorMessage(control)
    }

    ngOnDestroy(): void { }


}
