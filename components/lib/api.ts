import { Session, Profile } from "./types";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const apolloClient = new ApolloClient({
  uri: process.env.APIURL,
  cache: new InMemoryCache(),
});

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
          throw new Error("Api is not available");
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
          throw new Error("Api is not available");
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
      throw new Error("Api is not available");
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
      throw new Error("Api is not available");
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
