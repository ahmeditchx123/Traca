import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { Actions, IRunSheet, RunSheet, RunSheetStatut } from 'app/shared/model/run-sheet.model';
import { RunSheetService } from './run-sheet.service';
import { IDeliveryMan } from 'app/shared/model/delivery-man.model';
import { DeliveryManService } from 'app/entities/delivery-man';
import { DeliveryPackageService } from 'app/entities/delivery-package';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { RunsheetObservable, SharedDataService } from 'app/shared/sharedData.service';

@Component({
    selector: 'jhi-run-sheet-update',
    templateUrl: './run-sheet-update.component.html'
})
export class RunSheetUpdateComponent implements OnInit {
    runSheet: IRunSheet;
    isSaving: boolean;
    colis: string;
    deliverymen: IDeliveryMan[];
    creationDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected runSheetService: RunSheetService,
        protected deliveryManService: DeliveryManService,
        protected deliveryPackageService: DeliveryPackageService,
        protected activatedRoute: ActivatedRoute,
        private sharedService: SharedDataService
    ) {}

    removePackage(deliveryPackage: IDeliveryPackage) {
        const index = this.runSheet.deliveryPackages.indexOf(deliveryPackage, 0);
        if (index > -1) {
            this.runSheet.deliveryPackages.splice(index, 1);
        }
    }

    addPackage(colis: string) {
        if (this.colis.length > 4) {
            this.deliveryPackageService.findByCode(colis).subscribe(x => {
                let exist = false;
                for (const item of this.runSheet.deliveryPackages) {
                    if (item.id === x.body.id) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    this.colis = '';
                    this.runSheet.deliveryPackages.push(x.body);
                }
            });
        }
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ runSheet }) => {
            this.runSheet = runSheet;

            if (!runSheet) {
                runSheet = new RunSheet();
            }

            if (!runSheet.deliveryPackages) {
                runSheet.deliveryPackages = new Array();
            }

            if (!runSheet.code) {
                const suf = Math.floor(Math.random() * 9) + 1;
                runSheet.code = new Date().getTime() + suf;
            }

            this.creationDate = this.runSheet.creationDate != null ? this.runSheet.creationDate.format(DATE_TIME_FORMAT) : null;
        });
        this.deliveryManService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDeliveryMan[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDeliveryMan[]>) => response.body)
            )
            .subscribe((res: IDeliveryMan[]) => (this.deliverymen = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.runSheet.creationDate = this.creationDate != null ? moment(this.creationDate, DATE_TIME_FORMAT) : null;
        if (this.runSheet.id !== undefined) {
            this.subscribeToSaveResponse(this.runSheetService.update(this.runSheet), Actions.UPDATE, this.runSheet);
        } else {
            this.runSheet.status = RunSheetStatut.NEW;
            this.subscribeToSaveResponse(this.runSheetService.create(this.runSheet), Actions.ADD, this.runSheet);
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRunSheet>>, action: string, runsheet: IRunSheet) {
        result.subscribe(
            (res: HttpResponse<IRunSheet>) => this.onSaveSuccess(action, runsheet),
            (res: HttpErrorResponse) => this.onSaveError(action, runsheet)
        );
    }

    onSaveSuccess(action: string, runsheet: IRunSheet) {
        this.previousState();
        this.runSheetService.changeSubject.next(true);
        if (action === Actions.ADD) {
            const runsheetEvent: RunsheetObservable = { actionType: Actions.ADD, value: true, runSheet: runsheet };
            this.sharedService.runsheetEvent(runsheetEvent);
        }
        if (action === Actions.UPDATE) {
            const runsheetEvent: RunsheetObservable = { actionType: Actions.UPDATE, value: true, runSheet: runsheet };
            this.sharedService.runsheetEvent(runsheetEvent);
        }
    }

    protected onSaveError(action: string, runsheet: IRunSheet) {
        this.isSaving = false;
        if (action === Actions.ADD) {
            const runsheetEvent: RunsheetObservable = { actionType: Actions.FAIL_ADD, value: false, runSheet: runsheet };
            this.sharedService.runsheetEvent(runsheetEvent);
        }
        if (action === Actions.UPDATE) {
            const runsheetEvent: RunsheetObservable = { actionType: Actions.FAIL_UPDATE, value: false, runSheet: runsheet };
            this.sharedService.runsheetEvent(runsheetEvent);
        }
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDeliveryManById(index: number, item: IDeliveryMan) {
        return item.id;
    }
}
