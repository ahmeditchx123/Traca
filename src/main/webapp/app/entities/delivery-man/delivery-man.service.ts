import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { map, share } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDeliveryMan } from 'app/shared/model/delivery-man.model';

type EntityResponseType = HttpResponse<IDeliveryMan>;
type EntityArrayResponseType = HttpResponse<IDeliveryMan[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryManService {
    public resourceUrl = SERVER_API_URL + 'api/delivery-men';
    changeSubject = new Subject<any>();
    changed = this.changeSubject.asObservable();

    constructor(protected http: HttpClient) {}

    create(deliveryMan: IDeliveryMan): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(deliveryMan);
        return this.http
            .post<IDeliveryMan>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(deliveryMan: IDeliveryMan): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(deliveryMan);
        return this.http
            .put<IDeliveryMan>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDeliveryMan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDeliveryMan[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(deliveryMan: IDeliveryMan): IDeliveryMan {
        const copy: IDeliveryMan = Object.assign({}, deliveryMan, {
            hireDate: deliveryMan.hireDate != null && deliveryMan.hireDate.isValid() ? deliveryMan.hireDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.hireDate = res.body.hireDate != null ? moment(res.body.hireDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((deliveryMan: IDeliveryMan) => {
                deliveryMan.hireDate = deliveryMan.hireDate != null ? moment(deliveryMan.hireDate) : null;
            });
        }
        return res;
    }
}
