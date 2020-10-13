import { Moment } from 'moment';
import { IShipper } from 'app/shared/model/shipper.model';
import { IAddress } from 'app/shared/model/address.model';
import { IRunSheet } from 'app/shared/model/run-sheet.model';

export const enum DeliveryPackageStatus {
    NEW = 'NEW',
    TO_DELIVER = 'TO_DELIVER',
    PICKED = 'PICKED',
    DELIVERED = 'DELIVERED',
    REFUSED = 'REFUSED',
    NA = 'NA'
}

export const enum Fragility {
    FRAGILE = 'FRAGILE',
    NOT_FRAGILE = 'NOT_FRAGILE'
}

export interface IPdfResponse {
    pdfEncoded: string;
}

export interface IDeliveryPackage {
    id?: number;
    code?: string;
    price?: number;
    receiverFirstName?: string;
    receiverLastName?: string;
    receiverPhone?: number;
    status?: DeliveryPackageStatus;
    creationDate?: Moment;
    height?: number;
    width?: number;
    weight?: number;
    fragility?: Fragility;
    addressId?: number;
    shipperId?: number;
    runSheetId?: number;
    runSheet?: IRunSheet;
    shipper?: IShipper;
    address?: IAddress;
}

export class DeliveryPackage implements IDeliveryPackage {
    constructor(
        public id?: number,
        public code?: string,
        public receiverFirstName?: string,
        public receiverLastName?: string,
        public receiverPhone?: number,
        public status?: DeliveryPackageStatus,
        public creationDate?: Moment,
        public height?: number,
        public width?: number,
        public weight?: number,
        public fragility?: Fragility,
        public addressId?: number,
        public shipperId?: number,
        public runSheetId?: number,
        public shipper?: IShipper,
        public address?: IAddress,
        public runSheet?: IRunSheet
    ) {}
}
