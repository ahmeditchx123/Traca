import { Moment } from 'moment';
import { IRunSheet } from 'app/shared/model/run-sheet.model';

export interface IDeliveryMan {
    id?: number;
    code?: string;
    firstName?: string;
    lastName?: string;
    firstPhone?: number;
    secondPhone?: number;
    hireDate?: Moment;
    runSheets?: IRunSheet[];
}

export class DeliveryMan implements IDeliveryMan {
    constructor(
        public id?: number,
        public code?: string,
        public firstName?: string,
        public lastName?: string,
        public firstPhone?: number,
        public secondPhone?: number,
        public hireDate?: Moment,
        public runSheets?: IRunSheet[]
    ) {}
}
