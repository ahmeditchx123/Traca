/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DeliveryManService } from 'app/entities/delivery-man/delivery-man.service';
import { IDeliveryMan, DeliveryMan } from 'app/shared/model/delivery-man.model';

describe('Service Tests', () => {
    describe('DeliveryMan Service', () => {
        let injector: TestBed;
        let service: DeliveryManService;
        let httpMock: HttpTestingController;
        let elemDefault: IDeliveryMan;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DeliveryManService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new DeliveryMan(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 0, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        hireDate: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a DeliveryMan', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        hireDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        hireDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new DeliveryMan(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a DeliveryMan', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        firstPhone: 1,
                        secondPhone: 1,
                        hireDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        hireDate: currentDate
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

            it('should return a list of DeliveryMan', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        firstPhone: 1,
                        secondPhone: 1,
                        hireDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        hireDate: currentDate
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

            it('should delete a DeliveryMan', async () => {
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
