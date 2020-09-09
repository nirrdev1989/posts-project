import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpEventsService } from 'src/app/services/http-events.service';
import { concatMap, finalize, tap, delay } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
    public isLoading: boolean
    private sunLoading: Subscription

    constructor(
        private httpEventsService: HttpEventsService,
        private cdr: ChangeDetectorRef
    ) {
        this.isLoading = false
    }

    ngOnInit(): void {
        this.sunLoading = this.httpEventsService.getStatusChange()
            .subscribe((result) => {
                this.isLoading = result
                this.cdr.detectChanges()
            })


    }


    ngOnDestroy() {
        this.sunLoading.unsubscribe()
    }

}
