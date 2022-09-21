import { Session, Profile } from "./types";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { LENS_PERIPHERY_ABI, LENS_HUB_CONTRACT_ABI } from "./config";
import { omit } from "./helpers";
import Web3Modal from "web3modal";
import { BigNumber, ethers, utils } from "ethers";
import { pollUntilIndexed } from "./indexer";
import { uploadIpfs } from "./ipfs";
import { ProfileMetadata } from "./profile-metadata";
import { v4 as uuidv4 } from "uuid";

const apolloClient = new ApolloClient({
  uri: process.env.APIURL,
  cache: new InMemoryCache(),
});
const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export async function loginAPI(): Promise<Session | boolean> {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const accounts = await provider.listAccounts();
    const address = accounts[0];
    const signer = provider.getSigner();

    if (signer) {
      const options = {
        method: `GET`,
      };
      const challenge = await fetch(`/api/auth/${address}`, options)
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              return data;
            });
          }
          throw new Error("Api is not available challenge");
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });

      const signedMessage = await signer.signMessage(challenge);

      const authenticate = await fetch(
        `/api/auth/${address}?signedMessage=${signedMessage}`,
        {
          method: `POST`,
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              return data;
            });
          }
          throw new Error("Api is not available authenticate");
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });

      const session = authenticate as Session;
      return session;
    } else {
      console.log("Please wait to connect...");
    }
  } catch (e) {
    console.log("e ", e);
    return false;
  }
}

export async function generateChallenge(address) {
  const GET_CHALLENGE = `
    query($request: ChallengeRequest!) {
      challenge(request: $request) { text }
    }
  `;
  const result = await apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address: address,
      },
    },
  });
  return result.data.challenge.text;
}

export async function authenticate(address, signature) {
  const AUTHENTICATION = `
        mutation($request: SignedAuthChallenge!) { 
          authenticate(request: $request) {
            accessToken
            refreshToken
          }
      }
      `;
  const accessTokens = await apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });

  const session: Session = {
    // @ts-ignore: Object is possibly 'null'.
    token: {
      accessToken: accessTokens.data.authenticate.accessToken,
      refreshToken: accessTokens.data.authenticate.refreshToken,
    },
    // @ts-ignore: Object is possibly 'null'.
    address: String(address),
  };
  return session;
}

export async function getProfile(address) {
  const PROFILE =
    `
  query Profiles {
    profiles(request: { ownedBy: ["` +
    address +
    `"], limit: 10 }) {
      items {
        id
        name
        bio
  
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
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
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          __typename
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }`;

  const client = new ApolloClient({
    uri: process.env.APIURL,
    cache: new InMemoryCache(),
  });
  const result = await client.query({
    query: gql(PROFILE),
  });
  return result;
}

export async function getProfileAPI(address): Promise<Profile | boolean> {
  const profile = await fetch(`/api/user/${address}`, {
    method: `GET`,
  })
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          return data.data.profiles?.items[0] as Profile;
        });
      }
      throw new Error("Api is not available getProfileAPI");
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
  if (profile) {
    return profile;
  } else return false;
}

export async function verifyID(verificationQuery) {
  const proof = verificationQuery.proof;
  const nullifier_hash = verificationQuery.nullifier_hash;
  const merkle_root = verificationQuery.merkle_root;

  const options = {
    method: `POST`,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action_id: "wid_staging_8d03e4abe36eb721fdb8eaea4f8589b5",
      signal: "loginUser",
      proof: proof,
      nullifier_hash: nullifier_hash,
      merkle_root: merkle_root,
    }),
  };

  const verify = await fetch(
    `https://developer.worldcoin.org/api/v1/verify`,
    options
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Api is not available verifyID");
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

export async function getWeb3Signer() {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner(); //Verifies signer
  return signer;
}

export async function getWeb3Provider() {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  return provider;
}

export async function getLoans() {
  const GET_LOANS = `
  query MyQuery {
    explorePublications(
      request: { sources: ["LoanLand"], sortCriteria: LATEST, publicationTypes:[POST] }
    ) {
      items {
        ... on Post {
          id
          createdAt
          metadata {
            content
          }
          profile {
            handle
            ownedBy
            picture {
              ... on MediaSet {
                original {
                  url
                }
              }
            }
          }
        }
     
      }
    }
  }
  
  `;
  const result = await apolloClient.query({
    query: gql(GET_LOANS),
  });

  return result.data.explorePublications.items;
}

export async function getDetails(id) {
  const GET_DETAILS =
    `query Publication {
    publication(request: { publicationId: "` +
    id +
    `" }) {
      ... on Post {
        ...PostFields
      }
    }
  }
  
  fragment MediaFields on Media {
    url
    mimeType
  }
  
  fragment ProfileFields on Profile {
    id
  
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
  
    ownedBy
  }
  
  fragment MetadataOutputFields on MetadataOutput {
    name
  
    content
  }
  
  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
    }
  
    metadata {
      ...MetadataOutputFields
    }
    createdAt
  
    appId
  }
  `;
  const result = await apolloClient.query({
    query: gql(GET_DETAILS),
  });
  return result.data.publication;
}

export async function getProfileDetails(profileId) {
  return profileId;
}

export async function createProfile(jwt, formState, address) {
  console.log("Inside Create Profile with ", jwt, formState);

  const CREATE_PROFILE = `
  mutation($request: CreateProfileRequest!) { 
  
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason  
      }
			__typename
    }
 }
`;
  const client = new ApolloClient({
    uri: process.env.APIURL,
    cache: new InMemoryCache(),
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : "",
    },
  });
  const result = await client.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: {
        handle: formState.username,
        profilePictureUri: "uriProfile",
        followNFTURI: "uriNFT",
        /*   followModule: {
          emptyFollowModule: true,
        }, */
      },
    },
  });

  const resultPool = await pollUntilIndexed(
    client,
    result.data.createProfile.txHash,
    jwt
  );

  //console.log("create profile: profile has been indexed", result);

  const logs = resultPool.txReceipt.logs;

  const topicId = utils.id(
    "ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)"
  );

  const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId);

  let profileCreatedEventLog = profileCreatedLog.topics;

  const profileId = utils.defaultAbiCoder.decode(
    ["uint256"],
    profileCreatedEventLog[1]
  )[0];

  const profileID = BigNumber.from(profileId).toHexString();

  //const updateResult = await updateProfile(jwt, profileID, formState, "");

  const updateResult = await createSetProfileMetadataTypedData(
    jwt,
    profileID,
    formState,
    address,
    client
  );
  if (updateResult.transactionHash) return true;
  return false;
}

