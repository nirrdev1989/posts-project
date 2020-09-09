import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpEventsService } from './services/http-events.service';
import { User, UserInfo } from './models/UserProfile';
import { Router, Event, NavigationStart, NavigationEnd } from "@angular/router";
import { delay, tap } from 'rxjs/operators';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public userEmail: string
    public currentDateTime: string

    constructor(
        private authService: AuthService,
        private httpEventsService: HttpEventsService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.authService.getAuthData()
        this.getCurrentDateTime()


        this.router.events.pipe(
            tap((event: Event) => {
                if (event instanceof NavigationStart) {
                    this.httpEventsService.setStatus(true)
                }
            }),
            delay(0),
            tap((event: Event) => {
                if (event instanceof NavigationEnd) {
                    this.httpEventsService.setStatus(false)
                }
            })
        ).subscribe()
    }

    getUserInfo(userInfo: UserInfo): void {
        if (userInfo) this.userEmail = userInfo?.email
        else this.userEmail = ''
    }


    getCurrentDateTime() {
        setInterval(() => {
            this.currentDateTime = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
        }, 1000)
    }


}
