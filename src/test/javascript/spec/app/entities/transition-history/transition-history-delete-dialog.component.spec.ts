/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TracaTestModule } from '../../../test.module';
import { TransitionHistoryDeleteDialogComponent } from 'app/entities/transition-history/transition-history-delete-dialog.component';
import { TransitionHistoryService } from 'app/entities/transition-history/transition-history.service';

describe('Component Tests', () => {
    describe('TransitionHistory Management Delete Component', () => {
        let comp: TransitionHistoryDeleteDialogComponent;
        let fixture: ComponentFixture<TransitionHistoryDeleteDialogComponent>;
        let service: TransitionHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [TransitionHistoryDeleteDialogComponent]
            })
                .overrideTemplate(TransitionHistoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransitionHistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransitionHistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
