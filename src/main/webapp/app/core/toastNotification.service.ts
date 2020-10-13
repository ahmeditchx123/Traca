import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToastNotificationService {
    runsheetAddEvent = new Subject<boolean>();
    addedRunsheet = this.runsheetAddEvent.asObservable();

    runsheetUpdatedEvent = new Subject<boolean>();
    updatedRunsheet = this.runsheetUpdatedEvent.asObservable();

    runsheetDeletedEvent = new Subject<boolean>();
    deletedRunsheet = this.runsheetDeletedEvent.asObservable();
}
