import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ethers, utils } from "ethers";
import { v4 as uuidv4 } from "uuid";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { getWeb3Signer } from "../../components/lib/api";
import { omit } from "./helpers";
import { LENS_HUB_CONTRACT_ABI } from "./config";

const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export async function createLoan(accessToken, userId, description) {
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
      amount: 10000,
      interest_rate: 10,
      loan_term: 72,
    }), // TODO Grab Loan's Conditions from UI.
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
  console.log("created post: TX  >>> ", tx);
  console.log("created post: tx hash", tx.hash);
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
    console.log("Error uploading file: ", error);
    return error;
  }
}
