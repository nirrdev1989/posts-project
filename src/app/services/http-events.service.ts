import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Post } from '../models/Post';
import { Subject, Observable, Observer, BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class HttpEventsService {

    private event: HttpEvent<unknown>
    private statusChange: BehaviorSubject<boolean>
    private status: boolean

    constructor(
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) {
        this.status = false
        this.statusChange = new BehaviorSubject<boolean>(this.status)
    }

    public getStatusChange(): Observable<boolean> {
        return this.statusChange.asObservable()
    }

    public setStatus(status: boolean): void {
        this.status = status
        this.statusChange.next(this.status)
    }



}
