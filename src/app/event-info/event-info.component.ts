import { EventContractService } from './../event-contract.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-event-info',
    templateUrl: './event-info.component.html',
    styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {
    eid: number;
    attendeesNumber: number;
    charged: boolean;
    attendees: string[];
    isOwner: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventContractService: EventContractService,
    ) { }

    async ngOnInit() {
        this.eid = this.activatedRoute.snapshot.params['eid'];
        this.attendeesNumber = await this.eventContractService.getAttendeesNumber(this.eid);
        this.attendees = await this.eventContractService.getAttendees(this.eid);
        this.isOwner = (await this.eventContractService.getEventOwner(this.eid)) === this.eventContractService.accounts[0];
    }

    async charge() {
        await this.eventContractService.charge(this.eid);
        this.charged = true;
    }

    checkin() {
        this.router.navigate(['check-in', this.eid]);
    }

}
