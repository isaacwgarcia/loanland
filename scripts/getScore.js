const ethers = require("ethers");
const { Framework } = require("@superfluid-finance/sdk-core");

const ScoringABI =
  require("../artifacts/contracts/Scoring.sol/Scoring.json").abi;

require("dotenv").config();

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

  const scoring = new ethers.Contract(
    scoringAddress,
    ScoringABI,
    customHttpProvider
  );

  const score = await scoring.getScore(
    "0xa3c571A4C6f98c89AA608Ab199bb6D0C6d236096"
  );
  console.log(await borrower.getAddress(), "Borrower's score: ", score);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
