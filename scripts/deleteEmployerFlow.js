const ethers = require("ethers");
const { Framework } = require("@superfluid-finance/sdk-core");
require("dotenv").config();
//here is where you'll put your loan address that you'll be interacting with
const loanAddress = "";

async function main() {
  //TODO CHECK THE SCORE WHEN FLOW IS DELETED
  const url = `${process.env.MUMBAI_URL}`;
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

  const network = await customHttpProvider.getNetwork();
  const sf = await Framework.create({
    chainId: network.chainId,
    provider: customHttpProvider,
  });

  const employer = sf.createSigner({
    privateKey: process.env.EMPLOYER_PRIVATE_KEY,
    provider: customHttpProvider,
  });

  const daix = await sf.loadSuperToken("fDAIx");

  const employerFlowOperation = sf.cfaV1.deleteFlow({
    sender: "0xE7ab2D31396a89F91c4387ad88BBf94f590e8eB1", //employer address
    receiver: "0x15e55a8D85bF02c696BFc0317D2cbF7BBf5866aB", //Loan Address
    superToken: daix.address,
  });

  console.log("Deleting Employer Flow...");

  await employerFlowOperation.exec(employer).then((tx) => {
    console.log("Your tx succeeded!", tx.hash);
    console.log(tx);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
