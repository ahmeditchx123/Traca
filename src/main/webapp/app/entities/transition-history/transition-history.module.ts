import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TracaSharedModule } from 'app/shared';
import {
    TransitionHistoryComponent,
    TransitionHistoryDetailComponent,
    TransitionHistoryUpdateComponent,
    TransitionHistoryDeletePopupComponent,
    TransitionHistoryDeleteDialogComponent,
    transitionHistoryRoute,
    transitionHistoryPopupRoute
} from './';

const ENTITY_STATES = [...transitionHistoryRoute, ...transitionHistoryPopupRoute];

@NgModule({
    imports: [TracaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransitionHistoryComponent,
        TransitionHistoryDetailComponent,
        TransitionHistoryUpdateComponent,
        TransitionHistoryDeleteDialogComponent,
        TransitionHistoryDeletePopupComponent
    ],
    entryComponents: [
        TransitionHistoryComponent,
        TransitionHistoryUpdateComponent,
        TransitionHistoryDeleteDialogComponent,
        TransitionHistoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TracaTransitionHistoryModule {}
