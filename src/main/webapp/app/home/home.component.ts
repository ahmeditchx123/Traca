import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { DeliveryPackageService } from 'app/entities/delivery-package';
import { Subscription } from 'rxjs';
import { IRunSheet } from 'app/shared/model/run-sheet.model';
import { Count, RunSheetService } from 'app/entities/run-sheet';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    deliveryPackages: IDeliveryPackage[];
    eventSubscriber: Subscription;
    currentAccount: any;
    predicate: any = 'id';
    runSheets: IRunSheet[];
    count: Count;
    trackId: any;

    constructor(
        protected deliveryPackageService: DeliveryPackageService,
        private accountService: AccountService,
        protected runSheetService: RunSheetService,
        protected parseLinks: JhiParseLinks,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        protected jhiAlertService: JhiAlertService
    ) {
        this.count = new Count();
    }

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDeliveryPackages();
        this.runSheetService.getCount().subscribe(x => (this.count = x.body));
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    loadAll() {
        this.deliveryPackageService
            .queryOnePage()
            .subscribe(
                (res: HttpResponse<IDeliveryPackage[]>) => (this.deliveryPackages = res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.runSheetService
            .findOnePage()
            .subscribe(
                (res: HttpResponse<IRunSheet[]>) => (this.runSheets = res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    sort() {
        const result = ['id' + ',' + 'desc'];

        result.push('id');

        return result;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    protected paginateDeliveryPackages(data: IDeliveryPackage[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.deliveryPackages = data;
    }

    registerChangeInDeliveryPackages() {
        this.eventSubscriber = this.eventManager.subscribe('deliveryPackageListModification', response => this.loadAll());
    }

    protected paginateRunSheets(data: IRunSheet[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.runSheets = data;
    }
}
