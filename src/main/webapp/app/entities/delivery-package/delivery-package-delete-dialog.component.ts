import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { DeliveryPackageService } from './delivery-package.service';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Actions } from 'app/shared/model/run-sheet.model';

@Component({
    selector: 'jhi-delivery-package-delete-dialog',
    templateUrl: './delivery-package-delete-dialog.component.html'
})
export class DeliveryPackageDeleteDialogComponent {
    deliveryPackage: IDeliveryPackage;

    constructor(
        protected deliveryPackageService: DeliveryPackageService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deliveryPackageService.find(id).subscribe((deliveryPackage: HttpResponse<IDeliveryPackage>) => {
            this.deliveryPackageService.delete(deliveryPackage.body.id).subscribe(response => {
                this.eventManager.broadcast({
                    name: 'deliveryPackageListModification',
                    content: 'Deleted an deliveryPackage',
                    firstName: deliveryPackage.body.shipper.firstName,
                    lastName: deliveryPackage.body.shipper.lastName
                });
                this.eventManager.broadcast({
                    name: 'Delivery_package',
                    actionType: Actions.DELETE,
                    value: true,
                    deliveryPackage: deliveryPackage.body
                });
            });
        });
        this.clear();
    }
}

@Component({
    selector: 'jhi-delivery-package-delete-popup',
    template: ''
})
export class DeliveryPackageDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;
    protected subscription: Subscription;
    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.subscription = this.activatedRoute.data.subscribe(({ deliveryPackage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeliveryPackageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.deliveryPackage = deliveryPackage;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/delivery-package', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/delivery-package', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
        this.subscription.unsubscribe();
    }
}
