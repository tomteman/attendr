import { EventContractService } from './../event-contract.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var QRCode: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    eid: number;
    confirmed: boolean;
    wallet: string;
    loading: boolean;
    depositAmount: number;
    ethPrice: any;
    ethInUSD: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private eventContractService: EventContractService,
        private http: HttpClient
    ) { }

    async ngOnInit() {
        this.eid = this.activatedRoute.snapshot.params['eid'];
        this.depositAmount = await this.eventContractService.getEventDepositAmount(this.eid)
        this.getEthPriceUSD();
    }

    getEthPriceUSD() {
      this.http.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD").subscribe(result => {
          this.ethPrice = result;
          this.ethInUSD = +((this.ethPrice.USD*this.depositAmount).toFixed(2));
      });
    }

    async register(name: string) {
        this.loading = true;
        await this.eventContractService.registerToEvent(this.eid, name);
        this.loading = false;
        this.wallet = this.eventContractService.accounts[0];
        this.confirmed = true;
        setTimeout(() => new QRCode(document.getElementById('qrcode'), this.wallet), 300);
    }

}
