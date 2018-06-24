import { EventContractService } from './../event-contract.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit {
    eventId: string;
    origin = location.origin;
    loading: boolean;
    startingVal = .001;
    ethPrice: any;
    ethInUSD: number;

    constructor(
        private eventContractService: EventContractService, private http: HttpClient
    ) { }

    ngOnInit() {
        this.getEthPriceUSD();
    }

    getEthPriceUSD() {
      this.http.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD").subscribe(result => {
          this.ethPrice = result;
          this.changeAmount(this.startingVal);
      });
    }

    changeAmount(amount) {
        this.ethInUSD = +((this.ethPrice.USD*amount).toFixed(2));
    }

    async create(address: string, amount: string, date: string) {
        this.loading = true;
        this.eventId = await this.eventContractService.createEvent(address, Number(amount), new Date(date).valueOf()/1000);
        this.loading = false;
    }

}
