import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../../angular.material.module";
import { AuthRoutingModule } from './auth.routing.module';


import { AuthFormComponent } from "./auth-form/auth-form.component";




@NgModule({
    declarations: [
        AuthFormComponent,
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        AuthRoutingModule,
    ]
})

export class AuthModule { }