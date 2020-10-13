import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IShipper, Shipper } from 'app/shared/model/shipper.model';
import { ShipperService } from './shipper.service';
import { Address, IAddress } from 'app/shared/model/address.model';
import { NO_ZEROS_AT_THE_BEGINING } from 'app/app.constants';
import { Router } from '@angular/router';
import { SharedDataService } from 'app/shared/sharedData.service';
import { ShipperObservable } from 'app/shared/sharedData.service';
import { Actions } from 'app/shared/model/run-sheet.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'jhi-shipper-update',
    templateUrl: './shipper-update.component.html'
})
export class ShipperUpdateComponent implements OnInit {
    shipper: IShipper;
    isSaving: boolean;

    pattern: string;
    constructor(
        protected jhiAlertService: JhiAlertService,
        protected shipperService: ShipperService,
        protected activatedRoute: ActivatedRoute,
        private router: Router,
        private sharedService: SharedDataService,
        private toaster: ToastrService
    ) {
        this.shipper = new Shipper();
        this.shipper.address = new Address();
    }

    ngOnInit() {
        this.pattern = NO_ZEROS_AT_THE_BEGINING;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ shipper }) => {
            if (!shipper) {
                this.shipper = new Shipper();
                this.shipper.address = new Address();
            } else {
                if (!shipper.address) {
                    shipper.address = new Address();
                }
                this.shipper = shipper;
            }
        });
    }

    previousState() {
        this.router.navigate(['/shipper']);
    }

    save(form) {
        this.shipper.firstPhone = Number(this.shipper.firstPhone);
        this.shipper.secondPhone = Number(this.shipper.secondPhone);
        this.isSaving = true;
        if (this.shipper.id !== undefined) {
            this.subscribeToSaveResponse(this.shipperService.update(this.shipper), Actions.UPDATE, this.shipper, form);
        } else {
            this.subscribeToSaveResponse(this.shipperService.create(this.shipper), Actions.ADD, this.shipper, form);
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IShipper>>, action: string, shipper: IShipper, form: NgForm) {
        result.subscribe(
            (res: HttpResponse<IShipper>) => this.onSaveSuccess(res, action, shipper, form),
            (res: HttpErrorResponse) => this.onSaveError(action, shipper)
        );
    }

    protected onSaveSuccess(res: HttpResponse<IShipper>, action: string, shipperParam: IShipper, form: NgForm) {
        if (res.status === 202) {
            this.toaster.error('Un client existe déjà avec ce login ou email', 'Erreur');
            form.reset();
            return;
        }
        this.isSaving = false;
        this.previousState();
        this.shipperService.changeSubject.next(true);
        if (action === Actions.UPDATE) {
            const shipperUpdateEvent: ShipperObservable = { actionType: Actions.UPDATE, value: true, shipper: shipperParam };
            this.sharedService.shipperEvent(shipperUpdateEvent);
        }
        if (action === Actions.ADD) {
            const shipperAddEvent: ShipperObservable = { actionType: Actions.ADD, value: true, shipper: shipperParam };
            this.sharedService.shipperEvent(shipperAddEvent);
        }
    }

    protected onSaveError(action: string, shipperParam: IShipper) {
        this.isSaving = false;
        if (action === Actions.ADD) {
            const shipperAddEvent: ShipperObservable = { actionType: Actions.FAIL_ADD, value: false, shipper: shipperParam };
            this.sharedService.shipperEvent(shipperAddEvent);
        }
        if (action === Actions.UPDATE) {
            const shipperAddEvent: ShipperObservable = { actionType: Actions.FAIL_UPDATE, value: false, shipper: shipperParam };
            this.sharedService.shipperEvent(shipperAddEvent);
        }
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAddressById(index: number, item: IAddress) {
        return item.id;
    }
}
