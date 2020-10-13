import { Component, OnInit } from '@angular/core';

import { AccountService } from 'app/core';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    client = false;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.settingsAccount = this.copyAccount(account);
        });

        this.accountService.hasAuthority('ROLE_ADMIN').then(isAdmin => {
            if (!isAdmin) {
                this.client = true;
            } else {
                this.client = false;
            }
        });
    }

    save() {
        this.accountService.save(this.settingsAccount).subscribe(
            () => {
                this.error = null;
                this.success = 'OK';
                this.accountService.identity(true).then(account => {
                    this.settingsAccount = this.copyAccount(account);
                });
            },
            () => {
                this.success = null;
                this.error = 'ERROR';
            }
        );
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}
