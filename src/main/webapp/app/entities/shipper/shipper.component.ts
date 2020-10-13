import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { IShipper } from 'app/shared/model/shipper.model';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ShipperService } from './shipper.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'app/shared/sharedData.service';
import { ShipperObservable } from 'app/shared/sharedData.service';
import { Actions, IRunSheet } from 'app/shared/model/run-sheet.model';

@Component({
    selector: 'jhi-shipper',
    templateUrl: './shipper.component.html'
})
export class ShipperComponent implements OnInit, OnDestroy {
    currentAccount: any;
    shippers: IShipper[];
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
    subscription: Subscription;
    eventSubscriber: Subscription;

    constructor(
        protected shipperService: ShipperService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        private toaster: ToastrService,
        private sharedService: SharedDataService,
        protected eventManager: JhiEventManager
    ) {
        this.sharedService.getShipperEvent().subscribe((shipperEvent: ShipperObservable) => {
            if (shipperEvent.actionType === Actions.FAIL_ADD && shipperEvent.value === false) {
                this.toaster.error(`Erreur lors de l'ajout d'un client`, 'Ajout client');
                this.sharedService.clearShipperEvent();
            }
            if (shipperEvent.actionType === Actions.FAIL_UPDATE && shipperEvent.value === false) {
                this.toaster.success(`Erreur lors de la modification d'un client`, 'Mise a jour client');
                this.sharedService.clearShipperEvent();
            }
            if (shipperEvent.actionType === Actions.ADD && shipperEvent.value === true) {
                this.toaster.success(
                    `Client "${shipperEvent.shipper.firstName} ${shipperEvent.shipper.lastName}" a été ajouté avec succés`,
                    'Ajout Client'
                );
                this.sharedService.clearShipperEvent();
            }
            if (shipperEvent.actionType === Actions.UPDATE && shipperEvent.value === true) {
                this.toaster.success(
                    `Client "${shipperEvent.shipper.firstName} ${shipperEvent.shipper.lastName}" a été modifié avec succés`,
                    'Mise a jour client'
                );
                this.sharedService.clearShipperEvent();
            }
            if (shipperEvent.actionType === Actions.DELETE && shipperEvent.value === true) {
                this.toaster.success(
                    `Client "${shipperEvent.shipper.firstName} ${shipperEvent.shipper.lastName}" a été supprimé avec succés`,
                    'Supression client'
                );
                this.sharedService.clearShipperEvent();
                this.loadAll();
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

    loadAll() {
        this.shipperService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IShipper[]>) => this.paginateShippers(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.registerChangeInShippper();
    }

    loadItems() {
        this.shipperService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IShipper[]>) => this.paginateShippers(res.body, res.headers),
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
        this.router.navigate(['/shipper'], {
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
            '/shipper',
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

    registerChangeInShippper() {
        this.eventSubscriber = this.eventManager.subscribe('shipperListModification', response => this.itemDeleted(response));
    }

    itemDeleted(response) {
        this.toaster.success(`Le client "${response.firstName} ${response.lastName}" a été supprimé avec succes`, 'Suppression client');
        this.loadItems();
    }

    trackId(index: number, item: IShipper) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateShippers(data: IShipper[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.shippers = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
