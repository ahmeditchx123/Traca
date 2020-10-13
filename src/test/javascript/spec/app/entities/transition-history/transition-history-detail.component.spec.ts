/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TracaTestModule } from '../../../test.module';
import { TransitionHistoryDetailComponent } from 'app/entities/transition-history/transition-history-detail.component';
import { TransitionHistory } from 'app/shared/model/transition-history.model';

describe('Component Tests', () => {
    describe('TransitionHistory Management Detail Component', () => {
        let comp: TransitionHistoryDetailComponent;
        let fixture: ComponentFixture<TransitionHistoryDetailComponent>;
        const route = ({ data: of({ transitionHistory: new TransitionHistory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [TransitionHistoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransitionHistoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransitionHistoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transitionHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
