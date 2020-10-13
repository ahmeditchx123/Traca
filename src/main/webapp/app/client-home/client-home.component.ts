import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DeliveryPackageService } from 'app/entities/delivery-package';
import { Account, AccountService } from 'app/core';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'jhi-client-home',
    templateUrl: './client-home.component.html',
    styles: []
})
export class ClientHomeComponent implements OnInit, OnDestroy {
    account: Account;
    deliveryPackages: IDeliveryPackage[];
    private subscription: Subscription;
    page: any;
    itemsPerPage: any;
    predicate: any;
    reverse: any;
    constructor(private deliveryPackageService: DeliveryPackageService, private accountservice: AccountService, private router: Router) {}

    ngOnInit() {
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

    loadPackagesByClient(): void {
        this.subscription = this.deliveryPackageService
            .getPackagesByClient(this.account.firstName, this.account.lastName)
            .subscribe(res => {
                this.deliveryPackages = res.body;
            });
    }
    trackId(index, item) {
        return index;
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
