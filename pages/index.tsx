import Head from "next/head";
import { Button, Box } from "@mui/material";
import ReactPlayer from "react-player";
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
    <>
      <Head>
        <title>LoanLand</title>
        <meta
          name="description"
          content="LoanLand Powered by Superfluid and Lens."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ height: "100vh", background: "black", color: "white" }}>
        <Box sx={{ position: "absolute", width: "100vw", height: "100vh" }}>
          {" "}
          <ReactPlayer
            url="https://www.loan-land.com/wp-content/uploads/2021/06/video_v2.mp4"
            playing={true}
            muted={true}
            loop={true}
            width="100vw"
            height="100vh"
            position="absolute"
          />
        </Box>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a>LoanLand</a>
          </h1>

          <p className={styles.description}>
            {" "}
            <code className={styles.code}>
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
      </Box>
    </>
  );
}

export default Home;
