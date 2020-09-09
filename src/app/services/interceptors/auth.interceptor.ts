import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { switchMap, filter, tap, catchError } from 'rxjs/operators';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private isRefreshToken: boolean = false
    private accessTokenChange: BehaviorSubject<any> = new BehaviorSubject<any>(null)

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken()

        const authRequest = this.cloneToken(request, authToken)

        return next.handle(authRequest)
            .pipe(
                tap(() => {
                    console.log('TOKEN IS VALID')
                }),
                catchError((error) => {
                    console.log(error.status, error.message)
                    if (error instanceof HttpErrorResponse && error.status === 401) {
                        console.log('EXPIRE TOKEN TIME')
                        return this.handleIf401Error(request, next)
                    }
                    return throwError(error)
                })
            )
    }



    private cloneToken(request: HttpRequest<unknown>, token: string) {
        return request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + token)
        })
    }

    private handleIf401Error(request: HttpRequest<unknown>, next: HttpHandler) {
        if (!this.isRefreshToken) {
            this.isRefreshToken = true
            this.accessTokenChange.next(null)

            return this.authService.getNewAccessToken()
                .pipe(
                    switchMap((result) => {
                        console.log('REFRESH TOKEN PROCCESS START')
                        this.isRefreshToken = false
                        this.accessTokenChange.next(result.token)

                        request = this.cloneToken(request, result.token)
                        return next.handle(request)
                    })
                )
        } else {
            return this.accessTokenChange
                .pipe(
                    filter((token) => token != null),
                    switchMap((token) => {
                        request = this.cloneToken(request, token)
                        return next.handle(request)
                    })
                )
        }
    }


}