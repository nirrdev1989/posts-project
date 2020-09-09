import { NgModule } from '@angular/core';
import { FirstCharToUpperCase } from "./firstcharupper.pipe";



@NgModule({
    declarations: [
        FirstCharToUpperCase
    ],
    exports: [
        FirstCharToUpperCase
    ]
})

export class PipesModule { }