import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IRunSheet } from 'app/shared/model/run-sheet.model';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { IDeliveryMan } from 'app/shared/model/delivery-man.model';
import { IShipper } from 'app/shared/model/shipper.model';

export interface RunsheetObservable {
    actionType?: string;
    value?: boolean;
    runSheet?: IRunSheet;
}
export interface DeliveryPackageObservable {
    actionType?: string;
    value?: boolean;
    deliveryPackage?: IDeliveryPackage;
}

export interface LivreurObservable {
    actionType?: string;
    value?: boolean;
    livreur: IDeliveryMan;
}
export interface ShipperObservable {
    actionType?: string;
    value?: boolean;
    shipper: IShipper;
}
@Injectable({ providedIn: 'root' })
export class SharedDataService {
    private addRunsheet = new Subject<RunsheetObservable>();
    private addPackage = new Subject<DeliveryPackageObservable>();
    private addLivreur = new Subject<LivreurObservable>();
    private addShipper = new Subject<ShipperObservable>();

    runsheetEvent(value: RunsheetObservable) {
        this.addRunsheet.next(value);
    }

    clear() {
        this.addRunsheet.next();
    }

    getEvent(): Observable<RunsheetObservable> {
        return this.addRunsheet.asObservable();
    }

    deliveryPackageEvent(value: DeliveryPackageObservable) {
        this.addPackage.next(value);
    }

    clearEvent() {
        this.addPackage.next();
    }

    getDeliveryPackageEvent(): Observable<DeliveryPackageObservable> {
        return this.addPackage.asObservable();
    }

    livreurEvent(value: LivreurObservable) {
        console.log(value);
        this.addLivreur.next(value);
    }

    clearLivreurEvent() {
        this.addLivreur.next();
    }

    getLivreurEvent(): Observable<LivreurObservable> {
        return this.addLivreur.asObservable();
    }

    shipperEvent(value: ShipperObservable) {
        this.addShipper.next(value);
    }

    clearShipperEvent() {
        this.addShipper.next();
    }

    getShipperEvent(): Observable<ShipperObservable> {
        return this.addShipper.asObservable();
    }
}
