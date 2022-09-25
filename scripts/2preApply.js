const ethers = require("ethers");
const { Framework } = require("@superfluid-finance/sdk-core");
const LoanFactoryABI =
  require("../artifacts/contracts/Factory.sol/Factory.json").abi;

const ScoringABI =
  require("../artifacts/contracts/Scoring.sol/Scoring.json").abi;

require("dotenv").config();

//place address of the loan factory DEPLOYED here...
const LoanFactoryAddress = "0xD89907759ea56723FC20eb72F99884dFc592a020"; //SET AFTER FIRST DEPLOY
const scoringAddress = "0x9c089C7C7EC2A2e3A0B8a661169e7CE07Bb86fA6"; // SET AFTER FIRST DEPLOY

const customHttpProvider = new ethers.providers.JsonRpcProvider(
  process.env.MUMBAI_URL
);

async function main() {
  const network = await customHttpProvider.getNetwork();

  const sf = await Framework.create({
    chainId: network.chainId,
    provider: customHttpProvider,
  });

  const borrower = sf.createSigner({
    privateKey: process.env.BORROWER_PRIVATE_KEY,
    provider: customHttpProvider,
  });

  const employer = sf.createSigner({
    privateKey: process.env.EMPLOYER_PRIVATE_KEY,
    provider: customHttpProvider,
  });

  const daix = await sf.loadSuperToken("fDAIx");

  const loanFactory = new ethers.Contract(
    LoanFactoryAddress,
    LoanFactoryABI,
    customHttpProvider
  );

  const scoring = new ethers.Contract(
    scoringAddress,
    ScoringABI,
    customHttpProvider
  );

  await loanFactory
    .connect(borrower)
    .createNewLoan(
      ethers.utils.parseEther("300"), //borrow amount = 1000 matic Amount to Borrow
      10, // 10% interest rate
      12, //12 months payback period
      employer.address, //address of employer who will be effectively whitelisted in this case
      process.env.LENDER_PUBLIC,
      borrower.address, // address of borrower
      daix.address, // this is the token we'll be using: borrowing in and paying back
      sf.settings.config.hostAddress, //address of host
      scoringAddress //address of scoring
    )
    .then((tx) => {
      console.log("Your pre-application is ready. Tx: ", tx.hash);
    });

  await getLoans();
  let initialScore = await scoring.getScore(borrower.address);
  console.log("Initial Score: ", initialScore);
}
async function getLoans() {
  const customHttpProvider = new ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  const loanFactory = new ethers.Contract(
    LoanFactoryAddress,
    LoanFactoryABI,
    customHttpProvider
  );
  let contractAddress;
  let arrayAddresses = [];
  for (let i = 1; i < 10; i++) {
    contractAddress = await loanFactory.idToLoan(i);

    if (contractAddress != "0x0000000000000000000000000000000000000000") {
      arrayAddresses.push(contractAddress);
    } else break;
  }

  console.log("GetLoans > ", arrayAddresses); //TODO State to store Loans
  return arrayAddresses;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
