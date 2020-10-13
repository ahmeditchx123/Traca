/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TracaTestModule } from '../../../test.module';
import { ShipperUpdateComponent } from 'app/entities/shipper/shipper-update.component';
import { ShipperService } from 'app/entities/shipper/shipper.service';
import { Shipper } from 'app/shared/model/shipper.model';

describe('Component Tests', () => {
    describe('Shipper Management Update Component', () => {
        let comp: ShipperUpdateComponent;
        let fixture: ComponentFixture<ShipperUpdateComponent>;
        let service: ShipperService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [ShipperUpdateComponent]
            })
                .overrideTemplate(ShipperUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ShipperUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShipperService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Shipper(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.shipper = entity;
                // WHEN
                //comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Shipper();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.shipper = entity;
                // WHEN
                // comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
