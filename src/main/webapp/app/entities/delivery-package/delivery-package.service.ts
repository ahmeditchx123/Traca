import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { ITEMS_PER_PAGE } from 'app/shared';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDeliveryPackage, IPdfResponse } from 'app/shared/model/delivery-package.model';
type EntityResponseType = HttpResponse<IDeliveryPackage>;
type EntityArrayResponseType = HttpResponse<IDeliveryPackage[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryPackageService {
    public resourceUrl = SERVER_API_URL + 'api/delivery-packages';
    public onePageresourceUrl = SERVER_API_URL + 'api/delivery-packages/dashboard/' + ITEMS_PER_PAGE;

    public pdfFileGeneratorUrl = SERVER_API_URL + 'api/report/delivery-package';
    changeSubject = new Subject<any>();
    changed = this.changeSubject.asObservable();

    public getPackagesByClientUrl = SERVER_API_URL + 'api/delivery-package/get-by-client-name';
    public filterUrl = SERVER_API_URL + 'api/delivery-packages/status?status=';
    public packagesCountByStatusAndFullNameUrl = SERVER_API_URL + 'api/delivery-package/get-packages-count';
    public filterByClientAndStatusUrl = SERVER_API_URL + 'api/delivery-package/get-by-client-and-status';
    private filterSubject = new Subject<string>();

    constructor(protected http: HttpClient) {}

    create(deliveryPackage: IDeliveryPackage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(deliveryPackage);
        return this.http
            .post<IDeliveryPackage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(deliveryPackage: IDeliveryPackage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(deliveryPackage);
        return this.http
            .put<IDeliveryPackage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDeliveryPackage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findByCode(code: string): Observable<EntityResponseType> {
        return this.http
            .get<IDeliveryPackage>(`${this.resourceUrl}/code/${code}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    getPDf(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.pdfFileGeneratorUrl}/${id}.pdf`, { observe: 'response', responseType: 'arraybuffer' as 'json' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDeliveryPackage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    queryOnePage(): Observable<EntityArrayResponseType> {
        return this.http.get<any>(`${this.onePageresourceUrl}`, { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    filterbyStatus(filterValue: any): Observable<any> {
        return this.http.get(`${this.filterUrl}${filterValue}`);
    }

    filterByClientAndStatus(status: any, firstName: string, lastName: string): Observable<EntityArrayResponseType> {
        return this.http
            .get<IDeliveryPackage[]>(`${this.filterByClientAndStatusUrl}/${status}/${firstName}/${lastName}`, { observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getPackagesByClient(firstName: string, lastName: string): Observable<EntityArrayResponseType> {
        return this.http
            .get<IDeliveryPackage[]>(`${this.getPackagesByClientUrl}/${firstName}/${lastName}`, { observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getAllPackagesCount(firstName: string, lastName: string): Observable<any> {
        return this.http.get<any>(`${this.packagesCountByStatusAndFullNameUrl}/${firstName}/${lastName}`, { observe: 'response' });
    }
    protected convertDateFromClient(deliveryPackage: IDeliveryPackage): IDeliveryPackage {
        const copy: IDeliveryPackage = Object.assign({}, deliveryPackage, {
            creationDate:
                deliveryPackage.creationDate != null && deliveryPackage.creationDate.isValid()
                    ? deliveryPackage.creationDate.toJSON()
                    : null
        });
        return copy;
    }

    getChanged() {
        return this.changeSubject.asObservable();
    }
    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((deliveryPackage: IDeliveryPackage) => {
                deliveryPackage.creationDate = deliveryPackage.creationDate != null ? moment(deliveryPackage.creationDate) : null;
            });
        }
        return res;
    }
    getFilterSubject() {
        return this.filterSubject;
    }
    getFilterObservable() {
        return this.filterSubject.asObservable();
    }
}
