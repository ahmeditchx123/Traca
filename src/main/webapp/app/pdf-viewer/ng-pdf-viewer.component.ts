import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { DeliveryPackageService } from 'app/entities/delivery-package';
import { HttpResponse } from '@angular/common/http';
import { IRunSheet } from 'app/shared/model/run-sheet.model';
import { RunSheetService } from 'app/entities/run-sheet';
import { SERVER_API_URL } from 'app/app.constants';

@Component({
    selector: 'jhi-ng-pdf-viewer',
    templateUrl: './ng-pdf-viewer.component.html',
    styleUrls: ['./ng-pdf-viewer.component.css'],
    providers: [DeliveryPackageService, RunSheetService]
})
export class NgPdfViewerComponent implements OnInit {
    @Input()
    deliveryPackage: IDeliveryPackage;
    @Input()
    runsheet: IRunSheet;
    page = 1;
    pdfSrc = '';
    totalPages: number;
    leftArrowIcon = faArrowLeft;
    rightArrowIcon = faArrowRight;
    paginator = this.page + '/' + this.totalPages;
    @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

    constructor(
        private activeModal: NgbActiveModal,
        private packageService: DeliveryPackageService,
        private runsheetService: RunSheetService
    ) {}

    ngOnInit(): void {
        if (this.deliveryPackage) {
            this.packageService.getPDf(this.deliveryPackage.id).subscribe((res: HttpResponse<any>) => {
                this.pdfSrc = res.body;
            });
        }
        if (this.runsheet) {
            this.runsheetService.generatePdf(this.runsheet.id).subscribe((res: HttpResponse<any>) => {
                this.pdfSrc = res.body;
            });
        }
    }

    dismiss(reason: string) {
        this.activeModal.dismiss(reason);
    }

    reInitializePaginator() {
        this.paginator = this.page + '/' + this.totalPages;
    }

    handleLoadCompleted(pdfData: any) {
        this.totalPages = pdfData.numPages;
        this.reInitializePaginator();
    }

    goToPreviousPage() {
        if (this.page === 1) {
            this.page = this.totalPages;
            this.reInitializePaginator();
        } else {
            this.page--;
            this.reInitializePaginator();
        }
    }

    goToNextPage() {
        if (this.page >= this.totalPages) {
            this.page = 1;
            this.reInitializePaginator();
        } else {
            this.page++;
            this.reInitializePaginator();
        }
    }

    handleInputChange(event) {
        const value: string = event.target.value;
        this.page = Number(value.split('/')[0]);
        if (this.page >= this.totalPages) {
            this.page = this.totalPages;
        } else if (this.page < 0) {
            this.page = 1;
        }
        this.reInitializePaginator();
    }

    print() {
        const binaryData = [];
        binaryData.push(this.pdfSrc);
        const blobUrl = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
    }
}
