// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

contract KYC {
    mapping(address => bool) public allowed;

    function setKycCompleted(address _addr) public {
        allowed[_addr] = true;
    }

    function setKycRevoked(address _addr) public {
        allowed[_addr] = false;
    } 

    function isKycCompleted(address _addr) public view returns (bool) {
        return allowed[_addr];
    }
}