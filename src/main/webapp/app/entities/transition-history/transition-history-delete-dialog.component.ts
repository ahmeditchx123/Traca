import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransitionHistory } from 'app/shared/model/transition-history.model';
import { TransitionHistoryService } from './transition-history.service';

@Component({
    selector: 'jhi-transition-history-delete-dialog',
    templateUrl: './transition-history-delete-dialog.component.html'
})
export class TransitionHistoryDeleteDialogComponent {
    transitionHistory: ITransitionHistory;

    constructor(
        protected transitionHistoryService: TransitionHistoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transitionHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transitionHistoryListModification',
                content: 'Deleted an transitionHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transition-history-delete-popup',
    template: ''
})
export class TransitionHistoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transitionHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransitionHistoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transitionHistory = transitionHistory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/transition-history', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/transition-history', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
