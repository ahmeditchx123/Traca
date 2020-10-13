import { IUser } from 'app/core';
import { IAddress } from 'app/shared/model/address.model';

export interface IShipper extends IUser {
    id?: number;
    firstPhone?: number;
    secondPhone?: number;
    addressId?: number;
    address?: IAddress;
}

export class Shipper implements IShipper, IUser {
    constructor(
        public id?: number,
        public firstPhone?: number,
        public secondPhone?: number,
        public addressId?: number,
        public login?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public activated?: boolean,
        public langKey?: string,
        public authorities?: any[],
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
        public password?: string,
        public address?: IAddress
    ) {}
}
