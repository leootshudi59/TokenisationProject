var BCPL = artifacts.require("../contracts/BCPL.sol");
var BCPLSale = artifacts.require("../contracts/BCPLSale.sol");

require('dotenv').config({path:'../.env'});

module.exports = async function(deployer) {
    let addresses = await web3.eth.getAccounts();
    await deployer.deploy(BCPL, process.env.INITIAL_TOKENS_SUPPLY);
    await deployer.deploy(BCPLSale, 1, addresses[0], BCPL.address);
    let tokenInstance = await BCPL.deployed();
    await tokenInstance.transfer(BCPLSale.address, process.env.INITIAL_TOKENS_SUPPLY);
}