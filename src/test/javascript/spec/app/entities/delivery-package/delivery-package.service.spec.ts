/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DeliveryPackageService } from 'app/entities/delivery-package/delivery-package.service';
import { IDeliveryPackage, DeliveryPackage, DeliveryPackageStatus, Fragility } from 'app/shared/model/delivery-package.model';

describe('Service Tests', () => {
    describe('DeliveryPackage Service', () => {
        let injector: TestBed;
        let service: DeliveryPackageService;
        let httpMock: HttpTestingController;
        let elemDefault: IDeliveryPackage;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DeliveryPackageService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new DeliveryPackage(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                0,
                DeliveryPackageStatus.NEW,
                currentDate,
                0,
                0,
                0,
                Fragility.FRAGILE
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        creationDate: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a DeliveryPackage', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        creationDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        creationDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new DeliveryPackage(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a DeliveryPackage', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        receiverFirstName: 'BBBBBB',
                        receiverLastName: 'BBBBBB',
                        receiverPhone: 1,
                        status: 'BBBBBB',
                        creationDate: currentDate.format(DATE_TIME_FORMAT),
                        height: 1,
                        width: 1,
                        weight: 1,
                        fragility: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        creationDate: currentDate
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

            it('should return a list of DeliveryPackage', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        receiverFirstName: 'BBBBBB',
                        receiverLastName: 'BBBBBB',
                        receiverPhone: 1,
                        status: 'BBBBBB',
                        creationDate: currentDate.format(DATE_TIME_FORMAT),
                        height: 1,
                        width: 1,
                        weight: 1,
                        fragility: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        creationDate: currentDate
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

            it('should delete a DeliveryPackage', async () => {
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
