import { Injectable } from '@angular/core';
const EventContract = require('../../build/contracts/Event.json');
const EventStorageContract = require('../../build/contracts/EventStorage.json');
import * as getWeb3 from '../utils/getWeb3';
import * as contract from 'truffle-contract';

@Injectable()
export class EventContractService {
    web3: any = getWeb3.web3;
    accounts: string[];
    _eventStorageInstance: any;
    _event: any;

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

    async eventInstance(eid: string) {
        if (!this._event) {
            this._event = contract(EventContract);
            this._event.setProvider(this.web3.currentProvider);
        }

        return Promise.resolve(this._event.at(eid));
    }

    async createEvent(charityAddress: string, amount: number) {
        return (await (await this.eventStorageInstance()).createEvent(charityAddress, this.web3.toWei(amount, 'ether'), { from: this.accounts[0] })).c[0];
    }

    async getEventDepositAmount(eid: string) {
        return (await (await this.eventInstance(eid)).getEventDepositAmount()).c[0];
    }

    async getAttendeesNumber(eid: string) {
        return (await (await this.eventInstance(eid)).getAttendeesNumber()).c[0];
    }

    async getAttendees(eid: string) {
        return (await (await this.eventInstance(eid)).getAttendees());
    }

    async getEventOwner(eid: string) {
        return await (await this.eventInstance(eid)).getEventOwner();
    }

    async getCharityAmount(eid: string) {
        return (await (await this.eventInstance(eid)).getCharity()).c[0];
    }

    async registerToEvent(eid: string) {
        const deposit = await this.getEventDepositAmount(eid);
        return await (await this.eventInstance(eid)).registerToEvent({ from: this.accounts[0], value: deposit });
    }

    async checkin(eid: string, attendeeWallet: string) {
        return await (await this.eventInstance(eid)).checkin(attendeeWallet, { from: this.accounts[0] });
    }

    async charge(eid: string) {
        return await (await this.eventInstance(eid)).charge({ from: this.accounts[0] });
    }

    getAccounts(web3) {
        return new Promise((resolve, reject) => {
            web3.eth.getAccounts((error, accounts) => error ? reject(error) : resolve(accounts));
        });
    }
}
