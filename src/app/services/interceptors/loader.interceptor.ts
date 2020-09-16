import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpEventsService } from '../http-events.service';




@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private httpEventsService: HttpEventsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request)
            .pipe(
                tap((result) => {
                    // console.log(result)
                    if (result instanceof HttpResponse || result instanceof HttpErrorResponse) {
                        this.httpEventsService.setStatus(false)
                    }
                }),
                catchError((error) => {
                    this.httpEventsService.setStatus(false)
                    return throwError(error)
                })
            )
    }


}