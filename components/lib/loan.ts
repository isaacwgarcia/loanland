import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ethers, utils } from "ethers";
import { v4 as uuidv4 } from "uuid";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { getWeb3Signer, getWeb3Provider } from "../../components/lib/api";
import { omit } from "./helpers";
import {
  LENS_HUB_CONTRACT_ABI,
  LOAN_FACTORY_ABI,
  LOAN_ABI,
  SCORING_ABI,
} from "./config";
import { Framework } from "@superfluid-finance/sdk-core";

const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export async function createLoan(accessToken, userId, formState) {
  const CREATE_POST_TYPED_DATA = `
    mutation($request: CreatePublicPostRequest!) { 
        createPostTypedData(request: $request) {
            id
            expiresAt
            typedData {
            types {
                PostWithSig {
                name
                type
                }
            }
            domain {
            name
            chainId
            version
            verifyingContract
            }
            value {
            nonce
            deadline
            profileId
            contentURI
            collectModule
            collectModuleInitData
            referenceModule
            referenceModuleInitData
            }
        }
        }
        }
`;

  const client = new ApolloClient({
    uri: process.env.APIURL,
    cache: new InMemoryCache(),
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  const createPostTypedData = (createPostTypedDataRequest: any) => {
    return client.mutate({
      mutation: gql(CREATE_POST_TYPED_DATA),
      variables: {
        request: createPostTypedDataRequest,
      },
    });
  };

  const metajson = {
    version: "1.0.0",
    metadata_id: uuidv4(),
    locale: "en",
    mainContentFocus: "TEXT_ONLY",
    content: JSON.stringify({
      amount: formState.amount,
      interest_rate: formState.interest,
      loan_term: formState.duration,
    }),
    name: "LOAN_CONDITIONS",
    attributes: [],
    appId: "LoanLand",
  };

  const ipfsURI = await uploadJSON(metajson);

  const createPostRequest = {
    profileId: userId,
    contentURI: ipfsURI,
    collectModule: {
      //DISABLED for now
      // feeCollectModule: {
      //   amount: {
      //     currency: currencies.enabledModuleCurrencies.map(
      //       (c: any) => c.address
      //     )[0],
      //     value: '0.000001',
      //   },
      //   recipient: address,
      //   referralFee: 10.5,
      // },
      revertCollectModule: true,
    },
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  };

  const result = await createPostTypedData(createPostRequest);
  //console.log("createPostTypedData", result.data);
  const typedData = result.data.createPostTypedData.typedData;
  // console.log("create post: typedData", typedData);

  const domain = omit(typedData.domain, "__typename");
  const types = omit(typedData.types, "__typename");
  const value = omit(typedData.value, "__typename");
  //console.log("before signing Tx");
  const signer = await getWeb3Signer();

  const signature = await signer._signTypedData(domain, types, value);

  const { v, r, s } = splitSignature(signature);

  const lensHub = new ethers.Contract(
    process.env.LENS_HUB_CONTRACT,
    LENS_HUB_CONTRACT_ABI,
    signer
  );

  const tx = await lensHub.postWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    collectModule: typedData.value.collectModule,
    collectModuleInitData: typedData.value.collectModuleInitData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleInitData: typedData.value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  //console.log("created post: TX  >>> ", tx);
  //console.log("created post: tx hash", tx.hash);
  return tx;
}

async function uploadJSON(item) {
  const projectId = process.env.INFURA_PROJECT_ID;
  const projectSecret = process.env.INFURA_PROJECT_SECRET;
  const dedicatedEndPoint = process.env.INFURA_ENDPOINT;

  const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
    "base64"
  )}`;
  const options = {
    host: "ipfs.infura.io",
    protocol: "https",
    port: 5001,
    apiPath: "/api/v0",
    headers: {
      authorization: auth,
    },
  };

  const IPFS_CLIENT = ipfsHttpClient(options);
  try {
    const added = await IPFS_CLIENT.add(Buffer.from(JSON.stringify(item)), {
      progress: (prog) => console.log(`received: ${prog}`),
    });
    const url = `${dedicatedEndPoint}${added.path}`;
    return url;
  } catch (error) {
    console.log("Error uploading to IPFS: ", error);
    return error;
  }
}

export async function preApply(loan, formState) {
  const scoringAddress = process.env.SCORING__DEPLOYED_ADDRESS;

  let content = JSON.parse(loan.metadata.content);
  const lender = loan.profile.ownedBy;
  const amount = formState.amount;
  const interest = content.interest_rate; // You can't modify InterestRate
  const loan_term = formState.months; // Should be less than stated in conditions.
  const employer = formState.employer_address;
  //console.log("loan ", loan, "formState ", formState);

  const customHttpProvider = new ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  const loanFactoryAddress = process.env.LOANFACTORY_DEPLOYED_ADDRESS;

  const network = await customHttpProvider.getNetwork();

  const sf = await Framework.create({
    chainId: network.chainId,
    provider: customHttpProvider,
  });
  const provider = await getWeb3Provider();
  const borrower = sf.createSigner({
    web3Provider: provider,
  });

  const daix = await sf.loadSuperToken("fDAIx"); //get DAIx on mumbai

  const loanFactory = new ethers.Contract(
    loanFactoryAddress,
    LOAN_FACTORY_ABI,
    customHttpProvider
  );

  const borrower_address = await borrower.getAddress();

  await loanFactory
    .connect(borrower)
    .createNewLoan(
      ethers.utils.parseEther(amount), //amount to Borrow
      interest, //  interest rate
      loan_term, //  months payback period
      employer, //address of employer who will be effectively whitelisted in this case GRAB THIS FROM UI
      lender, //lender address
      borrower_address, // address of borrower
      daix.address, //daix address - this is the token we'll be using: borrowing in and paying back
      sf.settings.config.hostAddress, //address of host
      scoringAddress //Scoring Contract
    )
    .then((tx) => {
      console.log("Instance successfull tx hash >>> ", tx.hash);
    });
}

export async function getLoansbyLender(lender) {
  const customHttpProvider = new ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  //SET AFTER INITIAL DEPLOY
  const loanFactoryAddress = process.env.LOANFACTORY_DEPLOYED_ADDRESS;
  console.log("loanFactoryAddress", loanFactoryAddress);
  const loanFactory = new ethers.Contract(
    loanFactoryAddress,
    LOAN_FACTORY_ABI,
    customHttpProvider
  );

  let loans = [];
  for (let i = 1; i < 10; i++) {
    let contractAddress = await loanFactory.idToLoan(i);

    if (contractAddress != "0x0000000000000000000000000000000000000000") {
      const loan = new ethers.Contract(
        contractAddress,
        LOAN_ABI,
        customHttpProvider
      );
      const _lender = await loan.lender();
      if (lender == _lender) {
        const _borrower = await loan.borrower();
        const _amount = await loan.borrowAmount();
        const _duration = await loan.paybackMonths();
        const _interest = await loan.interestRate();
        const _loanaddress = await loan.address;

        let conditions = {
          borrower: _borrower,
          amount: ethers.utils.formatEther(
            ethers.BigNumber.from(_amount).toString()
          ),
          duration: ethers.BigNumber.from(_duration).toString(),
          interest: _interest,
          loanaddress: _loanaddress,
        };

        loans.push(conditions);
      }
    } else break;
  }
  console.log("LOANS", loans);
  return loans;
}

export async function getLoansbyBorrower(borrower) {
  const customHttpProvider = new ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  //SET AFTER INITIAL DEPLOY
  const loanFactoryAddress = process.env.LOANFACTORY_DEPLOYED_ADDRESS;
  const loanFactory = new ethers.Contract(
    loanFactoryAddress,
    LOAN_FACTORY_ABI,
    customHttpProvider
  );

  let loans = [];
  for (let i = 1; i < 10; i++) {
    let contractAddress = await loanFactory.idToLoan(i);

    if (contractAddress != "0x0000000000000000000000000000000000000000") {
      const loan = new ethers.Contract(
        contractAddress,
        LOAN_ABI,
        customHttpProvider
      );
      const _borrower = await loan.borrower();
      if (borrower == _borrower) {
        const _lender = await loan.lender();
        const _amount = await loan.borrowAmount();
        const _duration = await loan.paybackMonths();
        const _interest = await loan.interestRate();
        const _loanaddress = await loan.address;
        const _loanopen = await loan.open;
        const _amountRemaining = await loan.getTotalAmountRemaining();
        const _loanStartTime = await loan.loanStartTime();

        let conditions = {
          lender: _lender,
          amount: ethers.utils.formatEther(
            ethers.BigNumber.from(_amount).toString()
          ),
          duration: ethers.BigNumber.from(_duration).toString(),
          interest: _interest,
          loanaddress: _loanaddress,
          loanopen: _loanopen,
          amountRemaining: ethers.utils.formatEther(
            ethers.BigNumber.from(_amountRemaining).toString()
          ),
          loanStartTime: _loanStartTime,
        };

        loans.push(conditions);
      }
    } else break;
  }
  console.log("Borrower's loans: ", loans);
  return loans;
}

export async function getActiveLoansbyBorrower(borrower) {
  const customHttpProvider = new ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  //SET AFTER INITIAL DEPLOY
  const loanFactoryAddress = process.env.LOANFACTORY_DEPLOYED_ADDRESS;
  const loanFactory = new ethers.Contract(
    loanFactoryAddress,
    LOAN_FACTORY_ABI,
    customHttpProvider
  );

  let loans = [];
  for (let i = 1; i < 10; i++) {
    let contractAddress = await loanFactory.idToLoan(i);

    if (contractAddress != "0x0000000000000000000000000000000000000000") {
      const loan = new ethers.Contract(
        contractAddress,
        LOAN_ABI,
        customHttpProvider
      );
      const _borrower = await loan.borrower();
      if (borrower == _borrower) {
        const _lender = await loan.lender();
        const _amount = await loan.borrowAmount();
        const _duration = await loan.paybackMonths();
        const _interest = await loan.interestRate();
        const _loanaddress = await loan.address;
        const _loanopen = await loan.open;
        const _amountRemaining = await loan.getTotalAmountRemaining();
        const _loanStartTime = await loan.loanStartTime();

        if (_loanopen) {
          let conditions = {
            lender: _lender,
            amount: ethers.utils.formatEther(
              ethers.BigNumber.from(_amount).toString()
            ),
            duration: ethers.BigNumber.from(_duration).toString(),
            interest: _interest,
            loanaddress: _loanaddress,
            loanopen: _loanopen,
            amountRemaining: ethers.utils.formatEther(
              ethers.BigNumber.from(_amountRemaining).toString()
            ),
            loanStartTime: _loanStartTime,
          };

          loans.push(conditions);
        }
      }
    } else break;
  }
  console.log("Active Borrower's loans: ", loans);
  return loans;
}

export async function approveLoan(id, loanAddress, jwt) {
  const url = `${process.env.MUMBAI_URL}`;
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
  const network = await customHttpProvider.getNetwork();
  const sf = await Framework.create({
    chainId: network.chainId,
    provider: customHttpProvider,
  });
  const provider = await getWeb3Provider();
  const lender = sf.createSigner({
    web3Provider: provider,
  });
  const daix = await sf.loadSuperToken("fDAIx");
  const employmentLoan = new ethers.Contract(loanAddress, LOAN_ABI, lender);
  const borrowAmount = await employmentLoan.borrowAmount();
  const amountDec = Number(
    ethers.utils.formatEther(ethers.BigNumber.from(borrowAmount).toString())
  );
  const lender_address = await lender.getAddress();

  const lenderBalance = await getBalance(lender_address);

  console.log("Lender Balance: ", lenderBalance);
  if (lenderBalance > amountDec) {
    const lenderApprovalOperation = daix.approve({
      receiver: employmentLoan.address,
      amount: borrowAmount,
    });

    const result = await lenderApprovalOperation.exec(lender).then((tx) => {
      console.log("Approval Operation: ", tx.hash);
      return tx.hash;
    });

    if (result) {
      console.log("Spending was approved now I can lend");

      //CHECK THE LOAN IS FUNDED........
      const loanBalance = await getBalance(employmentLoan.address);
      console.log("LoanBalance is ", loanBalance);

      //LEND THE MONEY BEFORE Make sure the loan has flow coming from the employer.
      await employmentLoan
        .connect(lender)
        .lend()
        .then((tx) => {
          console.log(tx.hash);

          removeOffer(id, jwt);
        })

        .catch((e) => {
          console.log("error lend", e);
        });
    }
  } else {
    console.log("Lender Insufficient funds.");
  }
}

export async function getBalance(address) {
  const url = `${process.env.MUMBAI_URL}`;
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
  const network = await customHttpProvider.getNetwork();

  const sf = await Framework.create({
    chainId: network.chainId,
    provider: customHttpProvider,
  });

  const provider = await getWeb3Provider();
  const lender = sf.createSigner({
    web3Provider: provider,
  });
  const daix = await sf.loadSuperToken("fDAIx");
  const lenderBalance = await daix.balanceOf({
    account: address,
    providerOrSigner: lender,
  });

  const balance = Number(
    ethers.utils.formatEther(ethers.BigNumber.from(lenderBalance))
  );
  return balance;
}

export async function removeOffer(publicationId, accessToken) {
  console.log("Inside Remove Publication");
  const REMOVE_PUBLICATION = `
        mutation($request: HidePublicationRequest!) { 
          hidePublication(request: $request)       
      }
      `;
  const client = new ApolloClient({
    uri: process.env.APIURL,
    cache: new InMemoryCache(),
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  await client.mutate({
    mutation: gql(REMOVE_PUBLICATION),
    variables: {
      request: {
        publicationId,
      },
    },
  });
}

export async function getLoanOffers(accessToken, profileId) {
  const GET_LOAN_OFFERS = `
  query($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        __typename 
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
  fragment MediaFields on Media {
    url
    mimeType
  }
  fragment ProfileFields on Profile {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    isFollowedByMe
    isFollowing(who: null)
    followNftAddress
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    ownedBy
    dispatcher {
      address
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
        type
      }
      ... on RevertFollowModuleSettings {
        type
      }
    }
  }
  fragment PublicationStatsFields on PublicationStats { 
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
  }
  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }
  fragment Erc20Fields on Erc20 {
    name
    symbol
    decimals
    address
  }
  fragment CollectModuleFields on CollectModule {
    __typename
    ... on FreeCollectModuleSettings {
      type
      followerOnly
      contractAddress
    }
    ... on FeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
    ... on RevertCollectModuleSettings {
      type
    }
    ... on TimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
  }
  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
    hidden
    reaction(request: null)
    mirrors(by: null)
    hasCollectedByMe
  }
  fragment MirrorBaseFields on Mirror {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
    hidden
    reaction(request: null)
    hasCollectedByMe
  }
  fragment MirrorFields on Mirror {
    ...MirrorBaseFields
    mirrorOf {
     ... on Post {
        ...PostFields          
     }
     ... on Comment {
        ...CommentFields          
     }
    }
  }
  fragment CommentBaseFields on Comment {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
    hidden
    reaction(request: null)
    mirrors(by: null)
    hasCollectedByMe
  }
  fragment CommentFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
        ...MirrorBaseFields
        mirrorOf {
          ... on Post {
             ...PostFields          
          }
          ... on Comment {
             ...CommentMirrorOfFields        
          }
        }
      }
    }
  }
  fragment CommentMirrorOfFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
         ...MirrorBaseFields
      }
    }
  }
`;
  const client = new ApolloClient({
    uri: process.env.APIURL,
    cache: new InMemoryCache(),
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  const result = await client.query({
    query: gql(GET_LOAN_OFFERS),
    variables: {
      request: {
        profileId,
        publicationTypes: ["POST"],
      },
    },
  });

  console.log("result> ", result.data);
  return result.data;
}
