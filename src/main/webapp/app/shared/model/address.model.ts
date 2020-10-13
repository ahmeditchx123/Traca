export interface IAddress {
    id?: number;
    line1?: string;
    line2?: string;
    city?: string;
    postalCode?: string;
    lat?: number;
    lon?: number;
}

export class Address implements IAddress {
    constructor(
        public id?: number,
        public line1?: string,
        public line2?: string,
        public city?: string,
        public postalCode?: string,
        public lat?: number,
        public lon?: number
    ) {}
}
