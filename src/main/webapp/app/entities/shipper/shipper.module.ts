import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TracaSharedModule } from 'app/shared';
import {
    ShipperComponent,
    ShipperDetailComponent,
    ShipperUpdateComponent,
    ShipperDeletePopupComponent,
    ShipperDeleteDialogComponent,
    shipperRoute,
    shipperPopupRoute
} from './';
import { SharedDataService } from 'app/shared/sharedData.service';

const ENTITY_STATES = [...shipperRoute, ...shipperPopupRoute];

@NgModule({
    imports: [TracaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ShipperComponent,
        ShipperDetailComponent,
        ShipperUpdateComponent,
        ShipperDeleteDialogComponent,
        ShipperDeletePopupComponent
    ],
    entryComponents: [ShipperComponent, ShipperUpdateComponent, ShipperDeleteDialogComponent, ShipperDeletePopupComponent],
    providers: [SharedDataService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TracaShipperModule {}
