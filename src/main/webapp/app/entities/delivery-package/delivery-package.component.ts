import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { first } from 'rxjs/operators';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { DeliveryPackageService } from './delivery-package.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'app/shared/sharedData.service';
import { DeliveryPackageObservable } from 'app/shared/sharedData.service';
import { Actions } from 'app/shared/model/run-sheet.model';

@Component({
    selector: 'jhi-delivery-package',
    templateUrl: './delivery-package.component.html'
})
export class DeliveryPackageComponent implements OnInit, OnDestroy {
    currentAccount: any;
    deliveryPackages: IDeliveryPackage[];
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
        protected deliveryPackageService: DeliveryPackageService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        private toaster: ToastrService,
        private sharedService: SharedDataService,
        protected eventManager: JhiEventManager
    ) {
        this.sharedService
            .getDeliveryPackageEvent()
            .pipe(first())
            .subscribe((object: DeliveryPackageObservable) => {
                console.log(object);
                if (object.actionType === Actions.FAIL_ADD && object.value === false) {
                    this.toaster.error(`Erreur lors de l'ajout  d'un coli`, 'Erreur');
                    this.sharedService.clearEvent();
                    return;
                }
                if (object.actionType === Actions.FAIL_UPDATE && object.value === false) {
                    this.toaster.error(`Erreur lors de la modification  d'un coli`, 'Erreur');
                    this.sharedService.clearEvent();
                }
                if (object.actionType === Actions.ADD) {
                    this.loadAll();
                    this.showToast(
                        `Coli assigné a "${object.deliveryPackage.shipper.firstName} ${
                            object.deliveryPackage.shipper.lastName
                        }" a été ajouté avec succes`,
                        'Ajout colis'
                    );
                    this.sharedService.clearEvent();
                }
                if (object.actionType === Actions.DELETE) {
                    this.loadAll();
                    this.showToast(
                        `Coli assigné a "${object.deliveryPackage.shipper.firstName} ${
                            object.deliveryPackage.shipper.lastName
                        }" a été supprimé avec succes`,
                        'Suppression coli'
                    );
                    this.sharedService.clearEvent();
                }
                if (object.actionType === Actions.UPDATE) {
                    this.showToast(
                        `Coli assigné a "${object.deliveryPackage.shipper.firstName} ${
                            object.deliveryPackage.shipper.lastName
                        }" a été modifié avec succes`,
                        'Mise a jour'
                    );
                    this.sharedService.clearEvent();
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
    showToast(content: string, title: string) {
        this.toaster.success(content, title);
    }
    loadAll() {
        this.deliveryPackageService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDeliveryPackage[]>) => this.paginateDeliveryPackages(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.registerChangeInDeliveryPackages();
    }

    loadItems() {
        this.deliveryPackageService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDeliveryPackage[]>) => this.paginateDeliveryPackages(res.body, res.headers),
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
        this.router.navigate(['/delivery-package'], {
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
            '/delivery-package',
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

    registerChangeInDeliveryPackages() {
        this.eventSubscriber = this.eventManager.subscribe('deliveryPackageListModification', response => this.itemDeleted(response));
    }

    itemDeleted(response) {
        console.log(response);
        this.showToast(`Un coli assigné a "${response.firstName} ${response.lastName}" a été supprimé avec succes`, 'Suppression coli');
        this.loadItems();
    }
    trackId(index: number, item: IDeliveryPackage) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    onChange(filterValue) {
        if (filterValue === 'null') {
            this.loadAll();
        } else {
            this.deliveryPackages = [];
            this.deliveryPackageService.filterbyStatus(filterValue).subscribe(res => {
                this.deliveryPackages = res;
            });
        }
    }
    protected paginateDeliveryPackages(data: IDeliveryPackage[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.deliveryPackages = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
