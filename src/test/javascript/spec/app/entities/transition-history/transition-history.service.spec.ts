/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TransitionHistoryService } from 'app/entities/transition-history/transition-history.service';
import { ITransitionHistory, TransitionHistory, DeliveryPackageStatus } from 'app/shared/model/transition-history.model';

describe('Service Tests', () => {
    describe('TransitionHistory Service', () => {
        let injector: TestBed;
        let service: TransitionHistoryService;
        let httpMock: HttpTestingController;
        let elemDefault: ITransitionHistory;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(TransitionHistoryService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new TransitionHistory(0, currentDate, DeliveryPackageStatus.NEW, DeliveryPackageStatus.NEW);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        transitionDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a TransitionHistory', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        transitionDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        transitionDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new TransitionHistory(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a TransitionHistory', async () => {
                const returnedFromService = Object.assign(
                    {
                        transitionDate: currentDate.format(DATE_TIME_FORMAT),
                        fromStatus: 'BBBBBB',
                        toStatus: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        transitionDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of TransitionHistory', async () => {
                const returnedFromService = Object.assign(
                    {
                        transitionDate: currentDate.format(DATE_TIME_FORMAT),
                        fromStatus: 'BBBBBB',
                        toStatus: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        transitionDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a TransitionHistory', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
