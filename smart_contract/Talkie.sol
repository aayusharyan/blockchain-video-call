// SPDX-License-Identifier: GPL-3.0
/*
 * Talkie           - A decentralized Peer-to-peer Video Calling App.
 * Deployer Address - 
 * Deployed Network - Ropsten Test Network
 *
 * About
 * - This application does this and this and this.
 */
pragma solidity >=0.7.0 <0.9.0;

contract Talkie {

    struct ICECandidate {
        string candidate;
        uint8 sdpMLineIndex;
        string sdpMid;
        string usernameFragment;
    }

    struct Call {
        string key;
        string offer_sdp;
        string offer_type;
        string answer_sdp;
        string answer_type;
        address initiator_addr;
        address joinee_addr;
        ICECandidate[] initiator;
        ICECandidate[] joinee;
    }

    mapping (uint32 => Call) private callList;

    address payable public owner;
    string ENCRYPTION_KEY = "VALID";
    uint randNonce = 0;

    constructor() {
        owner = payable(msg.sender);
    }

    event callLogs(address participant, string callId);
    event ICEUpdated(string CallURL);

    //Generate the call and return new Call URL.
    function generateCall(string calldata o_sdp, string calldata o_type) public {
        randNonce++;
        uint32 callId = uint32(uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % 899999999) + 100000000;

        //Check if Call ID Exists already, then generate a new one.
            
        callList[callId].key            = ENCRYPTION_KEY;
        callList[callId].offer_sdp      = o_sdp;
        callList[callId].offer_type     = o_type;
        callList[callId].initiator_addr = msg.sender;
        emit callLogs(msg.sender, convertCallIdToCallURL(callId));
    }

    //Add new ICECandidate to a call
    function addICECandidate(bytes calldata callURL, ICECandidate calldata iceDetails) public {
        uint32 callId = convertCallURLToCallId(callURL);

        if(callList[callId].initiator_addr == msg.sender) {
            callList[callId].initiator.push(iceDetails);
        } else {
            callList[callId].joinee.push(iceDetails);
        }

        emit ICEUpdated(convertCallIdToCallURL(callId));
    }

    //Get the call details.
    function getCallDetails(bytes calldata callURL) public view returns(Call memory) {
        return callList[convertCallURLToCallId(callURL)];
    }

    //Join Call
    function joinCall(bytes calldata callURL, string calldata a_sdp, string calldata a_type) public {
        uint32 callId = convertCallURLToCallId(callURL);

        if(msg.sender == callList[callId].initiator_addr) {
            callList[callId].offer_sdp      = a_sdp;
            callList[callId].offer_type     = a_type;
            callList[callId].initiator_addr = msg.sender;
        } else {
            callList[callId].answer_sdp     = a_sdp;
            callList[callId].answer_type    = a_type;
            callList[callId].joinee_addr    = msg.sender;
        }

            
        emit callLogs(msg.sender, convertCallIdToCallURL(callId));
    }

    //Convert Call ID Number to Call URL String
    function convertCallIdToCallURL(uint32 callId) internal pure returns(string memory) {
        string memory callURL = "";
        while (callId != 0) {
            uint8 singleNumber = uint8(callId % 10);
            callId  = callId / 10;
            callURL = concat(convertIntToChar(singleNumber), callURL);
        }
        return callURL;
    }

    //Convert Call URL String to Call ID Number
    function convertCallURLToCallId(bytes calldata callURL) internal pure returns (uint32) {
        uint32 callId = 0;
        uint8 i=0;
        for (i = 0; i < callURL.length; i += 1) {
            uint8 digit = convertCharToInt(callURL[i]);
            callId = (10 * callId) + digit;
        }
        return callId;
    }

    function convertCharToInt(bytes1 text) internal pure returns(uint8) {

        if(compareChars(text, "a")) {
            return 0;
        } else if(compareChars(text, "b")) {
            return 1;
        } else if(compareChars(text, "c")) {
            return 2;
        } else if(compareChars(text, "d")) {
            return 3;
        } else if(compareChars(text, "e")) {
            return 4;
        } else if(compareChars(text, "f")) {
            return 5;
        } else if(compareChars(text, "g")) {
            return 6;
        } else if(compareChars(text, "h")) {
            return 7;
        } else if(compareChars(text, "i")) {
            return 8;
        } else if(compareChars(text, "j")) {
            return 9;
        } else {
            return 0;
        }
    }

    function convertIntToChar(uint8 number) internal pure returns(string memory) {
        if(number == 0) {
            return "a";
        } else if(number == 1) {
            return "b";
        } else if(number == 2) {
            return "c";
        } else if(number == 3) {
            return "d";
        } else if(number == 4) {
            return "e";
        } else if(number == 5) {
            return "f";
        } else if(number == 6) {
            return "g";
        } else if(number == 7) {
            return "h";
        } else if(number == 8) {
            return "i";
        } else if(number == 9) {
            return "j";
        } else {
            return "a";
        }
    }

    function concat(string memory a, string memory b) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }

    function compareChars(bytes1 a, bytes1 b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function destroy() public {
        require(msg.sender == owner, "You are not the owner");
        selfdestruct(owner);
    }

    /* END OF CONTRACT */
}