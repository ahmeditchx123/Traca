import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { SIDEBAR_ROUTE } from 'app/layouts/sidebar/sidebar.route';
import { CLIENT_ROUTES } from 'app/font-end/client';

const LAYOUT_ROUTES = [navbarRoute, SIDEBAR_ROUTE, ...errorRoute, ...CLIENT_ROUTES];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#TracaAdminModule'
                },
                {
                    path: 'client',
                    loadChildren: './font-end/client/client.module#TracaClientModule'
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class TracaAppRoutingModule {}
