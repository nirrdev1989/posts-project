import { NgModule } from "@angular/core";
import { UserProfileFormComponent } from "./user-profile-form/user-profile-form.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from "../../angular.material.module";
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from "./user.routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { UserMainComponent } from './user-main/user-main.component';
import { EditProfileFieldComponent } from "./edit-profile-field/edit-profile-field.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

import { PipesModule } from "../../services/pipes/pipes.module";




@NgModule({
    declarations: [
        UserProfileFormComponent,
        ProfileComponent,
        UserMainComponent,
        EditProfileFieldComponent,
        EditProfileComponent,
        // FirstCharToUpperCase
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        UserRoutingModule,
        FormsModule,
        PipesModule
    ]
})

export class UserModule { }