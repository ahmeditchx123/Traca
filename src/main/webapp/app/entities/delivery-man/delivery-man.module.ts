import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TracaSharedModule } from 'app/shared';
import {
    DeliveryManComponent,
    DeliveryManDetailComponent,
    DeliveryManUpdateComponent,
    DeliveryManDeletePopupComponent,
    DeliveryManDeleteDialogComponent,
    deliveryManRoute,
    deliveryManPopupRoute
} from './';
import { SharedDataService } from 'app/shared/sharedData.service';

const ENTITY_STATES = [...deliveryManRoute, ...deliveryManPopupRoute];

@NgModule({
    imports: [TracaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeliveryManComponent,
        DeliveryManDetailComponent,
        DeliveryManUpdateComponent,
        DeliveryManDeleteDialogComponent,
        DeliveryManDeletePopupComponent
    ],
    entryComponents: [DeliveryManComponent, DeliveryManUpdateComponent, DeliveryManDeleteDialogComponent, DeliveryManDeletePopupComponent],
    providers: [SharedDataService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TracaDeliveryManModule {}
