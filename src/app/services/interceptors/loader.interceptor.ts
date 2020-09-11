import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpEventsService } from '../http-events.service';




@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private httpEventsService: HttpEventsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        this.httpEventsService.setStatus(true)
        return next.handle(request)
            .pipe(
                tap((result) => {
                    // console.log(result)
                    if (result instanceof HttpResponse) {
                        this.httpEventsService.setStatus(false)
                    }
                })
            )
    }


}