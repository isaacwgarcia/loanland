import { Session, Token } from "./types";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const apolloClient = new ApolloClient({
  uri: process.env.APIURL,
  cache: new InMemoryCache(),
});

export async function login(): Promise<Session | boolean> {
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

      const token = authenticate as Token;
      if (token) {
        console.log("Lens_Token", token);
      }
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
    jwt: accessTokens.data.authenticate.accessToken,
    // @ts-ignore: Object is possibly 'null'.
    address: String(address),
  };
  return session;
}
