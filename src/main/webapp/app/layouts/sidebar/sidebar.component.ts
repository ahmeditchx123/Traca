import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Account, AccountService, LoginService } from 'app/core';
import { Count, RunSheetService } from 'app/entities/run-sheet';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faUserCircle, faCogs } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DeliveryPackageService } from 'app/entities/delivery-package';
import { ShipperService } from 'app/entities/shipper';
import { DeliveryManService } from 'app/entities/delivery-man';
import { MainService } from 'app/layouts/main/main.service';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['../sidebar/main.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
    @Input() account: Account;
    count: Count;
    faUserCircle = faUserCircle;
    faCogs = faCogs;
    private subscription: Subscription;
    isAdminConnected: boolean;
    collisNumber: number;
    runSheetNumber: number;
    clientNumber: number;
    livreurNumber: number;

    constructor(
        private titleService: Title,
        private router: Router,
        private accountService: AccountService,
        private loginService: LoginService,
        private deliveryPackageService: DeliveryPackageService,
        private runSheetService: RunSheetService,
        private shipperService: ShipperService,
        private deliveryManService: DeliveryManService,
        private mainService: MainService
    ) {
        this.count = new Count();
        this.subscription = this.deliveryPackageService.changed.subscribe(res => {
            if (res) {
                this.getDailyCount();
            }
        });
        this.subscription = this.runSheetService.changed.subscribe(res => {
            if (res) {
                this.getDailyCount();
            }
        });
        this.subscription = this.deliveryManService.changed.subscribe(res => {
            if (res) {
                this.getDailyCount();
            }
        });
        this.subscription = this.shipperService.changed.subscribe(res => {
            if (res) {
                this.getDailyCount();
            }
        });
    }
    ngOnInit() {
        this.subscription = this.accountService.getEmittedValue().subscribe(res => {
            this.isAdminConnected = res;
        });
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.getDailyCount();
    }
    getDailyCount() {
        this.mainService.getDailyCount().subscribe(res => {
            this.collisNumber = res.body.numberNewDeliveredPackage;
            this.runSheetNumber = res.body.numberNewRunsheet;
            this.livreurNumber = res.body.numberNewDeliveryMan;
            this.clientNumber = res.body.numberNewSheeper;
        });
    }
    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
