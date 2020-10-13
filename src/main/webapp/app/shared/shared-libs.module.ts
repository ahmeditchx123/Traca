import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        CookieModule.forRoot(),
        FontAwesomeModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-left',
            preventDuplicates: true,
            easeTime: 200
        })
    ],
    exports: [FormsModule, CustomFormsModule, CommonModule, NgbModule, NgJhipsterModule, FontAwesomeModule]
})
export class TracaSharedLibsModule {
    static forRoot() {
        return {
            ngModule: TracaSharedLibsModule
        };
    }
}
