import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RunSheet } from 'app/shared/model/run-sheet.model';
import { RunSheetService } from './run-sheet.service';
import { RunSheetComponent } from './run-sheet.component';
import { RunSheetDetailComponent } from './run-sheet-detail.component';
import { RunSheetUpdateComponent } from './run-sheet-update.component';
import { RunSheetDeletePopupComponent } from './run-sheet-delete-dialog.component';
import { IRunSheet } from 'app/shared/model/run-sheet.model';

@Injectable({ providedIn: 'root' })
export class RunSheetResolve implements Resolve<IRunSheet> {
    constructor(private service: RunSheetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRunSheet> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RunSheet>) => response.ok),
                map((runSheet: HttpResponse<RunSheet>) => runSheet.body)
            );
        }
        return of(new RunSheet());
    }
}

export const runSheetRoute: Routes = [
    {
        path: '',
        component: RunSheetComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'RunSheets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RunSheetDetailComponent,
        resolve: {
            runSheet: RunSheetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RunSheets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RunSheetUpdateComponent,
        resolve: {
            runSheet: RunSheetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RunSheets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RunSheetUpdateComponent,
        resolve: {
            runSheet: RunSheetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RunSheets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const runSheetPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RunSheetDeletePopupComponent,
        resolve: {
            runSheet: RunSheetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RunSheets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
