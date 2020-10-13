import './vendor.ts';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { TracaSharedModule } from 'app/shared';
import { TracaCoreModule } from 'app/core';
import { TracaAppRoutingModule } from './app-routing.module';
import { TracaHomeModule } from './home/home.module';
import { TracaAccountModule } from './account/account.module';
import { TracaEntityModule } from './entities/entity.module';
import { TracaClientModule } from 'app/font-end/client';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import { JhiLoginComponent } from 'app/shared/main-login/login.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ClientHomeComponent } from 'app/client-home';
import { ClientComponent } from './font-end/client/client.component';

import { NgPdfViewerModule } from 'app/pdf-viewer/ng-pdf-viewer.module';
import { PasswordResetInitComponent } from 'app/account';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000
        }),
        TracaSharedModule.forRoot(),
        TracaClientModule,
        TracaCoreModule,
        TracaHomeModule,
        TracaAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        TracaEntityModule,
        TracaAppRoutingModule,
        NgPdfViewerModule
    ],
    declarations: [
        JhiMainComponent,
        JhiLoginComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        SidebarComponent,
        ClientComponent,
        PasswordResetInitComponent,
        ClientHomeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class TracaAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
