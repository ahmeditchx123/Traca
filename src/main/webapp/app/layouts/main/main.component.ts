import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Account, AccountService, LoginService } from 'app/core';
import { Count } from 'app/entities/run-sheet';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['../sidebar/main.css']
})
export class JhiMainComponent implements OnInit {
    account: Account;
    count: Count;
    isAdminConnected: boolean;

    constructor(
        private titleService: Title,
        private router: Router,
        private route: ActivatedRoute,
        private accountService: AccountService,
        private loginService: LoginService
    ) {
        this.count = new Count();

        this.accountService.getAuthenticationState().subscribe(res => {
            if (res) {
                this.isAdmin().then(results => {
                    this.isAdminConnected = results;
                    this.accountService.emitDate(results);
                });
            }
        });
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

    isAdmin() {
        return this.accountService.hasAuthority('ROLE_ADMIN');
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }

            if (event instanceof NavigationError && event.error.status === 404) {
                this.router.navigate(['/404']);
            }
        });

        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }
}
