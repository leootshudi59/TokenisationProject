// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BCPL is ERC20 {
    constructor(uint256 initialSupply) ERC20("Blockchain Prince Leo Token", "BCPL") {
        _mint(msg.sender, initialSupply);
    }
}