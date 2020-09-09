import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorMessageComponent } from "../../components/share/error-message/error-message.component";
import { HttpEventsService } from '../http-events.service';



@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog, private httpEventsService: HttpEventsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request)
            .pipe(
                tap(() => {

                }),
                catchError((error: HttpErrorResponse) => {
                    console.log(error.status, error.statusText, 'ERROR MESSAGE INTERCEPTOR')
                    if (error instanceof HttpErrorResponse && error.status === 401 && error.statusText === 'Unauthorized') {
                        return throwError(error)
                    }

                    let errorMessage = 'An unknow error'
                    if (error.error.message) {
                        errorMessage = error.error.message
                    }

                    const dialogConfig = new MatDialogConfig()
                    dialogConfig.disableClose = true

                    dialogConfig.data = {
                        message: errorMessage,
                        url: 'http://localhost:4455' + error.error.url,
                        status: error.error.status
                    }

                    this.dialog.open(ErrorMessageComponent, dialogConfig)

                    return throwError(error)
                })
            )
    }


}