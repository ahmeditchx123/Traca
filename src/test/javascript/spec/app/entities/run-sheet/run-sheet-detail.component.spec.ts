/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TracaTestModule } from '../../../test.module';
import { RunSheetDetailComponent } from 'app/entities/run-sheet/run-sheet-detail.component';
import { RunSheet } from 'app/shared/model/run-sheet.model';

describe('Component Tests', () => {
    describe('RunSheet Management Detail Component', () => {
        let comp: RunSheetDetailComponent;
        let fixture: ComponentFixture<RunSheetDetailComponent>;
        const route = ({ data: of({ runSheet: new RunSheet(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [RunSheetDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RunSheetDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RunSheetDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.runSheet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
