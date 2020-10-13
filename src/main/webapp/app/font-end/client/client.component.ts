import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { Title } from '@angular/platform-browser';
import { Account, AccountService, LoginService } from 'app/core';
import { Count } from 'app/entities/run-sheet';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { DeliveryPackageService } from 'app/entities/delivery-package';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Actions } from 'app/shared/model/run-sheet.model';
import { HttpResponse } from '@angular/common/http';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { DeliveryPackageStatus } from 'app/shared/model/transition-history.model';

@Component({
    selector: 'jhi-client-sidebar',
    templateUrl: './client.component.html',
    styleUrls: ['./client.css']
})
export class ClientComponent implements OnInit, OnDestroy {
    account: Account;
    count: Count;
    fauser = faUserCircle;
    packagesCount = {
        allPackagesCount: 0,
        newPackagesCount: 0,
        toDeliverPackagesCount: 0,
        pickedPackagesCount: 0,
        deliveredPackagesCount: 0,
        refusedPackagesCount: 0
    };
    deliveryPackages: IDeliveryPackage[];
    eventSubscriber: Subscription;
    constructor(
        private titleService: Title,
        private router: Router,
        private accountService: AccountService,
        private loginService: LoginService,
        private deliveryPackageService: DeliveryPackageService,
        private eventManager: JhiEventManager,
        private toaster: ToastrService
    ) {
        this.count = new Count();
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'tracaApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }
    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    loadData() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
            this.deliveryPackageService.getAllPackagesCount(account.firstName, account.lastName).subscribe(packagesCount => {
                this.packagesCount.allPackagesCount = packagesCount.body.allPackagesCount;
                this.packagesCount.newPackagesCount = packagesCount.body.newPackagesCount;
                this.packagesCount.toDeliverPackagesCount = packagesCount.body.toDeliverPackagesCount;
                this.packagesCount.pickedPackagesCount = packagesCount.body.pickedPackagesCount;
                this.packagesCount.deliveredPackagesCount = packagesCount.body.deliveredPackagesCount;
                this.packagesCount.refusedPackagesCount = packagesCount.body.refusedPackagesCount;
            });
        });
    }

    ngOnInit() {
        this.loadData();
        this.registerChangeInDeliveryPackages();
    }

    filterPackagesBy(value: string) {
        this.deliveryPackageService.getFilterSubject().next(value);
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }

    registerChangeInDeliveryPackages() {
        this.eventSubscriber = this.eventManager.subscribe('Delivery_package', response => this.handleChange(response));
    }

    handleChange(object) {
        if (object.actionType === Actions.FAIL_ADD) {
            this.toaster.error(`Erreur lors de l'ajout  d'un coli`, 'Erreur');
            return;
        }
        if (object.actionType === Actions.FAIL_UPDATE) {
            this.toaster.error(`Erreur lors de la modification  d'un coli`, 'Erreur');
        }
        if (object.actionType === Actions.ADD) {
            this.toaster.success(
                `Coli vers  "${object.deliveryPackage.receiverFirstName} ${
                    object.deliveryPackage.receiverLastName
                }" a été ajouté avec succes`,
                'Ajout colis'
            );
            this.loadData();
        }
        if (object.actionType === Actions.DELETE) {
            this.toaster.success(
                `Coli vers  "${object.deliveryPackage.receiverFirstName} ${
                    object.deliveryPackage.receiverLastName
                }" a été supprimé avec succes`,
                'Ajout colis'
            );
            this.loadData();
        }
        if (object.actionType === Actions.UPDATE) {
            this.toaster.success(
                `Coli vers "${object.deliveryPackage.receiverFirstName} ${
                    object.deliveryPackage.receiverLastName
                }" a été modifié avec succes`,
                'Mise a jour'
            );
            this.loadData();
        }
    }

    ngOnDestroy(): void {
        this.eventManager.destroy(this.eventSubscriber);
    }
}
