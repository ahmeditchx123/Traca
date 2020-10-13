import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DeliveryPackageService } from 'app/entities/delivery-package';
import { Account, AccountService } from 'app/core';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-home-client',
    templateUrl: './home-client.component.html',
    styles: []
})
export class HomeClientComponent implements OnInit, OnDestroy {
    account: Account;
    deliveryPackages: IDeliveryPackage[];
    private subscription: Subscription;
    page: any;
    itemsPerPage: any;
    predicate: any;
    reverse: any;
    constructor(
        private deliveryPackageService: DeliveryPackageService,
        private accountservice: AccountService,
        private router: Router,
        private eventManager: JhiEventManager
    ) {}

    ngOnDestroy(): void {}

    loadPackagesByClient(): void {
        this.deliveryPackageService.getPackagesByClient(this.account.firstName, this.account.lastName).subscribe(res => {
            this.deliveryPackages = res.body;
        });
    }

    transition() {
        this.router.navigate(['/delivery-package'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadPackagesByClient();
    }

    trackId(index, item) {
        return index;
    }
    ngOnInit(): void {
        this.accountservice.identity().then((account: Account) => {
            this.account = account;
            this.loadPackagesByClient();
        });
        this.subscription = this.deliveryPackageService.getFilterObservable().subscribe(filterValue => {
            if (filterValue === 'NA') {
                this.loadPackagesByClient();
            } else {
                this.deliveryPackageService
                    .filterByClientAndStatus(filterValue, this.account.firstName, this.account.lastName)
                    .subscribe(results => {
                        this.deliveryPackages = results.body;
                    });
            }
        });
        this.subscription = this.deliveryPackageService.getChanged().subscribe(res => {
            if (res) {
                this.loadPackagesByClient();
            }
        });
    }
}
