const ethers = require("ethers");

const { Framework } = require("@superfluid-finance/sdk-core");
const LoanFactoryABI =
  require("../artifacts/contracts/Factory.sol/Factory.json").abi;

const LoanABI =
  require("../artifacts/contracts/EmploymentLoan.sol/EmploymentLoan.json").abi;
require("dotenv").config();

//place deployed address of the loan factory here...
const LoanFactoryAddress = "0xD89907759ea56723FC20eb72F99884dFc592a020"; // from first step
const loanAddress = "0x610699E22fb12933cb0aA2DB15b32597BE28F99d"; // from previous step

//place the ID of your loan here. Note that loanIds start at 1

//NOTE: this is set as the goerli url, but can be changed to reflect your RPC URL and network of choice
const url = process.env.MUMBAI_URL;

const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

async function main() {
  const network = await customHttpProvider.getNetwork();

  const sf = await Framework.create({
    chainId: network.chainId,
    provider: customHttpProvider,
  });

  const loanFactory = new ethers.Contract(
    LoanFactoryAddress,
    LoanFactoryABI,
    customHttpProvider
  );

  const loanData = new ethers.Contract(
    loanAddress,
    LoanABI,
    customHttpProvider
  );

  console.log("LoanData Borrower", await loanData.borrower());
  console.log("LoanData Lender", await loanData.lender());
  console.log("LoanData Employer", await loanData.employer());
  const amount = await loanData.borrowAmount();
  const time = await loanData.paybackMonths();
  console.log(
    "LoanData Amount",
    ethers.utils.formatEther(ethers.BigNumber.from(amount).toString()),
    "DAI"
  );
  console.log("LoanData Interest", await loanData.interestRate(), "%");
  console.log(
    "LoanData paybackMonths",
    ethers.BigNumber.from(time).toString(),
    "Months"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
