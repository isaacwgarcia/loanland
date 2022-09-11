import "../styles/globals.css";
import Layout from "../components/Layout";
import { AppContext } from "../components/state/context";
import { appReducer } from "../components/state/reducer";
import { initialState } from "../components/state/state";
import { useReducer } from "react";

function LoanLandApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {Component.layout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </AppContext.Provider>
  );
}

export default LoanLandApp;