export async function createSetProfileMetadataTypedData(
  jwt,
  userId,
  formState,
  address,
  client
) {
  const CREATE_SET_PROFILE_METADATA_TYPED_DATA = `
  mutation($request: CreatePublicSetProfileMetadataURIRequest!) { 
    createSetProfileMetadataTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetProfileMetadataURIWithSig {
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
          metadata
        }
      }
    }
  }
`;
  /* 
  console.log(
    " 888 createSetProfileMetadataTypedData 888 values + address",
    jwt,
    userId,
    formState,
    address
  ); */
  const ipfsResult = await uploadIpfs<ProfileMetadata>({
    name: formState.nombre,
    /*  social: [
      {
        traitType: "string",
        value: formState.web,
        key: "website",
      },
      {
        traitType: "string",
        value: formState.twitter_handle,
        key: "twitter",
      },
    ], */
    bio: formState.bio,
    cover_picture:
      "https://timebusinessnews.com/wp-content/uploads/cash-loans-for-no-credit-feat-800x445.jpg",
    /*     location: formState.location, */
    attributes: [
      {
        traitType: "string",
        value: "LoanLand",
        key: "appID",
      },
    ],
    version: "1.0.0",
    metadata_id: uuidv4(),
  });
  console.log("create profile: ipfs result", ipfsResult);

  /*  const client = new ApolloClient({
    uri: process.env.APIURL,
    cache: new InMemoryCache(),
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : "",
    },
  }); */

  const createSetProfileMetadataTypedData = await client.mutate({
    mutation: gql(CREATE_SET_PROFILE_METADATA_TYPED_DATA),
    variables: {
      request: {
        profileId: userId,
        metadata: "ipfs://" + ipfsResult.path,
      },
    },
  });

  const typedData =
    createSetProfileMetadataTypedData.data.createSetProfileMetadataTypedData
      .typedData;

  const domain = omit(typedData.domain, "__typename");
  const types = omit(typedData.types, "__typename");
  const value = omit(typedData.value, "__typename");

  const signer = await getWeb3Signer();

  const signature = await signer._signTypedData(domain, types, value);

  console.log("create profile: signature", signature);

  const { v, r, s } = splitSignature(signature);

  const lensPeriphery = new ethers.Contract(
    process.env.LENS_PERIPHERY_CONTRACT,
    LENS_PERIPHERY_ABI,
    signer
  );

  console.log(
    "before setProfileMetadataURIWithSig ",
    address,
    userId,
    ipfsResult.path,
    typedData.value.deadline
  );
  const tx = await lensPeriphery.setProfileMetadataURIWithSig({
    user: address,
    profileId: userId,
    metadata: "ipfs://" + ipfsResult.path,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log("create profile metadata: tx hash", tx.hash);

  console.log("create profile metadata: poll until indexed");

  const resultPool = await pollUntilIndexed(client, tx.hash, jwt);

  console.log("create profile metadata: profile has been indexed", resultPool);

  const logs = resultPool.txReceipt.logs;

  console.log("create profile metadata: logs", logs);

  console.log("Returning metadata: txReceipt ", resultPool.txReceipt);

  return resultPool.txReceipt;
}

export async function updateProfileImage(jwt, userId, profileImageUrl) {
  const CREATE_SET_PROFILE_IMAGE_URI_TYPED_DATA = `
  mutation($request: UpdateProfileImageRequest!) { 
    createSetProfileImageURITypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          SetProfileImageURIWithSig {
            name
            type
          }
        }
        value {
          nonce
        	deadline
        	imageURI
        	profileId
        }
      }
    }
 }
`;
  const client = new ApolloClient({
    uri: process.env.APIURL,
    cache: new InMemoryCache(),
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : "",
    },
  });

  const setProfileImageUpdateTypedData = (setProfileImageTypedData: any) => {
    return client.mutate({
      mutation: gql(CREATE_SET_PROFILE_IMAGE_URI_TYPED_DATA),
      variables: {
        request: setProfileImageTypedData,
      },
    });
  };

  const setProfileImageUriRequest = {
    profileId: userId,
    url: profileImageUrl,
  };

  const result = await setProfileImageUpdateTypedData(
    setProfileImageUriRequest
  );

  const typedData = result.data.createSetProfileImageURITypedData.typedData;

  const domain = omit(typedData.domain, "__typename");
  const types = omit(typedData.types, "__typename");
  const value = omit(typedData.value, "__typename");

  const signer = await getWeb3Signer();

  const signature = await signer._signTypedData(domain, types, value);

  const { v, r, s } = splitSignature(signature);

  const lensHub = new ethers.Contract(
    process.env.LENS_HUB_CONTRACT,
    LENS_HUB_CONTRACT_ABI,
    signer
  );

  const tx = await lensHub.setProfileImageURIWithSig({
    profileId: typedData.value.profileId,
    imageURI: typedData.value.imageURI,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });

  const resultPool = await pollUntilIndexed(client, tx.hash, jwt);
  const logs = resultPool.txReceipt.logs;

  console.log("Image Profile Set: logs", logs);
  return tx.hash;
}

export async function refreshUser(address) {
  const user: Profile = {
    bio: "",
    ownedBy: "",
    handle: "",
    id: "",
    name: "",
    picture: {
      __typename: "",
      original: { __typename: "", mimeType: {} as JSON, url: "" },
    },
    coverPicture: {
      __typename: "",
      original: { __typename: "", mimeType: {} as JSON, url: "" },
    },

    __typename: "",

    dispatcher: {} as JSON,
    followModule: {} as JSON,

    stats: {
      __typename: "",
      totalCollects: 0,
      totalComments: 0,
      totalFollowers: 0,
      totalFollowing: 0,
      totalMirrors: 0,
      totalPosts: 0,
      totalPublications: 0,
    },
  };
  const profile = await getProfile(address);
  if (profile.data.profiles.items.length > 0) {
    user.bio = profile.data.profiles.items[0].bio;
    user.handle = profile.data.profiles.items[0].handle;
    user.id = profile.data.profiles.items[0].id;
    user.ownedBy = profile.data.profiles.items[0].ownedBy;
    user.name = profile.data.profiles.items[0].name;

    if (profile.data.profiles.items[0].picture) {
      user.picture.original.url =
        profile.data.profiles.items[0].picture.original.url;
    }
    return user;
  }
}

export async function burnProfile(jwt, userId) {
  const CREATE_BURN_PROFILE_TYPED_DATA = `
  mutation($request: BurnProfileRequest!) { 
    createBurnProfileTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          BurnWithSig {
            name
            type
          }
        }
        value {
          nonce
        	deadline
        	tokenId
        }
      }
    }
 }
`;

  const client = new ApolloClient({
    uri: process.env.APIURL,
    cache: new InMemoryCache(),
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : "",
    },
  });

  const createBurnProfileTypedData = await client.mutate({
    mutation: gql(CREATE_BURN_PROFILE_TYPED_DATA),
    variables: {
      request: { profileId: userId },
    },
  });

  console.log(
    "create follow createFollowTypedData",
    createBurnProfileTypedData
  );

  const typedData =
    createBurnProfileTypedData.data.createBurnProfileTypedData.typedData;
  console.log("create burn typed data", typedData);

  const domain = omit(typedData.domain, "__typename");
  const types = omit(typedData.types, "__typename");
  const value = omit(typedData.value, "__typename");

  const signer = await getWeb3Signer();

  const signature = await signer._signTypedData(domain, types, value);
  console.log("set burn profile: signature ", signature);

  const { v, r, s } = splitSignature(signature);
  const lensHub = new ethers.Contract(
    process.env.LENS_HUB_CONTRACT,
    LENS_HUB_CONTRACT_ABI,
    signer
  );
  const tx = lensHub.burnWithSig(typedData.value.tokenId, {
    v,
    r,
    s,
    deadline: typedData.value.deadline,
  });

  console.log("Profile deleted.");
}
