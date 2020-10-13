import { Routes } from '@angular/router';
import { ClientComponent } from 'app/font-end/client/client.component';
import { UserRouteAccessService } from 'app/core';
import { HomeClientComponent } from 'app/font-end/client/home-client.component';
import { DeliveryPackageDeletePopupComponent, DeliveryPackageResolve } from 'app/entities/delivery-package';
import { DeliveryPackageDeletePopupClientComponent } from 'app/font-end/client/delete-package-client.component';

export const CLIENT_ROUTES: Routes = [
    {
        path: 'client',
        component: ClientComponent,
        data: {
            authorities: ['ROLE_USER']
        },
        canActivate: [UserRouteAccessService],
        outlet: 'client-sidebar'
    },
    {
        path: 'client',
        component: HomeClientComponent,
        data: {
            authorities: ['ROLE_USER']
        },
        canActivate: [UserRouteAccessService]
    }
];

export const CLIENT_ROUTES_POPUP = [
    {
        path: ':id/delete',
        component: DeliveryPackageDeletePopupClientComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryPackages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
