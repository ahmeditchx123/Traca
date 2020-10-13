/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TracaTestModule } from '../../../test.module';
import { DeliveryPackageUpdateComponent } from 'app/entities/delivery-package/delivery-package-update.component';
import { DeliveryPackageService } from 'app/entities/delivery-package/delivery-package.service';
import { DeliveryPackage } from 'app/shared/model/delivery-package.model';

describe('Component Tests', () => {
    describe('DeliveryPackage Management Update Component', () => {
        let comp: DeliveryPackageUpdateComponent;
        let fixture: ComponentFixture<DeliveryPackageUpdateComponent>;
        let service: DeliveryPackageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [DeliveryPackageUpdateComponent]
            })
                .overrideTemplate(DeliveryPackageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DeliveryPackageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryPackageService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new DeliveryPackage(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.deliveryPackage = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new DeliveryPackage();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.deliveryPackage = entity;
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
