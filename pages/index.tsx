import Head from "next/head";
import Image from "next/image";
import Button from "@mui/material/Button";
import styles from "../styles/Home.module.css";
import { loginAPI, getProfileAPI } from "../components/lib/api";
import { Session, Profile } from "../components/lib/types";
import { useContext } from "react";
import { AppContext } from "../components/state/context";
import { loadSession, loadProfile } from "../components/state/reducer";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const { dispatch } = useContext(AppContext);
  const context = useContext(AppContext);

  if (context.state.session.token.accessToken) {
    router.push("/dashboard");
  }

  async function handleLogin() {
    const session = (await loginAPI()) as Session;
    if (session) {
      dispatch(loadSession(session));
      const profile = await getProfileAPI(session.address);
      dispatch(loadProfile(profile as Profile));
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>LoanLand</title>
        <meta
          name="description"
          content="LoanLand Powered by Superfluid and Lens."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>LoanLand</a>
        </h1>

        <p className={styles.description}>
          {" "}
          <code className={styles.code}>
            {" "}
            <Button
              onClick={() => {
                handleLogin();
              }}
            >
              Login{" "}
            </Button>
          </code>{" "}
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export default Home;
