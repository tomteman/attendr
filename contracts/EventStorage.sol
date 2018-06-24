pragma solidity ^0.4.2;

contract Event {

    address owner;
    address charity;
    uint deposit;
    Attendee[] attendees;

    struct Attendee {
        address wallet;
        bool attended;
    }

    function Event(address _owner, address _charity, uint _deposit) public {
        owner = _owner;
        charity = _charity;
        deposit = _deposit;
    }

    function getInfo() public constant returns (address, address, uint, address[]) {
        return (owner, charity, deposit, getAttendees());
    }

    function getCharity() public constant returns (address) {
        return charity;
    }

    function getEventDepositAmount() public constant returns  (uint) {
        return deposit;
    }

    function registerToEvent() public payable {
        assert(msg.value >= deposit);
        attendees.push(Attendee({ wallet: msg.sender, attended: false }));
    }

    function getAttendeesNumber() public constant returns (uint) {
        return attendees.length;
    }

    function getEventOwner() public constant returns (address) {
        return owner;
    }

    function getAttendees() public constant returns (address[]) {
        address[] memory result = new address[](attendees.length);

        for (uint i = 0; i < attendees.length; i++) {
            result[i] = (attendees[i].wallet);
        }

        return result;
    }

    function checkin(address attendeeWallet) public constant {
        assert(msg.sender == owner);

        bool stop;
        for (uint i = 0; i < attendees.length && !stop; i++) {
            if (attendees[i].wallet == attendeeWallet && !attendees[i].attended) {
                attendees[i].attended = true;
                attendeeWallet.transfer(deposit);
                stop = true;
            }
        }
    }


    function getTime() internal returns (uint) {
        return now;
    }

    function charge(uint id) {
        // Anyone can now call 'charge' 48 hours+ after the event end date
        require(getTime() > (events[id].endDate + 60*60*48));

        uint amount = 0;

        for (uint i = 0; i < attendees.length; i++) {
            if (!attendees[i].attended) {
                amount = amount + deposit;
            }
        }

        charity.transfer(amount);
    }

    function isOwnerOrAttendee(address wallet) constant public returns (bool) {
        if (owner == wallet) return true;

        for (uint i = 0; i < attendees.length; i++) {
            if (attendees[i].wallet == wallet) {
                return true;
            }
        }

        return false;
    }
}

contract EventStorage {
    
    address[] events;

    function createEvent(address charity, uint deposit) public returns (address) {
        address newEvent = new Event(msg.sender, charity, deposit);
        events.push(newEvent);
        return newEvent;
    }

    function getEventsCount() public constant returns (uint) {
        return events.length;
    }

    function listJoinEvents() public constant returns (address[]) {
        address[] memory result = new address[](events.length);

        uint i = 0;
        uint count = 0;
        for (i = 0; i < events.length; i++) {
            if (Event(events[i]).isOwnerOrAttendee(msg.sender)) {
                result[count] = events[i];
                count++;
            }
        }
        address[] memory ret = new address[](count);
        for (i = 0; i < count; i++) {
            ret[i] = result[i];
        }

        return ret;
    }
}
