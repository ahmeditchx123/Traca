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
import { IShipper } from 'app/shared/model/shipper.model';
import { ShipperService } from 'app/entities/shipper';
import { Actions, IRunSheet } from 'app/shared/model/run-sheet.model';
import { AccountService } from 'app/core';
import { NO_ZEROS_AT_THE_BEGINING } from 'app/app.constants';
import { DeliveryPackageObservable } from 'app/shared/sharedData.service';
import { SharedDataService } from 'app/shared/sharedData.service';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-delivery-package-update',
    templateUrl: './delivery-package-update.component.html'
})
export class DeliveryPackageUpdateComponent implements OnInit, OnDestroy {
    deliveryPackage: IDeliveryPackage;
    isSaving: boolean;
    shippers: IShipper[];
    creationDate: string;

    subscription: Subscription;
    shipperId: number;
    errorInput: boolean;
    pattern: string;
    public isAdminConnected: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected deliveryPackageService: DeliveryPackageService,
        protected shipperService: ShipperService,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService,
        private sharedService: SharedDataService,
        protected eventManger: JhiEventManager
    ) {
        this.errorInput = false;
        this.pattern = NO_ZEROS_AT_THE_BEGINING;
        this.deliveryPackage = new DeliveryPackage();
        this.deliveryPackage.address = new Address();
        this.accountService.identity().then(res => {
            this.shipperId = res.id;
            res.authorities.map(authority => {
                if (authority === 'ROLE_ADMIN') {
                    this.isAdminConnected = true;
                } else {
                    this.isAdminConnected = false;
                }
            });
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

            if (!deliveryPackage.code) {
                const suf = Math.floor(Math.random() * 9) + 1;
                deliveryPackage.code = new Date().getTime() + suf;
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

    handleChange(shipper: IShipper) {
        console.log(shipper);
        this.deliveryPackage.shipper = shipper;
        this.deliveryPackage.shipperId = shipper.id;
    }

    save() {
        this.isSaving = true;
        this.deliveryPackage.receiverPhone = Number(this.deliveryPackage.receiverPhone);
        this.deliveryPackage.creationDate = this.creationDate != null ? moment(this.creationDate, DATE_TIME_FORMAT) : null;
        if (this.deliveryPackage.id !== undefined) {
            this.subscribeToSaveResponse(this.deliveryPackageService.update(this.deliveryPackage), Actions.UPDATE, this.deliveryPackage);
        } else {
            this.accountService.hasAuthority('ROLE_ADMIN').then(res => {
                if (res === true) {
                    this.subscribeToSaveResponse(
                        this.deliveryPackageService.create(this.deliveryPackage),
                        Actions.ADD,
                        this.deliveryPackage
                    );
                } else {
                    this.accountService.fetch().subscribe(value => {
                        console.log(value);
                        if (value) {
                            this.deliveryPackage.shipperId = value.body.id;
                            this.deliveryPackage.shipper = {};
                            this.deliveryPackage.shipper.id = value.body.id;
                            this.deliveryPackage.shipper.firstName = value.body.firstName;
                            this.deliveryPackage.shipper.lastName = value.body.lastName;
                            this.subscribeToSaveResponse(
                                this.deliveryPackageService.create(this.deliveryPackage),
                                Actions.ADD,
                                this.deliveryPackage
                            );
                        }
                    });
                }
            });
        }
    }

    protected subscribeToSaveResponse(
        result: Observable<HttpResponse<IDeliveryPackage>>,
        action: string,
        deliveryPackage: IDeliveryPackage
    ) {
        result.subscribe(
            (res: HttpResponse<IDeliveryPackage>) => this.onSaveSuccess(action, deliveryPackage),
            (res: HttpErrorResponse) => this.onSaveError(action, deliveryPackage)
        );
    }

    protected onSaveSuccess(action: string, deliveryPackageParam: IDeliveryPackage) {
        this.isSaving = false;
        this.previousState();
        this.deliveryPackageService.changeSubject.next(true);
        if (action === Actions.UPDATE) {
            this.eventManger.broadcast({
                name: 'Delivery_package',
                actionType: Actions.UPDATE,
                value: true,
                deliveryPackage: deliveryPackageParam
            });
            const DeliveryPackageevent: DeliveryPackageObservable = {
                actionType: Actions.UPDATE,
                value: true,
                deliveryPackage: deliveryPackageParam
            };
            this.sharedService.deliveryPackageEvent(DeliveryPackageevent);
        }
        if (action === Actions.ADD) {
            const DeliveryPackageevent: DeliveryPackageObservable = {
                actionType: Actions.ADD,
                value: true,
                deliveryPackage: deliveryPackageParam
            };
            this.eventManger.broadcast({
                name: 'Delivery_package',
                actionType: Actions.ADD,
                value: true,
                deliveryPackage: deliveryPackageParam
            });
            this.sharedService.deliveryPackageEvent(DeliveryPackageevent);
        }
    }

    protected onSaveError(action: string, deliveryPackageParam: IDeliveryPackage) {
        this.isSaving = false;
        if (action === Actions.UPDATE) {
            const DeliveryPackageevent: DeliveryPackageObservable = {
                actionType: Actions.FAIL_UPDATE,
                value: false,
                deliveryPackage: deliveryPackageParam
            };
            this.sharedService.deliveryPackageEvent(DeliveryPackageevent);
        }
        if (action === Actions.ADD) {
            const DeliveryPackageevent: DeliveryPackageObservable = {
                actionType: Actions.FAIL_ADD,
                value: false,
                deliveryPackage: deliveryPackageParam
            };
            this.sharedService.deliveryPackageEvent(DeliveryPackageevent);
        }
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

    ngOnDestroy(): void {}
}
