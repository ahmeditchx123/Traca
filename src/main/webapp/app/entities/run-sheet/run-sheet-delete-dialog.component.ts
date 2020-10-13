import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Actions, IRunSheet } from 'app/shared/model/run-sheet.model';
import { RunSheetService } from './run-sheet.service';
import { RunsheetObservable, SharedDataService } from 'app/shared/sharedData.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-run-sheet-delete-dialog',
    templateUrl: './run-sheet-delete-dialog.component.html'
})
export class RunSheetDeleteDialogComponent {
    runSheet: IRunSheet;

    constructor(
        protected runSheetService: RunSheetService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager,
        private sharedService: SharedDataService
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.runSheetService.find(id).subscribe((runsheetResponse: HttpResponse<IRunSheet>) => {
            this.runSheetService.delete(runsheetResponse.body.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'runSheetListModification',
                    content: 'Deleted an deliveryPackage',
                    code: runsheetResponse.body.code
                });
                this.activeModal.dismiss(true);
            });
        });
    }
}

@Component({
    selector: 'jhi-run-sheet-delete-popup',
    template: ''
})
export class RunSheetDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ runSheet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RunSheetDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.runSheet = runSheet;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/run-sheet', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/run-sheet', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
