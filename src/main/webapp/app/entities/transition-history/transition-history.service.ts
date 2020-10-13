import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransitionHistory } from 'app/shared/model/transition-history.model';

type EntityResponseType = HttpResponse<ITransitionHistory>;
type EntityArrayResponseType = HttpResponse<ITransitionHistory[]>;

@Injectable({ providedIn: 'root' })
export class TransitionHistoryService {
    public resourceUrl = SERVER_API_URL + 'api/transition-histories';

    constructor(protected http: HttpClient) {}

    create(transitionHistory: ITransitionHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transitionHistory);
        return this.http
            .post<ITransitionHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(transitionHistory: ITransitionHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transitionHistory);
        return this.http
            .put<ITransitionHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITransitionHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITransitionHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(transitionHistory: ITransitionHistory): ITransitionHistory {
        const copy: ITransitionHistory = Object.assign({}, transitionHistory, {
            transitionDate:
                transitionHistory.transitionDate != null && transitionHistory.transitionDate.isValid()
                    ? transitionHistory.transitionDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.transitionDate = res.body.transitionDate != null ? moment(res.body.transitionDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((transitionHistory: ITransitionHistory) => {
                transitionHistory.transitionDate =
                    transitionHistory.transitionDate != null ? moment(transitionHistory.transitionDate) : null;
            });
        }
        return res;
    }
}
