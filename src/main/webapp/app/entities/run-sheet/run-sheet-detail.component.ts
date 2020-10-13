import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { IRunSheet } from 'app/shared/model/run-sheet.model';
import { RunSheetService } from 'app/entities/run-sheet/run-sheet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgPdfViewerComponent } from 'app/pdf-viewer/ng-pdf-viewer.component';

@Component({
    selector: 'jhi-run-sheet-detail',
    templateUrl: './run-sheet-detail.component.html'
})
export class RunSheetDetailComponent implements OnInit {
    runSheet: IRunSheet;
    montant = 0;
    pdfIcon = faFilePdf;
    constructor(protected activatedRoute: ActivatedRoute, private runsheetService: RunSheetService, private ngbModal: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ runSheet }) => {
            this.runSheet = runSheet;

            for (const dp of this.runSheet.deliveryPackages) {
                this.montant += dp.price;
            }
        });
    }
    generatePDF(runsheet: IRunSheet) {
        const modal = this.ngbModal.open(NgPdfViewerComponent, {
            size: 'lg',
            backdrop: 'static'
        });
        modal.componentInstance.runsheet = runsheet;
    }
    previousState() {
        window.history.back();
    }
}
