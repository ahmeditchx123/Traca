import { Moment } from 'moment';

export const enum DeliveryPackageStatus {
    NEW = 'NEW',
    TO_DELIVER = 'TO_DELIVER',
    PICKED = 'PICKED',
    DELIVERED = 'DELIVERED',
    REFUSED = 'REFUSED',
    NA = 'NA'
}

export interface ITransitionHistory {
    id?: number;
    transitionDate?: Moment;
    fromStatus?: DeliveryPackageStatus;
    toStatus?: DeliveryPackageStatus;
}

export class TransitionHistory implements ITransitionHistory {
    constructor(
        public id?: number,
        public transitionDate?: Moment,
        public fromStatus?: DeliveryPackageStatus,
        public toStatus?: DeliveryPackageStatus
    ) {}
}
