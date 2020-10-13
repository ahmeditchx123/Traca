import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeliveryMan } from 'app/shared/model/delivery-man.model';
import { DeliveryManService } from './delivery-man.service';
import { SharedDataService } from 'app/shared/sharedData.service';
import { LivreurObservable } from 'app/shared/sharedData.service';
import { HttpResponse } from '@angular/common/http';
import { Actions } from 'app/shared/model/run-sheet.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'jhi-delivery-man-delete-dialog',
    templateUrl: './delivery-man-delete-dialog.component.html'
})
export class DeliveryManDeleteDialogComponent {
    deliveryMan: IDeliveryMan;

    constructor(
        protected deliveryManService: DeliveryManService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager,
        private sharedDataService: SharedDataService,
        private toaster: ToastrService
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deliveryManService.find(id).subscribe((deliverman: HttpResponse<IDeliveryMan>) => {
            this.deliveryManService.delete(deliverman.body.id).subscribe(response => {
                if (response.status === 202) {
                    this.activeModal.dismiss(true);
                    this.toaster.error('Suppression Impossible, Des Runsheets sont déjà affectés à ce livreur', 'Erreur');
                    return;
                }
                this.eventManager.broadcast({
                    name: 'deliveryManListModification',
                    content: 'Deleted an deliveryMan',
                    firstName: deliverman.body.firstName,
                    lastName: deliverman.body.lastName
                });
                this.activeModal.dismiss(true);
            });
        });
    }
}

@Component({
    selector: 'jhi-delivery-man-delete-popup',
    template: ''
})
export class DeliveryManDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deliveryMan }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeliveryManDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.deliveryMan = deliveryMan;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/delivery-man', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/delivery-man', { outlets: { popup: null } }]);
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
