/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TracaTestModule } from '../../../test.module';
import { RunSheetDeleteDialogComponent } from 'app/entities/run-sheet/run-sheet-delete-dialog.component';
import { RunSheetService } from 'app/entities/run-sheet/run-sheet.service';

describe('Component Tests', () => {
    describe('RunSheet Management Delete Component', () => {
        let comp: RunSheetDeleteDialogComponent;
        let fixture: ComponentFixture<RunSheetDeleteDialogComponent>;
        let service: RunSheetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [RunSheetDeleteDialogComponent]
            })
                .overrideTemplate(RunSheetDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RunSheetDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RunSheetService);
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
