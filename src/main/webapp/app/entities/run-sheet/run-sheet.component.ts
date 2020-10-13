import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Actions, IRunSheet } from 'app/shared/model/run-sheet.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { RunSheetService } from './run-sheet.service';
import { ToastrService } from 'ngx-toastr';
import { RunsheetObservable, SharedDataService } from 'app/shared/sharedData.service';

@Component({
    selector: 'jhi-run-sheet',
    templateUrl: './run-sheet.component.html'
})
export class RunSheetComponent implements OnInit, OnDestroy {
    currentAccount: any;
    runSheets: IRunSheet[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    eventSubscriber: Subscription;
    subscription: Subscription;
    constructor(
        protected runSheetService: RunSheetService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        private toaster: ToastrService,
        private sharedService: SharedDataService,
        protected eventManager: JhiEventManager
    ) {
        this.sharedService.getEvent().subscribe((observerRunsheet: RunsheetObservable) => {
            if (observerRunsheet.actionType === Actions.FAIL_ADD && observerRunsheet.value === false) {
                this.toaster.error(`Error lors de l'ajour d'un run sheet`, 'Erreur');
                this.sharedService.clear();
            }
            if (observerRunsheet.actionType === Actions.FAIL_UPDATE && observerRunsheet.value === false) {
                this.toaster.error(`Error lors de la mise a jour d'un run sheet`, 'Erreur ');
                this.sharedService.clear();
            }
            if (observerRunsheet.actionType === Actions.ADD) {
                this.showToast(`Run sheet: "${observerRunsheet.runSheet.code}" a été ajouté avec succes`, 'Ajout');
                this.sharedService.clear();
            }
            if (observerRunsheet.actionType === Actions.DELETE) {
                this.showToast(`Run sheet: "${observerRunsheet.runSheet.code}" a été supprimé avec succes`, 'Suppression');
                this.sharedService.clear();
                this.loadAll();
            }
            if (observerRunsheet.actionType === Actions.UPDATE) {
                this.showToast(`Run sheet: "${observerRunsheet.runSheet.code}" a été modifié avec succes`, 'Mise a jour');
                this.sharedService.clear();
            }
        });

        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }
    showToast(message: string, title: string) {
        this.toaster.success(message, title);
    }

    loadAll() {
        this.runSheetService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IRunSheet[]>) => this.paginateRunSheets(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.registerChangeInRunSheet();
    }

    loadItems() {
        this.runSheetService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IRunSheet[]>) => this.paginateRunSheets(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/run-sheet'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/run-sheet',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRunSheet() {
        this.eventSubscriber = this.eventManager.subscribe('runSheetListModification', response => this.itemDeleted(response));
    }

    itemDeleted(response) {
        this.toaster.success(`Un Runsheet: ${response.code} a été supprimé avec succes`, 'Suppression runSheet');
        this.loadItems();
    }

    trackId(index: number, item: IRunSheet) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateRunSheets(data: IRunSheet[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.runSheets = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
