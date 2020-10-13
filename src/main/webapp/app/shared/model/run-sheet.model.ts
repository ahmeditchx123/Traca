import { Moment } from 'moment';
import { IDeliveryPackage } from 'app/shared/model/delivery-package.model';
import { IDeliveryMan } from 'app/shared/model/delivery-man.model';

export const enum RunSheetStatut {
    NEW = 'NEW',
    AFFECTED = 'AFFECTED',
    HANDLED = 'HANDLED'
}
export const enum Actions {
    ADD = 'ADD',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    FAIL_ADD = 'FAIL_ADD',
    FAIL_UPDATE = 'FAIL_UPDATE',
    FAIL_DELETE = 'FAIL_DELETE'
}
export interface IRunSheet {
    id?: number;
    code?: string;
    totalPrice?: number;
    creationDate?: Moment;
    status?: RunSheetStatut;
    deliveryManId?: number;
    deliveryMan?: IDeliveryMan;
    deliveryPackages?: IDeliveryPackage[];
}

export class RunSheet implements IRunSheet {
    constructor(
        public id?: number,
        public code?: string,
        public creationDate?: Moment,
        public status?: RunSheetStatut,
        public deliveryManId?: number,
        public totalPrice?: number,
        public deliveryMan?: IDeliveryMan,
        public deliveryPackages?: IDeliveryPackage[]
    ) {}
}
