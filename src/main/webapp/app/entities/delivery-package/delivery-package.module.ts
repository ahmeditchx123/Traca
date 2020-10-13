import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TracaSharedModule } from 'app/shared';
import {
    DeliveryPackageComponent,
    DeliveryPackageDetailComponent,
    DeliveryPackageUpdateComponent,
    DeliveryPackageDeletePopupComponent,
    DeliveryPackageDeleteDialogComponent,
    deliveryPackageRoute,
    deliveryPackagePopupRoute
} from './';

import { DeliveryPackageAddDialogComponent } from 'app/entities/delivery-package/delivery-package-add-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedDataService } from 'app/shared/sharedData.service';

const ENTITY_STATES = [...deliveryPackageRoute, ...deliveryPackagePopupRoute];

@NgModule({
    imports: [TracaSharedModule, PdfViewerModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeliveryPackageComponent,
        DeliveryPackageDetailComponent,
        DeliveryPackageUpdateComponent,
        DeliveryPackageDeleteDialogComponent,
        DeliveryPackageDeletePopupComponent,
        DeliveryPackageAddDialogComponent
    ],
    entryComponents: [
        DeliveryPackageComponent,
        DeliveryPackageUpdateComponent,
        DeliveryPackageDeleteDialogComponent,
        DeliveryPackageDeletePopupComponent,
        DeliveryPackageAddDialogComponent
    ],
    providers: [SharedDataService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TracaDeliveryPackageModule {}
