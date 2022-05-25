var BCPL = artifacts.require("../contracts/BCPL.sol");

module.exports = async function(deployer) {
    await deployer.deploy(BCPL, 100000);
}