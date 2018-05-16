pragma solidity ^0.4.2;

contract EventStorage {
    uint eventsCount;
    mapping (uint => Event) events;

    struct Event {
        address owner;
        address charity;
        uint deposit;
        Attendee[] attendees;
    }

    struct Attendee {
        address wallet;
        bytes32 name;
        bool attended;
    }

    function getBalance() constant returns (uint) {
        return this.balance;
    }

    function getCharity(uint id) constant returns (address) {
        return events[id].charity;
    }

    function createEvent(address charity, uint deposit) returns (uint) {
        eventsCount++;
        events[eventsCount].owner = msg.sender;
        events[eventsCount].charity = charity;
        events[eventsCount].deposit = deposit;
        return eventsCount;
    }

    function getEventsCount() constant returns  (uint) {
        return eventsCount;
    }

    function getEventDepositAmount(uint id) constant returns  (uint) {
        return events[id].deposit;
    }

    function registerToEvent(uint id, bytes32 name) payable {
        if (msg.value < events[id].deposit) {
            return;
        }
        events[id].attendees.push(Attendee({ wallet: msg.sender, name: name, attended: false }));
    }

    function getAttendeesNumber(uint id) constant returns (uint) {
        return events[id].attendees.length;
    }

    function getEventOwner(uint id) constant returns (address) {
        return events[id].owner;
    }

    function getAttendees(uint id) constant returns (bytes32[]) {
        bytes32[] memory result = new bytes32[](events[id].attendees.length);

        for (uint i = 0; i < events[id].attendees.length; i++) {
            result[i] = (events[id].attendees[i].name);
        }

        return result;
    }

    function checkin(uint id, address attendeeWallet) {
        if (msg.sender != events[id].owner) {
            return;
        }

        bool stop;
        for (uint i = 0; i < events[id].attendees.length && !stop; i++) {
            if (events[id].attendees[i].wallet == attendeeWallet && !events[id].attendees[i].attended) {
                events[id].attendees[i].attended = true;
                attendeeWallet.transfer(events[id].deposit * 1 ether);
                stop = true;
            }
        }
    }

    function charge(uint id) {
        if (msg.sender != events[id].owner) {
            return;
        }

        uint amount = 0;

        for (uint i = 0; i < events[id].attendees.length; i++) {
            if (!events[id].attendees[i].attended) {
                amount = amount + events[id].deposit;
            }
        }

        events[id].charity.transfer(amount * 1 ether);
    }
}
