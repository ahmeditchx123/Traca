/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TracaTestModule } from '../../../test.module';
import { TransitionHistoryUpdateComponent } from 'app/entities/transition-history/transition-history-update.component';
import { TransitionHistoryService } from 'app/entities/transition-history/transition-history.service';
import { TransitionHistory } from 'app/shared/model/transition-history.model';

describe('Component Tests', () => {
    describe('TransitionHistory Management Update Component', () => {
        let comp: TransitionHistoryUpdateComponent;
        let fixture: ComponentFixture<TransitionHistoryUpdateComponent>;
        let service: TransitionHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [TransitionHistoryUpdateComponent]
            })
                .overrideTemplate(TransitionHistoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransitionHistoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransitionHistoryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TransitionHistory(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.transitionHistory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TransitionHistory();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.transitionHistory = entity;
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
