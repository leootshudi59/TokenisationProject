const BCPL = artifacts.require("../contracts/BCPL.sol");

require('dotenv').config({path:'../.env'});

const chai = require("./chaiSetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("BCPL test", async (accounts) => {
  const [contractDeployerAccount, recipientAccount, anotherAccount] = accounts;

  // Each test launches with a new token instance with the initial supply tokens
  beforeEach(async () => {
    this.bpcl = await BCPL.new(process.env.INITIAL_TOKENS_SUPPLY)
  })

  it("all tokens should be in my account", async () => {
    let tokenInstance = this.bpcl;
    let totalSupply = await tokenInstance.totalSupply();
    expect(tokenInstance.balanceOf(contractDeployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("... does not make it possible to send more tokens than available in deployer balance", async () => {
    let tokenInstance = this.bpcl;
    let deployerBalance = await tokenInstance.balanceOf(contractDeployerAccount);

    expect(tokenInstance.transfer(recipientAccount, new BN(deployerBalance + 1))).to.eventually.be.rejected;
  });

  it("tokens can sent between accounts", async () => {
    const amountOfTokensToSend = 7;
    let tokenInstance = this.bpcl;
    let totalSupply = await tokenInstance.totalSupply();
    expect(tokenInstance.balanceOf(contractDeployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    return expect(tokenInstance.transfer(recipientAccount, amountOfTokensToSend)).to.eventually.be.fulfilled;
    //console.log(totalSupply.sub(new BN(amountOfTokensToSend)));
    //expect(tokenInstance.balanceOf(contractDeployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(amountOfTokensToSend)));
    //return expect(tokenInstance.balanceOf(recipientAccount)).to.eventually.be.a.bignumber.equal(new BN(amountOfTokensToSend));
  });

  it("sender and recipient account balances should be updated when tokens are sent to each other", async () => {
    const amountOfTokensToSend = 7;
    let tokenInstance = this.bpcl;
    let totalSupply = await tokenInstance.totalSupply();
    await tokenInstance.transfer(recipientAccount, amountOfTokensToSend)
    expect(tokenInstance.balanceOf(contractDeployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(amountOfTokensToSend)));
    return expect(tokenInstance.balanceOf(recipientAccount)).to.eventually.be.a.bignumber.equal(new BN(amountOfTokensToSend));
  })
});