import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { mimeType } from "../../../services/forms/mine.type.validator";
import { errorMessage } from "../../../services/forms/error.message";
import { uploadFilePiker } from "../../../services/forms/upload.file";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/UserProfile';
import { Router } from '@angular/router';
import { HttpEventsService } from 'src/app/services/http-events.service';



@Component({
    selector: 'app-user-profile-form',
    templateUrl: './user-profile-form.component.html',
    styleUrls: ['./user-profile-form.component.css']
})
export class UserProfileFormComponent implements OnInit {

    public userProfileFrom: FormGroup
    public imagePreview: any


    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private httpEventsService: HttpEventsService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.userProfileFrom = this.formBuilder.group({
            email: [null, [
                Validators.required,
                Validators.email
            ]],
            password: [null, [
                Validators.required,
                Validators.minLength(3)
            ]],
            userName: [null, [
                Validators.required
            ]],
            genus: ['male', [
                Validators.required
            ]],
            birthday: [null, [
                Validators.required
            ]],
            image: [null, [
                Validators.required
            ], [mimeType]]
        })

    }


    onSaveProfile() {
        if (this.userProfileFrom.invalid) {
            return
        }

        this.httpEventsService.setStatus(true)

        const {
            userName,
            genus,
            birthday,
            image,
            email,
            password } = this.userProfileFrom.value

        const newProfile: User = {
            email: email,
            password: password,
            profile: {
                userName: userName,
                genus: genus,
                birthday: birthday,
                imagePath: image,
            }

        }

        this.userService.register(newProfile)
            .subscribe((result) => {
                this.router.navigate(['/auth/login'])
            })
    }


    onImagePicker(event: any) {
        const { file, reader } = uploadFilePiker(event)

        this.userProfileFrom.patchValue({
            image: file
        })

        this.getFormControl('image').updateValueAndValidity()

        reader.onload = () => {
            this.imagePreview = reader.result
        }

        reader.readAsDataURL(file)
    }

    getFormControl(controlName: string): FormControl {
        return this.userProfileFrom.get(controlName) as FormControl
    }

    getErrorMessage(control: FormControl): string {
        return errorMessage(control)
    }

}
