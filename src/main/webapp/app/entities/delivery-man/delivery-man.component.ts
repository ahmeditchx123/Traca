import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { IDeliveryMan } from 'app/shared/model/delivery-man.model';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { DeliveryManService } from './delivery-man.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'app/shared/sharedData.service';
import { LivreurObservable } from 'app/shared/sharedData.service';
import { Actions } from 'app/shared/model/run-sheet.model';

@Component({
    selector: 'jhi-delivery-man',
    templateUrl: './delivery-man.component.html'
})
export class DeliveryManComponent implements OnInit, OnDestroy {
    currentAccount: any;
    deliveryMen: IDeliveryMan[];
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
        protected deliveryManService: DeliveryManService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        private toaster: ToastrService,
        private sharedService: SharedDataService
    ) {
        this.sharedService.getLivreurEvent().subscribe((deliveryManEvent: LivreurObservable) => {
            if (deliveryManEvent.actionType === Actions.FAIL_ADD && deliveryManEvent.value === false) {
                this.toaster.error(`Erreur lors de l'ajout d'un livreur `, 'Erreur ajout livreur');
                this.sharedService.clearLivreurEvent();
            }
            if (deliveryManEvent.actionType === Actions.FAIL_UPDATE && deliveryManEvent.value === false) {
                this.toaster.error(`Erreur lors de la modification d'un livreur `, 'Erreur de la mise a jour livreur');
                this.sharedService.clearLivreurEvent();
            }
            if (deliveryManEvent.actionType === Actions.ADD && deliveryManEvent.value === true) {
                this.toaster.success(
                    `Livreur "${deliveryManEvent.livreur.firstName} ${deliveryManEvent.livreur.lastName}" a été ajouté avec succes`,
                    'Ajout livreur'
                );
                this.sharedService.clearLivreurEvent();
            }
            if (deliveryManEvent.actionType === Actions.UPDATE && deliveryManEvent.value === true) {
                this.toaster.success(
                    `Livreur "${deliveryManEvent.livreur.firstName} ${deliveryManEvent.livreur.lastName}" modifié avec succes`,
                    'Mise a jour livreur'
                );
                this.sharedService.clearLivreurEvent();
            }
            if (deliveryManEvent.actionType === Actions.DELETE && deliveryManEvent.value === true) {
                this.toaster.success(
                    `Livreur "${deliveryManEvent.livreur.firstName} ${deliveryManEvent.livreur.lastName}" supprimé avec succes`,
                    'Supression livreur'
                );
                this.sharedService.clearLivreurEvent();
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
        this.deliveryManService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDeliveryMan[]>) => this.paginateDeliveryMen(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.registerChangeInDeliveryMan();
    }

    loadItems() {
        this.deliveryManService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDeliveryMan[]>) => this.paginateDeliveryMen(res.body, res.headers),
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
        this.router.navigate(['/delivery-man'], {
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
            '/delivery-man',
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

    registerChangeInDeliveryMan() {
        this.eventSubscriber = this.eventManager.subscribe('deliveryManListModification', response => this.itemDeleted(response));
    }

    itemDeleted(response) {
        this.toaster.success(`Un Livreur "${response.firstName} ${response.lastName}" a été supprimé avec succes`, 'Suppression livreur');
        this.loadItems();
    }

    trackId(index: number, item: IDeliveryMan) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateDeliveryMen(data: IDeliveryMan[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.deliveryMen = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
