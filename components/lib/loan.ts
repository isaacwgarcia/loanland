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
  LOAN_FACTORY_SECOND,
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
  let content = JSON.parse(loan.metadata.content);
  const lender = loan.profile.ownedBy;
  const amount = content.amount;
  const interest = content.interest_rate;
  const loan_term = content.loan_term;
  const employer = formState.employer_address;
  //console.log("loan ", loan, "formState ", formState);

  const customHttpProvider = new ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  const loanFactoryAddress = process.env.LOANFACTORY_ADDRESS;

  const network = await customHttpProvider.getNetwork();

  const sf = await Framework.create({
    chainId: network.chainId,
    provider: customHttpProvider,
  });
  const provider = await getWeb3Provider();
  const borrower = sf.createSigner({
    web3Provider: provider,
  });

  const maticx = await sf.loadSuperToken("MATICx"); //get MATICx on mumbai
  const loanFactory = new ethers.Contract(
    loanFactoryAddress,
    LOAN_FACTORY_ABI,
    customHttpProvider
  );

  const borrower_address = borrower.getAddress();

  await loanFactory
    .connect(borrower)
    .createNewLoan(
      ethers.utils.parseEther(amount),
      //BORROW amount = 1000 matic Amount to Borrow
      interest, // MOCK DATA 10% interest rate
      loan_term, // MOCK DATA 36 months payback period
      employer, //address of employer who will be effectively whitelisted in this case GRAB THIS FROM UI
      lender, //lender address
      borrower_address, // address of borrower
      maticx.address, //maticx address - this is the token we'll be using: borrowing in and paying back
      sf.settings.config.hostAddress //address of host
    )
    .then((tx) => {
      console.log("Instance successfull tx hash >>> ", tx.hash);
    });
}
