import { EventContractService } from './../event-contract.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare var QRCode: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    eid: string;
    confirmed: boolean;
    wallet: string;
    loading: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private eventContractService: EventContractService,
    ) { }

    async ngOnInit() {
        this.eid = this.activatedRoute.snapshot.params['eid'];
    }

    async register() {
        this.loading = true;
        await this.eventContractService.registerToEvent(this.eid);
        this.loading = false;
        this.wallet = this.eventContractService.accounts[0];
        this.confirmed = true;
        setTimeout(() => new QRCode(document.getElementById('qrcode'), this.wallet), 300);
    }

}
