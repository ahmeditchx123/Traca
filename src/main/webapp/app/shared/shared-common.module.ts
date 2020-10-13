import { NgModule } from '@angular/core';

import { TracaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [TracaSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [TracaSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TracaSharedCommonModule {}
