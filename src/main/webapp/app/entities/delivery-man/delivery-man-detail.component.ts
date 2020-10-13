import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryMan } from 'app/shared/model/delivery-man.model';

@Component({
    selector: 'jhi-delivery-man-detail',
    templateUrl: './delivery-man-detail.component.html'
})
export class DeliveryManDetailComponent implements OnInit {
    deliveryMan: IDeliveryMan;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deliveryMan }) => {
            this.deliveryMan = deliveryMan;
        });
    }

    previousState() {
        window.history.back();
    }
}
