import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TracaSharedModule } from 'app/shared';
import { HomeClientComponent } from 'app/font-end/client/home-client.component';
import { CLIENT_ROUTES } from 'app/font-end/client/client.route';
import { CLIENT_ROUTES_POPUP } from 'app/font-end/client/client.route';
import { DeliveryPackageDeletePopupClientComponent } from './delete-package-client.component';
import { DeletePackageClientComponent } from './delete-package-client.component';

@NgModule({
    imports: [TracaSharedModule, RouterModule.forChild([...CLIENT_ROUTES, ...CLIENT_ROUTES_POPUP])],
    declarations: [HomeClientComponent, DeliveryPackageDeletePopupClientComponent, DeletePackageClientComponent],
    entryComponents: [DeletePackageClientComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TracaClientModule {}
