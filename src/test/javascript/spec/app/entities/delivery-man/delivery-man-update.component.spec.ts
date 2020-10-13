/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TracaTestModule } from '../../../test.module';
import { DeliveryManUpdateComponent } from 'app/entities/delivery-man/delivery-man-update.component';
import { DeliveryManService } from 'app/entities/delivery-man/delivery-man.service';
import { DeliveryMan } from 'app/shared/model/delivery-man.model';

describe('Component Tests', () => {
    describe('DeliveryMan Management Update Component', () => {
        let comp: DeliveryManUpdateComponent;
        let fixture: ComponentFixture<DeliveryManUpdateComponent>;
        let service: DeliveryManService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [DeliveryManUpdateComponent]
            })
                .overrideTemplate(DeliveryManUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DeliveryManUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryManService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new DeliveryMan(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.deliveryMan = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new DeliveryMan();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.deliveryMan = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
