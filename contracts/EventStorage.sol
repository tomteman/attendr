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

    function registerToEvent(uint id) payable {
        assert(msg.value >= events[id].deposit);
        events[id].attendees.push(Attendee({ wallet: msg.sender, attended: false }));
    }

    function getAttendeesNumber(uint id) constant returns (uint) {
        return events[id].attendees.length;
    }

    function getEventOwner(uint id) constant returns (address) {
        return events[id].owner;
    }

    function getAttendees(uint id) constant returns (address[]) {
        address[] memory result = new address[](events[id].attendees.length);

        for (uint i = 0; i < events[id].attendees.length; i++) {
            result[i] = (events[id].attendees[i].wallet);
        }

        return result;
    }

    function checkin(uint id, address attendeeWallet) {
        assert(msg.sender == events[id].owner);

        bool stop;
        for (uint i = 0; i < events[id].attendees.length && !stop; i++) {
            if (events[id].attendees[i].wallet == attendeeWallet && !events[id].attendees[i].attended) {
                events[id].attendees[i].attended = true;
                attendeeWallet.transfer(events[id].deposit);
                stop = true;
            }
        }
    }

    function charge(uint id) {
        assert(msg.sender == events[id].owner);

        uint amount = 0;

        for (uint i = 0; i < events[id].attendees.length; i++) {
            if (!events[id].attendees[i].attended) {
                amount = amount + events[id].deposit;
            }
        }

        events[id].charity.transfer(amount);
    }
}
