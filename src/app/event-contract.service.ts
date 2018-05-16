import { Injectable } from '@angular/core';
const EventStorageContract = require('../../build/contracts/EventStorage.json');
import * as getWeb3 from '../utils/getWeb3';
import * as contract from 'truffle-contract';

@Injectable()
export class EventContractService {
    web3: any = getWeb3.web3;
    accounts: string[];
    _eventStorageInstance: any;

    constructor() {
    }

    async eventStorageInstance() {
        if (!this._eventStorageInstance) {
            const eventStorage = contract(EventStorageContract);
            eventStorage.setProvider(this.web3.currentProvider);
            this.accounts = await this.getAccounts(this.web3) as any;
            this._eventStorageInstance = await eventStorage.deployed();
        }

        return Promise.resolve(this._eventStorageInstance);
    }

    async createEvent(charityAddress: string, amount: number) {
        await (await this.eventStorageInstance()).createEvent(charityAddress, amount, { from: this.accounts[0] });
        return (await (await this.eventStorageInstance()).getEventsCount()).c[0];
    }

    async getEventDepositAmount(eid: number) {
        return (await (await this.eventStorageInstance()).getEventDepositAmount(eid)).c[0];
    }

    async getAttendeesNumber(eid: number) {
        return (await (await this.eventStorageInstance()).getAttendeesNumber(eid)).c[0];
    }

    async getAttendees(eid: number) {
        const result = await (await this.eventStorageInstance()).getAttendees(eid);

        return result.map(r => this.hex2a(r));
    }

    private hex2a(hexx) {
        const hex = hexx.toString();
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    }

    async getEventOwner(eid: number) {
        return await (await this.eventStorageInstance()).getEventOwner(eid);
    }

    async getCharityAmount(eid: number) {
        return (await (await this.eventStorageInstance()).getCharity(eid)).c[0];
    }

    async registerToEvent(eid: number, name: string) {
        const deposit = await this.getEventDepositAmount(eid);
        return await (await this.eventStorageInstance()).registerToEvent(eid, name, { from: this.accounts[0], value: this.web3.toWei(deposit, 'ether') });
    }

    async checkin(eid: number, attendeeWallet: string) {
        return await (await this.eventStorageInstance()).checkin(eid, attendeeWallet, { from: this.accounts[0] });
    }

    async charge(eid: number) {
        return await (await this.eventStorageInstance()).charge(eid, { from: this.accounts[0] });
    }

    getAccounts(web3) {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts((error, accounts) => error ? reject(error) : resolve(accounts));
        });
    }
}
