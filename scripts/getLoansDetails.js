const ethers = require("ethers");
const { Framework } = require("@superfluid-finance/sdk-core");
const LoanFactoryABI =
  require("../artifacts/contracts/Factory.sol/Factory.json").abi;

const LoanABI =
  require("../artifacts/contracts/EmploymentLoan.sol/EmploymentLoan.json").abi;
require("dotenv").config();

//place deployed address of the loan factory here...
const LoanFactoryAddress = "0xD89907759ea56723FC20eb72F99884dFc592a020";
/* 
LOANFACTORY_DEPLOYED_ADDRESS=0x885677553eA710DBC5CA1BD439dFf6C263e6E5F8
SCORING__DEPLOYED_ADDRESS=0x7050F971cCc46c65Dc039f5E27Bf4EfbE95161E9 */

//place the ID of your loan here. Note that loanIds start at 1
const LoanId = 2;
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

  const loanAddress = await loanFactory.getLoanAddressByID(LoanId);

  //console.log(`The address of loan ${LoanId} is ${loanAddress}`);

  //Load loans in memory
  let arrayAddresses = [];
  for (let i = 1; i < 10; i++) {
    contractAddress = await loanFactory.idToLoan(i);

    if (contractAddress != "0x0000000000000000000000000000000000000000") {
      arrayAddresses.push(contractAddress);
    } else break;
  }

  let result = [];
  result = await getLoans();
  console.log("Total Loans ", result);

  const loans = await getLoansByLender(
    "0x1D7b25dB3D1C868DE325C8CDF69DeC90c452e462"
  );
  console.log("Loans by Lender ", loans);

  /* const loan = new ethers.Contract(loanAddress, LoanABI, customHttpProvider);

  console.log("Loan Lender", await loan.lender());
  console.log("Loan Employer", await loan.employer());
  console.log("Loan Borrower", await loan.borrower());
  console.log("Loan Open", await loan.loanOpen()); */
}

async function getLoans() {
  const network = await customHttpProvider.getNetwork();

  const loanFactory = new ethers.Contract(
    LoanFactoryAddress,
    LoanFactoryABI,
    customHttpProvider
  );

  //Load loans in memory
  let arrayAddresses = [];
  for (let i = 1; i < 10; i++) {
    contractAddress = await loanFactory.idToLoan(i);

    if (contractAddress != "0x0000000000000000000000000000000000000000") {
      const loan = new ethers.Contract(
        contractAddress,
        LoanABI,
        customHttpProvider
      );

      console.log("  Lender", await loan.lender());
      console.log("  Employer", await loan.employer());
      console.log("  Borrower", await loan.borrower());
      console.log("  Open", await loan.loanOpen());
      console.log("  Amount", await loan.borrowAmount()); //BigNumber
      console.log("  Interest", await loan.interestRate());
      console.log("  Months", await loan.paybackMonths());
      console.log("---");

      arrayAddresses.push(contractAddress);
    } else break;
  }
  //console.log("arrayAddresses", arrayAddresses);
  return arrayAddresses;
}

async function getLoansByLender(lender) {
  const loanFactory = new ethers.Contract(
    LoanFactoryAddress,
    LoanFactoryABI,
    customHttpProvider
  );

  //Load loans in memory
  let arrayAddresses = [];
  for (let i = 1; i < 10; i++) {
    contractAddress = await loanFactory.idToLoan(i);

    if (contractAddress != "0x0000000000000000000000000000000000000000") {
      const loan = new ethers.Contract(
        contractAddress,
        LoanABI,
        customHttpProvider
      );

      const _lender = await loan.lender();

      if (lender == _lender) arrayAddresses.push(contractAddress);
    } else break;
  }

  return arrayAddresses;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
