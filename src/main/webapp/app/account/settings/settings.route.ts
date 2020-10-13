import { Route, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Routes = [
    {
        path: 'settings',
        component: SettingsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Settings Admin'
        },
        canActivate: [UserRouteAccessService]
    }
];
