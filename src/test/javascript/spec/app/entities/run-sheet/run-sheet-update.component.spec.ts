/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TracaTestModule } from '../../../test.module';
import { RunSheetUpdateComponent } from 'app/entities/run-sheet/run-sheet-update.component';
import { RunSheetService } from 'app/entities/run-sheet/run-sheet.service';
import { RunSheet } from 'app/shared/model/run-sheet.model';

describe('Component Tests', () => {
    describe('RunSheet Management Update Component', () => {
        let comp: RunSheetUpdateComponent;
        let fixture: ComponentFixture<RunSheetUpdateComponent>;
        let service: RunSheetService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TracaTestModule],
                declarations: [RunSheetUpdateComponent]
            })
                .overrideTemplate(RunSheetUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RunSheetUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RunSheetService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new RunSheet(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.runSheet = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new RunSheet();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.runSheet = entity;
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
