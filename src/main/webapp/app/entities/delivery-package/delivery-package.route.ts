import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DeliveryPackage } from 'app/shared/model/delivery-package.model';
import { DeliveryPackageService } from './delivery-package.service';
import { DeliveryPackageComponent } from './delivery-package.component';
import { DeliveryPackageDetailComponent } from './delivery-package-detail.component';
import { DeliveryPackageUpdateComponent } from './delivery-package-update.component';
import { DeliveryPackageDeletePopupComponent } from './delivery-package-delete-dialog.component';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { DeliveryPackageAddDialogComponent } from 'app/entities/delivery-package/delivery-package-add-dialog.component';

@Injectable({ providedIn: 'root' })
export class DeliveryPackageResolve implements Resolve<IDeliveryPackage> {
    constructor(private service: DeliveryPackageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDeliveryPackage> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DeliveryPackage>) => response.ok),
                map((deliveryPackage: HttpResponse<DeliveryPackage>) => deliveryPackage.body)
            );
        }
        return of(new DeliveryPackage());
    }
}

export const deliveryPackageRoute: Routes = [
    {
        path: '',
        component: DeliveryPackageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'DeliveryPackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DeliveryPackageDetailComponent,
        resolve: {
            deliveryPackage: DeliveryPackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryPackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DeliveryPackageUpdateComponent,
        resolve: {
            deliveryPackage: DeliveryPackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryPackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DeliveryPackageUpdateComponent,
        resolve: {
            deliveryPackage: DeliveryPackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryPackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: '',
        component: DeliveryPackageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'DeliveryPackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'addNewPackage',
        component: DeliveryPackageAddDialogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryPackages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const deliveryPackagePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DeliveryPackageDeletePopupComponent,
        resolve: {
            deliveryPackage: DeliveryPackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryPackages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
