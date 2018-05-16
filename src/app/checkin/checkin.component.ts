import { EventContractService } from './../event-contract.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare var Instascan: any;

@Component({
    selector: 'app-checkin',
    templateUrl: './checkin.component.html',
    styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
    eid: number;
    confirmed: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private eventContractService: EventContractService,
    ) { }

    ngOnInit() {
        this.eid = this.activatedRoute.snapshot.params['eid'];
        const scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
        scanner.addListener('scan', content => this.checkin(content));
        Instascan.Camera.getCameras()
            .then(function (cameras) {
                if (cameras.length > 0) {
                    scanner.start(cameras[0]);
                } else {
                    console.error('No cameras found.');
                }
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    async checkin(attendeeWallet: string) {
        try {
            await this.eventContractService.checkin(this.eid, attendeeWallet);
            this.confirmed = true;
            setTimeout(() => this.confirmed = false, 1000);
        } catch (err) {
            console.log('err', err);
        }
    }

}
