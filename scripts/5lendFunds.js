const ethers = require("ethers");
const { Framework } = require("@superfluid-finance/sdk-core");
const LoanContract = require("../artifacts/contracts/EmploymentLoan.sol/EmploymentLoan.json");
const { network } = require("hardhat");
const LoanContractABI = LoanContract.abi;
require("dotenv").config();

async function main() {
  const url = `${process.env.MUMBAI_URL}`;
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

  const network = await customHttpProvider.getNetwork();

  const sf = await Framework.create({
    chainId: network.chainId,
    provider: customHttpProvider,
  });

  //most recent loan address
  const loanAddress = "0x5846803c7CdA48CD16d1eAD0463514688218138E"; //NOTE - must be updated to reflect actual loan address

  const lender = sf.createSigner({
    privateKey: process.env.LENDER_PRIVATE_KEY,
    provider: customHttpProvider,
  });

  const employmentLoan = new ethers.Contract(
    loanAddress,
    LoanContractABI,
    lender
  );

  await employmentLoan
    .connect(lender)
    .lend()
    .then((tx) => {
      console.log(tx);
    });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
