import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class HttpEventsService {

    private event: HttpEvent<unknown>
    private statusChange: BehaviorSubject<boolean>
    private status: boolean

    constructor() {
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
