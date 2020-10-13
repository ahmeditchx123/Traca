import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ITransitionHistory } from 'app/shared/model/transition-history.model';
import { TransitionHistoryService } from './transition-history.service';

@Component({
    selector: 'jhi-transition-history-update',
    templateUrl: './transition-history-update.component.html'
})
export class TransitionHistoryUpdateComponent implements OnInit {
    transitionHistory: ITransitionHistory;
    isSaving: boolean;
    transitionDate: string;

    constructor(protected transitionHistoryService: TransitionHistoryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transitionHistory }) => {
            this.transitionHistory = transitionHistory;
            this.transitionDate =
                this.transitionHistory.transitionDate != null ? this.transitionHistory.transitionDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.transitionHistory.transitionDate = this.transitionDate != null ? moment(this.transitionDate, DATE_TIME_FORMAT) : null;
        if (this.transitionHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.transitionHistoryService.update(this.transitionHistory));
        } else {
            this.subscribeToSaveResponse(this.transitionHistoryService.create(this.transitionHistory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransitionHistory>>) {
        result.subscribe((res: HttpResponse<ITransitionHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
