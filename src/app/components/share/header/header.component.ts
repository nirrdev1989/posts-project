import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { User, UserInfo } from 'src/app/models/UserProfile';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    private authSub: Subscription
    public isAuth: boolean = false
    @Output() userInfo: EventEmitter<UserInfo> = new EventEmitter<UserInfo>()


    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.isAuth = this.authService.getIsAuth()
        this.getUserInfo()
        this.authSub = this.authService.getIsAuthChange()
            .subscribe((result) => {
                this.isAuth = result
                this.getUserInfo()
            })
    }


    onLogOut(): void {
        this.authService.logout()
            .subscribe()
    }


    getUserInfo(): void {
        this.userInfo.emit(this.authService.getUserInfo())
    }


    ngOnDestroy(): void {
        this.authSub.unsubscribe()
    }


}
