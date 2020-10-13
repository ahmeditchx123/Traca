import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShipper } from 'app/shared/model/shipper.model';

@Component({
    selector: 'jhi-shipper-detail',
    templateUrl: './shipper-detail.component.html'
})
export class ShipperDetailComponent implements OnInit {
    shipper: IShipper;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shipper }) => {
            this.shipper = shipper;
        });
    }

    previousState() {
        window.history.back();
    }
}
