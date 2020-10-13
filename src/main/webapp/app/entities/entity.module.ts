import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'delivery-man',
                loadChildren: './delivery-man/delivery-man.module#TracaDeliveryManModule'
            },
            {
                path: 'address',
                loadChildren: './address/address.module#TracaAddressModule'
            },
            {
                path: 'shipper',
                loadChildren: './shipper/shipper.module#TracaShipperModule'
            },
            {
                path: 'delivery-package',
                loadChildren: './delivery-package/delivery-package.module#TracaDeliveryPackageModule'
            },
            {
                path: 'client/delivery-package',
                loadChildren: './delivery-package/delivery-package.module#TracaDeliveryPackageModule'
            },
            {
                path: 'transition-history',
                loadChildren: './transition-history/transition-history.module#TracaTransitionHistoryModule'
            },
            {
                path: 'run-sheet',
                loadChildren: './run-sheet/run-sheet.module#TracaRunSheetModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TracaEntityModule {}
