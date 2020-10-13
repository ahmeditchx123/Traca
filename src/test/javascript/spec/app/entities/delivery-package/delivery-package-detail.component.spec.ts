/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TracaTestModule } from '../../../test.module';
import { DeliveryPackageDetailComponent } from 'app/entities/delivery-package/delivery-package-detail.component';
import { DeliveryPackage } from 'app/shared/model/delivery-package.model';

describe('Component Tests', () => {
    describe('DeliveryPackage Management Detail Component', () => {
        let comp: DeliveryPackageDetailComponent;
        let fixture: ComponentFixture<DeliveryPackageDetailComponent>;
        const route = ({ data: of({ deliveryPackage: new DeliveryPackage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [DeliveryPackageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DeliveryPackageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DeliveryPackageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.deliveryPackage).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
