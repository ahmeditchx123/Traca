import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { DeliveryPackageService } from 'app/entities/delivery-package/delivery-package.service';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgPdfViewerComponent } from 'app/pdf-viewer/ng-pdf-viewer.component';
import { AccountService } from 'app/core';

@Component({
    selector: 'jhi-delivery-package-detail',
    templateUrl: './delivery-package-detail.component.html'
})
export class DeliveryPackageDetailComponent implements OnInit {
    deliveryPackage: IDeliveryPackage;
    faFilePdf = faFilePdf;
    view = false;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected deliveryPackageService: DeliveryPackageService,
        private ngbModal: NgbModal,
        protected accountService: AccountService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deliveryPackage }) => {
            this.deliveryPackage = deliveryPackage;
        });
        this.accountService.hasAuthority('ROLE_ADMIN').then(res => {
            this.view = res;
        });
    }

    getPDF(deliveryPackage: IDeliveryPackage) {
        const modal = this.ngbModal.open(NgPdfViewerComponent, {
            size: 'lg',
            backdrop: 'static'
        });
        modal.componentInstance.deliveryPackage = deliveryPackage;
    }

    previousState() {
        window.history.back();
    }
}
