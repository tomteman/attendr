import { EventContractService } from './../event-contract.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
    eventId: number;
    origin = location.origin;
    loading: boolean;

    constructor(
        private eventContractService: EventContractService,
    ) { }

    ngOnInit() {
    }

    async create(address: string, amount: string) {
        this.loading = true;
        this.eventId = await this.eventContractService.createEvent(address, Number(amount));
        this.loading = false;
    }

}
