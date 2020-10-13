import { Route } from '@angular/router';

import { ClientHomeComponent } from 'app/client-home/client-home.component';
import { UserRouteAccessService } from 'app/core';

export const CLIENT_HOME_ROUTE: Route = {
    path: 'client',
    component: ClientHomeComponent,
    outlet: 'client-home',
    canActivate: [UserRouteAccessService],
    data: {
        authorities: ['ROLE_USER']
    }
};
