import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { DeliveryPackageDeleteDialogComponent, DeliveryPackageService } from 'app/entities/delivery-package';

@Component({
    selector: 'jhi-delete-dialog',
    templateUrl: './delete-package-client.component.html',
    styleUrls: []
})
export class DeletePackageClientComponent implements OnInit {
    id: any;
    constructor(
        protected deliveryPackageService: DeliveryPackageService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager,
        protected router: Router
    ) {}
    ngOnInit(): void {}

    clear() {
        this.activeModal.dismiss('cancel');
        this.router.navigate(['/client', { outlets: { popup: null } }]);
    }

    confirmDelete(id: number) {
        this.deliveryPackageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deliveryPackageListModification',
                content: 'Deleted an deliveryPackage'
            });
            this.activeModal.dismiss(true);
            this.deliveryPackageService.changeSubject.next(true);
        });
    }
}

@Component({
    selector: 'jhi-delivery-package-delete-popup',
    template: ''
})
export class DeliveryPackageDeletePopupClientComponent implements OnInit, OnDestroy {
    ngbModalRef: NgbModalRef;
    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnDestroy(): void {
        this.ngbModalRef = null;
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(res => {
            console.log('id');
            console.log(res.id);
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeletePackageClientComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.id = res.id;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }
}
