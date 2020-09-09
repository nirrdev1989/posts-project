import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { uploadFilePiker } from "../../../services/forms/upload.file";
import { errorMessage } from "../../../services/forms/error.message";
import { mimeType } from "../../../services/forms/mine.type.validator";
import { EditProperyUser } from "../../../models/UserProfile";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-edit-profile-field',
    templateUrl: './edit-profile-field.component.html',
    styleUrls: ['./edit-profile-field.component.css']
})
export class EditProfileFieldComponent implements OnInit {

    editForm: FormGroup
    filedProperyName: string
    inputType: string
    inputValue: any
    imagePreview: any

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: EditProperyUser,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog
    ) { }


    ngOnInit(): void {
        const { value, propertyname } = this.data

        this.editForm = this.formBuilder.group({})

        this.filedProperyName = propertyname
        this.inputValue = value


        this.editForm.addControl(
            this.filedProperyName,
            new FormControl(this.inputValue, [Validators.required])
        )

        if (this.filedProperyName === 'email') {
            this.getFormControl('email').setValidators([
                Validators.required,
                Validators.email
            ])
        }
        else if (this.filedProperyName === 'imagePath') {
            this.imagePreview = this.inputValue
            this.getFormControl('imagePath').setAsyncValidators(
                mimeType
            )
        }
    }


    onEiditProfileField() {
        if (this.editForm.invalid) {
            return
        }

        const value = Object.values(this.editForm.value)[0]


        const editInfo: EditProperyUser = {
            propertyname: this.filedProperyName,
            value: value
        }

        this.userService.userUpdateProfile(editInfo)
            .subscribe((result) => {
                this.authService.logout()
                    .subscribe(() => {
                        this.dialog.closeAll()
                        this.router.navigate(['/auth/login'])
                    })
            })
    }



    onImagePicker(event: any): void {
        const { file, reader } = uploadFilePiker(event)

        this.editForm.patchValue({
            imagePath: file
        })

        this.getFormControl('imagePath').updateValueAndValidity()

        reader.onload = () => {
            this.imagePreview = reader.result
        }

        reader.readAsDataURL(file)
    }


    getFormControl(controlName: string): FormControl {
        return this.editForm.get(controlName) as FormControl
    }

    getErrorMessage(control: FormControl): string {
        return errorMessage(control)
    }


    // addValidators(controlName: string) {
    //     switch (controlName) {
    //         case 'email':
    //             this.getFormControl('email').setValidators([
    //                 Validators.required,
    //                 Validators.email
    //             ])
    //             break;
    //         case 'imagePath':
    //             this.imagePreview = this.inputValue
    //             this.getFormControl('imagePath').setAsyncValidators(
    //                 mimeType
    //             )
    //             break
    //         default:
    //             break;
    //     }
    // }




}
