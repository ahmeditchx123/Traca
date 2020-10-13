import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShipper } from 'app/shared/model/shipper.model';
import { ShipperService } from './shipper.service';
import { SharedDataService } from 'app/shared/sharedData.service';
import { ShipperObservable } from 'app/shared/sharedData.service';
import { HttpResponse } from '@angular/common/http';
import { Actions } from 'app/shared/model/run-sheet.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'jhi-shipper-delete-dialog',
    templateUrl: './shipper-delete-dialog.component.html'
})
export class ShipperDeleteDialogComponent {
    shipper: IShipper;

    constructor(
        protected shipperService: ShipperService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager,
        private sharedService: SharedDataService,
        private toaster: ToastrService
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shipperService.find(id).subscribe((shipper: HttpResponse<IShipper>) => {
            this.shipperService.delete(shipper.body.id).subscribe(response => {
                if (response.status === 202) {
                    this.activeModal.dismiss(true);
                    this.toaster.error('Suppression impossible, des colis sont déjà affectés à ce client', 'Erreur');
                    return;
                }
                this.eventManager.broadcast({
                    name: 'shipperListModification',
                    content: 'Deleted a shipper',
                    firstName: shipper.body.firstName,
                    lastName: shipper.body.lastName
                });
                this.activeModal.dismiss(true);
            });
        });
    }
}

@Component({
    selector: 'jhi-shipper-delete-popup',
    template: ''
})
export class ShipperDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shipper }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ShipperDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.shipper = shipper;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/shipper', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/shipper', { outlets: { popup: null } }]);
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
