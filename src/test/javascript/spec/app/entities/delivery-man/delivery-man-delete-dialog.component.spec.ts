/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TracaTestModule } from '../../../test.module';
import { DeliveryManDeleteDialogComponent } from 'app/entities/delivery-man/delivery-man-delete-dialog.component';
import { DeliveryManService } from 'app/entities/delivery-man/delivery-man.service';

describe('Component Tests', () => {
    describe('DeliveryMan Management Delete Component', () => {
        let comp: DeliveryManDeleteDialogComponent;
        let fixture: ComponentFixture<DeliveryManDeleteDialogComponent>;
        let service: DeliveryManService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [DeliveryManDeleteDialogComponent]
            })
                .overrideTemplate(DeliveryManDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DeliveryManDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryManService);
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
