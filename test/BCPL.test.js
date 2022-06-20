const BCPL = artifacts.require("../contracts/BCPL.sol");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("BCPL", async (accounts) => {
  const [contractDeployerAccount, recipientAccount] = accounts;
  it("all tokens should be in my account", async () => {
    let tokenInstance = await BCPL.deployed();
    let totalSupply = await tokenInstance.totalSupply();
    expect(tokenInstance.balanceOf(contractDeployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("... lets tokens to be sent between accounts", async () => {
    const amountOfTokensToSend = 7;
    let tokenInstance = await BCPL.deployed();
    let totalSupply = await tokenInstance.totalSupply();
    expect(tokenInstance.transfer(recipientAccount, amountOfTokensToSend)).to.eventually.be.fulfilled;
    //console.log(totalSupply.sub(new BN(amountOfTokensToSend)));
    expect(tokenInstance.balanceOf(contractDeployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(amountOfTokensToSend)));
    expect(tokenInstance.balanceOf(recipientAccount)).to.eventually.be.a.bignumber.equal(new BN(amountOfTokensToSend));
  });


  it("... does not make it possible to send more tokens than available in deployer balance", async () => {
    let tokenInstance = await BCPL.deployed();
    let deployerBalance = await tokenInstance.balanceOf(contractDeployerAccount);

    expect(tokenInstance.transfer(recipientAccount, new BN(deployerBalance + 1))).to.eventually.be.rejected;
  });
});
