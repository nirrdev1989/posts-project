import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { message: string, url: string, status: number | string }
    ) { }
}
