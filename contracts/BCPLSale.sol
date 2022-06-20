pragma solidity ^0.8.1;

import "./extended/Crowdsale.sol";

contract BCPLSale is Crowdsale {
    constructor(uint256 rate, address payable wallet, IERC20 token) Crowdsale(rate, wallet, token) public {

    }
}