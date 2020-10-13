import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { DeliveryPackage, IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { DeliveryPackageService } from './delivery-package.service';
import { Address, IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address';
import { IShipper } from 'app/shared/model/shipper.model';
import { ShipperService } from 'app/entities/shipper';
import { IRunSheet } from 'app/shared/model/run-sheet.model';
import { RunSheetService } from 'app/entities/run-sheet';
import { AccountService } from 'app/core';

@Component({
    selector: 'jhi-delivery-package-update',
    templateUrl: './delivery-package-update.component.html'
})
export class DeliveryPackageAddDialogComponent implements OnInit, OnDestroy {
    deliveryPackage: IDeliveryPackage;
    isSaving: boolean;
    shippers: IShipper[];
    creationDate: string;

    subscription: Subscription;
    isAdminConnected: any;
    constructor(
        protected jhiAlertService: JhiAlertService,
        protected deliveryPackageService: DeliveryPackageService,
        protected addressService: AddressService,
        protected shipperService: ShipperService,
        protected runSheetService: RunSheetService,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.deliveryPackage = new DeliveryPackage();
        this.deliveryPackage.address = new Address();
        this.subscription = this.accountService.getEmittedValue().subscribe(res => {
            this.isAdminConnected = res;
        });
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ deliveryPackage }) => {
            if (!deliveryPackage) {
                deliveryPackage = new DeliveryPackage();
            }

            if (!deliveryPackage.address) {
                deliveryPackage.address = new Address();
            }

            this.deliveryPackage = deliveryPackage;
            this.creationDate =
                this.deliveryPackage.creationDate != null ? this.deliveryPackage.creationDate.format(DATE_TIME_FORMAT) : null;
        });

        this.shipperService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IShipper[]>) => mayBeOk.ok),
                map((response: HttpResponse<IShipper[]>) => response.body)
            )
            .subscribe((res: IShipper[]) => (this.shippers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.deliveryPackage.creationDate = this.creationDate != null ? moment(this.creationDate, DATE_TIME_FORMAT) : null;
        if (this.deliveryPackage.id !== undefined) {
            this.subscribeToSaveResponse(this.deliveryPackageService.update(this.deliveryPackage));
        } else {
            this.subscribeToSaveResponse(this.deliveryPackageService.create(this.deliveryPackage));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryPackage>>) {
        result.subscribe((res: HttpResponse<IDeliveryPackage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
        this.deliveryPackageService.changeSubject.next(true);
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAddressById(index: number, item: IAddress) {
        return item.id;
    }

    trackShipperById(index: number, item: IShipper) {
        return item.id;
    }

    trackRunSheetById(index: number, item: IRunSheet) {
        return item.id;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    handleChange(shipper: IShipper) {
        console.log(shipper);
        this.deliveryPackage.shipper = shipper;
        this.deliveryPackage.shipperId = shipper.id;
    }
}
