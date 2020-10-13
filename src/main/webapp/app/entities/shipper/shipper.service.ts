import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShipper } from 'app/shared/model/shipper.model';
import { share } from 'rxjs/operators';

type EntityResponseType = HttpResponse<IShipper>;
type EntityArrayResponseType = HttpResponse<IShipper[]>;

@Injectable({ providedIn: 'root' })
export class ShipperService {
    public resourceUrl = SERVER_API_URL + 'api/shippers';
    changeSubject = new Subject<any>();
    changed = this.changeSubject.asObservable();

    deletedShipper = new Subject<boolean>();
    deleted = this.deletedShipper.asObservable().pipe(share());

    constructor(protected http: HttpClient) {}

    create(shipper: IShipper): Observable<EntityResponseType> {
        return this.http.post<IShipper>(this.resourceUrl, shipper, { observe: 'response' });
    }

    update(shipper: IShipper): Observable<EntityResponseType> {
        return this.http.put<IShipper>(this.resourceUrl, shipper, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IShipper>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IShipper[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
