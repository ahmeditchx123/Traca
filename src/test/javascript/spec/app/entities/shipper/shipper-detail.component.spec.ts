/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TracaTestModule } from '../../../test.module';
import { ShipperDetailComponent } from 'app/entities/shipper/shipper-detail.component';
import { Shipper } from 'app/shared/model/shipper.model';

describe('Component Tests', () => {
    describe('Shipper Management Detail Component', () => {
        let comp: ShipperDetailComponent;
        let fixture: ComponentFixture<ShipperDetailComponent>;
        const route = ({ data: of({ shipper: new Shipper(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [ShipperDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ShipperDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShipperDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.shipper).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
