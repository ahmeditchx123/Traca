import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TransitionHistory } from 'app/shared/model/transition-history.model';
import { TransitionHistoryService } from './transition-history.service';
import { TransitionHistoryComponent } from './transition-history.component';
import { TransitionHistoryDetailComponent } from './transition-history-detail.component';
import { TransitionHistoryUpdateComponent } from './transition-history-update.component';
import { TransitionHistoryDeletePopupComponent } from './transition-history-delete-dialog.component';
import { ITransitionHistory } from 'app/shared/model/transition-history.model';

@Injectable({ providedIn: 'root' })
export class TransitionHistoryResolve implements Resolve<ITransitionHistory> {
    constructor(private service: TransitionHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITransitionHistory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TransitionHistory>) => response.ok),
                map((transitionHistory: HttpResponse<TransitionHistory>) => transitionHistory.body)
            );
        }
        return of(new TransitionHistory());
    }
}

export const transitionHistoryRoute: Routes = [
    {
        path: '',
        component: TransitionHistoryComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'TransitionHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TransitionHistoryDetailComponent,
        resolve: {
            transitionHistory: TransitionHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransitionHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TransitionHistoryUpdateComponent,
        resolve: {
            transitionHistory: TransitionHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransitionHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TransitionHistoryUpdateComponent,
        resolve: {
            transitionHistory: TransitionHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransitionHistories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transitionHistoryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TransitionHistoryDeletePopupComponent,
        resolve: {
            transitionHistory: TransitionHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransitionHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
