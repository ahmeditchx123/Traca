import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransitionHistory } from 'app/shared/model/transition-history.model';

@Component({
    selector: 'jhi-transition-history-detail',
    templateUrl: './transition-history-detail.component.html'
})
export class TransitionHistoryDetailComponent implements OnInit {
    transitionHistory: ITransitionHistory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transitionHistory }) => {
            this.transitionHistory = transitionHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
