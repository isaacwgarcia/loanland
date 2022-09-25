//most recent loan address
const loanAddress = "0x5846803c7CdA48CD16d1eAD0463514688218138E"; //NOTE - update w actual loan address
const ethers = require("ethers");
const { Framework } = require("@superfluid-finance/sdk-core");
const LoanContract = require("../artifacts/contracts/EmploymentLoan.sol/EmploymentLoan.json");
const LoanContractABI = LoanContract.abi;
require("dotenv").config();

//Lender must have positive balance greater than loan amount

async function main() {
  const url = `${process.env.MUMBAI_URL}`;
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

  const network = await customHttpProvider.getNetwork();

  const sf = await Framework.create({
    chainId: network.chainId,
    provider: customHttpProvider,
  });

  const lender = sf.createSigner({
    privateKey: process.env.LENDER_PRIVATE_KEY,
    provider: customHttpProvider,
  });

  const lenderBalance = await daix.balanceOf({
    account: lender.address,
    providerOrSigner: lender,
  });

  console.log("LenderBalance >>>> ", lenderBalance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
