import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedDataService } from 'app/shared/sharedData.service';
import { TracaSharedModule } from 'app/shared';
import {
    RunSheetComponent,
    RunSheetDetailComponent,
    RunSheetUpdateComponent,
    RunSheetDeletePopupComponent,
    RunSheetDeleteDialogComponent,
    runSheetRoute,
    runSheetPopupRoute
} from './';

const ENTITY_STATES = [...runSheetRoute, ...runSheetPopupRoute];

@NgModule({
    imports: [TracaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RunSheetComponent,
        RunSheetDetailComponent,
        RunSheetUpdateComponent,
        RunSheetDeleteDialogComponent,
        RunSheetDeletePopupComponent
    ],
    entryComponents: [RunSheetComponent, RunSheetUpdateComponent, RunSheetDeleteDialogComponent, RunSheetDeletePopupComponent],
    providers: [SharedDataService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TracaRunSheetModule {}
