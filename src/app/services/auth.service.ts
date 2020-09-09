import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAuthData } from '../models/UserAuthData';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { UserInfo, User } from '../models/UserProfile';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token: string
    private refreshToken: string
    private isAuth: boolean = false
    private isAuthChange = new Subject<boolean>()
    private tokenTimer: NodeJS.Timer
    private userId: string
    private userInfo: UserInfo


    constructor(private http: HttpClient, private router: Router) { }


    public getIsAuthChange(): Observable<boolean> {
        return this.isAuthChange.asObservable()
    }

    public getUserInfo(): UserInfo {
        return this.userInfo
    }


    public getIsAuth(): boolean {
        return this.isAuth
    }


    public getToken(): string {
        return this.token
    }


    public getRefreshToken(): string {
        return this.refreshToken
    }


    public getUserId(): string {
        return this.userId
    }


    public logIn(email: string, password: string): Observable<string> {
        const userData: UserAuthData = { email: email, password: password }

        return this.http.post<{
            message: string,
            token: string,
            refresh_token_expiresIn: number,
            userId: string,
            userInfo: UserInfo
        }>('http://localhost:4455/api/users/login/auth', userData)
            .pipe(
                map((result) => {
                    const token = result.token
                    this.token = token

                    if (token) {
                        this.setLoginInfo(result)
                        return result.message
                    }
                })
            )
    }


    public getNewAccessToken(): Observable<any> {
        return this.http.post<{
            message: string,
            token: string
        }>('http://localhost:4455/api/users/refresh_token', {
            refreshToken: this.getRefreshToken(),
            userId: this.getUserId()
        })
            .pipe(
                tap((result) => {
                    const token = result.token
                    this.token = token
                    if (token) {
                        localStorage.setItem('token', token)
                    }
                })
            )
    }




    public logout(): Observable<{ message: string }> {
        return this.http.post<{
            message: string
        }>('http://localhost:4455/api/users/logout', {
            userId: this.getUserId()
        })
            .pipe(
                tap((result) => {
                    this.clearLoginInfo()
                })
            )
    }


    // private updateAuthInfo(
    //     token: string,
    //     refreshToken: string,
    //     isAuth: boolean,
    //     userId: string,
    //     userInfo: UserInfo) {
    //     this.token = token
    //     this.refreshToken = refreshToken
    //     this.isAuth = isAuth
    //     this.userId = userId
    //     this.userInfo = userInfo
    // }


    private clearLoginInfo(): void {
        this.token = null
        this.refreshToken = null
        this.isAuth = false
        this.userId = null
        this.userInfo = null
        this.isAuthChange.next(this.isAuth)
        this.router.navigate(['/'])
        clearTimeout(this.tokenTimer)
        this.removeAuthDataLocalStorage()
    }


    private setLoginInfo(info: any) {
        const expiresIn = info.refresh_token_expiresIn

        console.log(info.refresh_token_expiresIn, 'EXPIRE TIME FROM SERVER')

        this.setAuthTimer(expiresIn)

        this.refreshToken = info.refreshToken
        this.isAuth = true
        this.userId = info.userId
        this.userInfo = info.userInfo
        this.isAuthChange.next(this.isAuth)

        const now = new Date()
        const expiresInDate = new Date(now.getTime() + expiresIn * 1000)

        this.saveAuthDataLocalStorage(
            this.token,
            this.refreshToken,
            expiresInDate,
            this.userId,
            this.userInfo,
        )
    }


    public getAuthData(): void {
        const auth = this.getAuthDataLocalStorage()
        if (!auth) {
            return
        }

        const now = new Date()
        const isValidTime = auth.expiresInDate.getTime() - now.getTime()

        if (isValidTime > 0) {
            this.token = auth.token
            this.refreshToken = auth.refreshToken
            this.userId = auth.userId
            this.isAuth = true
            this.userInfo = auth.userInfo
            this.setAuthTimer(isValidTime / 1000)
            this.isAuthChange.next(this.isAuth)
        }
    }


    private saveAuthDataLocalStorage(
        token: string,
        refreshToken: string,
        expiresIn: Date,
        userId: string,
        userInfo: UserInfo,
    ): void {
        localStorage.setItem('token', token)
        localStorage.setItem('refresh-token', refreshToken)
        localStorage.setItem('expiresIn', expiresIn.toISOString())
        localStorage.setItem('userId', userId)
        localStorage.setItem('user-info', JSON.stringify(userInfo))
    }


    private removeAuthDataLocalStorage(): void {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh-token')
        localStorage.removeItem('expiresIn')
        localStorage.removeItem('userId')
        localStorage.removeItem('user-info')
    }


    private getAuthDataLocalStorage() {
        const token = localStorage.getItem('token')
        const refreshToken = localStorage.getItem('refresh-token')
        const expiresInDate = localStorage.getItem('expiresIn')
        const userId = localStorage.getItem('userId')
        const userInfo = JSON.parse(localStorage.getItem('user-info'))

        if (!token || !expiresInDate) {
            return
        }

        return {
            token: token,
            expiresInDate: new Date(expiresInDate),
            userId: userId,
            userInfo: userInfo,
            refreshToken: refreshToken
        }
    }


    private setAuthTimer(time: number): void {
        this.tokenTimer = setTimeout(() => {
            this.logout()
                .subscribe()
        }, time * 1000)
    }





}
