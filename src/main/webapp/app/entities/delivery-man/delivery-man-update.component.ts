import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IDeliveryMan } from 'app/shared/model/delivery-man.model';
import { DeliveryManService } from './delivery-man.service';
import { SharedDataService } from 'app/shared/sharedData.service';
import { LivreurObservable } from 'app/shared/sharedData.service';
import { Actions } from 'app/shared/model/run-sheet.model';

@Component({
    selector: 'jhi-delivery-man-update',
    templateUrl: './delivery-man-update.component.html'
})
export class DeliveryManUpdateComponent implements OnInit {
    deliveryMan: IDeliveryMan;
    isSaving: boolean;
    hireDate: string;
    pattern: string;
    constructor(
        protected deliveryManService: DeliveryManService,
        protected activatedRoute: ActivatedRoute,
        private sharedService: SharedDataService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ deliveryMan }) => {
            this.deliveryMan = deliveryMan;
            this.hireDate = this.deliveryMan.hireDate != null ? this.deliveryMan.hireDate.format(DATE_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.deliveryMan.firstPhone = Number(this.deliveryMan.firstPhone);
        this.deliveryMan.secondPhone = Number(this.deliveryMan.secondPhone);
        this.deliveryMan.hireDate = this.hireDate != null ? moment(this.hireDate, DATE_TIME_FORMAT) : moment(new Date(), DATE_TIME_FORMAT);
        if (this.deliveryMan.id !== undefined) {
            this.subscribeToSaveResponse(this.deliveryManService.update(this.deliveryMan), Actions.UPDATE, this.deliveryMan);
        } else {
            this.subscribeToSaveResponse(this.deliveryManService.create(this.deliveryMan), Actions.ADD, this.deliveryMan);
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryMan>>, action: string, deliveryMan: IDeliveryMan) {
        result.subscribe(
            (res: HttpResponse<IDeliveryMan>) => this.onSaveSuccess(action, deliveryMan),
            (res: HttpErrorResponse) => this.onSaveError(action, deliveryMan)
        );
    }

    protected onSaveSuccess(action: string, deliveryMan: IDeliveryMan) {
        this.isSaving = false;
        this.previousState();
        this.deliveryManService.changeSubject.next(true);
        if (action === Actions.ADD) {
            const deliveryManAddEvent: LivreurObservable = { actionType: Actions.ADD, value: true, livreur: deliveryMan };
            this.sharedService.livreurEvent(deliveryManAddEvent);
        }
        if (action === Actions.UPDATE) {
            const deliveryManUpdateEvent: LivreurObservable = { actionType: Actions.UPDATE, value: true, livreur: deliveryMan };
            this.sharedService.livreurEvent(deliveryManUpdateEvent);
        }
    }

    protected onSaveError(action: string, deliveryMan: IDeliveryMan) {
        this.isSaving = false;
        if (action === Actions.UPDATE) {
            const deliveryManFailedEvent: LivreurObservable = { actionType: Actions.FAIL_UPDATE, value: false, livreur: deliveryMan };
            this.sharedService.livreurEvent(deliveryManFailedEvent);
        }
        if (action === Actions.ADD) {
            const deliveryManFailedEvent: LivreurObservable = { actionType: Actions.FAIL_ADD, value: false, livreur: deliveryMan };
            this.sharedService.livreurEvent(deliveryManFailedEvent);
        }
    }
}
