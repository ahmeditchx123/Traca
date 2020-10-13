import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { map, share } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITEMS_PER_PAGE } from 'app/shared';

import { IRunSheet } from 'app/shared/model/run-sheet.model';

type EntityResponseType = HttpResponse<IRunSheet>;
type CountEntityResponseType = HttpResponse<Count>;
type EntityArrayResponseType = HttpResponse<IRunSheet[]>;

@Injectable({ providedIn: 'root' })
export class RunSheetService {
    public resourceUrl = SERVER_API_URL + 'api/run-sheets';
    public onePageResourceUrl = SERVER_API_URL + 'api/run-sheets/dashboard/' + ITEMS_PER_PAGE;
    public runsheetPdfUrl = SERVER_API_URL + 'api/report/run-sheet';
    changeSubject = new Subject<any>();
    changed = this.changeSubject.asObservable();

    constructor(protected http: HttpClient) {}

    create(runSheet: IRunSheet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(runSheet);
        return this.http
            .post<IRunSheet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(runSheet: IRunSheet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(runSheet);
        return this.http
            .put<IRunSheet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRunSheet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    getCount(): Observable<CountEntityResponseType> {
        return this.http.get<Count>(SERVER_API_URL + `api/count`, { observe: 'response' }).pipe(map((res: CountEntityResponseType) => res));
    }

    generatePdf(id): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.runsheetPdfUrl}/${id}.pdf`, { observe: 'response', responseType: 'arraybuffer' as 'json' });
    }
    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRunSheet[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    findOnePage(): Observable<EntityArrayResponseType> {
        return this.http.get<any>(`${this.onePageResourceUrl}`, { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(runSheet: IRunSheet): IRunSheet {
        const copy: IRunSheet = Object.assign({}, runSheet, {
            creationDate: runSheet.creationDate != null && runSheet.creationDate.isValid() ? runSheet.creationDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((runSheet: IRunSheet) => {
                runSheet.creationDate = runSheet.creationDate != null ? moment(runSheet.creationDate) : null;
            });
        }
        return res;
    }
}

export class Count {
    public numberRunsheet: number;
    public numberPackage: number;
    public numberSheeper: number;
    public numberDeliveryMan: number;
    public numberNewPackage: number;
    public numberPickedPackage: number;
    public numberDeliveredPackage: number;
    public numberNewRunsheet: number;
    public numberHandledRunsheet: number;
    public numberAffectedRunsheet: number;
}
