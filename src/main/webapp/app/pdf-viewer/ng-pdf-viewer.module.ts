import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgPdfViewerComponent } from 'app/pdf-viewer/ng-pdf-viewer.component';
import { RouterModule } from '@angular/router';
import { TracaSharedModule } from 'app/shared';
import { PDF_VIEWER_ROUTES } from 'app/pdf-viewer/pdf-viewer.route';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const route_state = [...PDF_VIEWER_ROUTES];

@NgModule({
    imports: [TracaSharedModule, PdfViewerModule, RouterModule.forRoot(route_state)],
    declarations: [NgPdfViewerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgPdfViewerModule {}
