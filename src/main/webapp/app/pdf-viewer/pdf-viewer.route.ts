import { Routes } from '@angular/router';
import { NgPdfViewerComponent } from 'app/pdf-viewer/ng-pdf-viewer.component';

export const PDF_VIEWER_ROUTES: Routes = [
    {
        path: 'pdfViewer',
        component: NgPdfViewerComponent
    }
];
