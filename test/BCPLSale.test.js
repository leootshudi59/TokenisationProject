const BCPL = artifacts.require("../contracts/BCPL.sol");
const BCPLSale = artifacts.require("../contracts/BCPLSale.sol");

require('dotenv').config({path:'../.env'});

const chai = require("./chaiSetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("BCPL sale test", async(accounts) => {
    const [contractDeployerAccount, recipientAccount, anotherAccount] = accounts;

    it("no tokens should be in the deployer account", async () => {
        let tokenInstance = await BCPL.deployed();
        return expect(tokenInstance.balanceOf(contractDeployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

    it("all tokens should be in the crowdsale smart contract by default", async () => {
        let tokenInstance = await BCPL.deployed();
        let totalSupply = await tokenInstance.totalSupply();
        let balanceOfTokensInCrowdsale = await tokenInstance.balanceOf.call(BCPLSale.address);

        expect(balanceOfTokensInCrowdsale).to.be.a.bignumber.equal(totalSupply);
    })

    it("it should be possible to buy tokens from crowdsale", async () => {
        let tokenInstance = await BCPL.deployed();
        let tokenSaleInstance = await BCPLSale.deployed();
        let balanceBeforeSelling = await tokenInstance.balanceOf.call(recipientAccount);
        expect(tokenSaleInstance.sendTransaction({from: recipientAccount, value: 1})).to.be.fulfilled;

        console.log(balanceBeforeSelling.add(new BN(1)))
        console.log(balanceBeforeSelling)
        console.log(await tokenInstance.balanceOf(contractDeployerAccount))
        return expect(tokenInstance.balanceOf.call(recipientAccount)).to.eventually.be.equal(balanceBeforeSelling.add(new BN(1)));
    })
});