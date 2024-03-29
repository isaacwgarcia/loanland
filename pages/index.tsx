import Head from "next/head";
import { Box, Button } from "@mui/material";
import styles from "../styles/Home.module.css";
import { loginAPI, getProfileAPI, verifyOnChain } from "../components/lib/api";
import { Session, Profile } from "../components/lib/types";
import { useContext } from "react";
import { AppContext } from "../components/state/context";
import { loadSession, loadProfile } from "../components/state/reducer";
import { useRouter } from "next/router";
import { WidgetProps } from "@worldcoin/id";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const actionId = process.env.WORLDID_ONCHAIN;
  const WorldIDWidget = dynamic<WidgetProps>(
    () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
    { ssr: false }
  );
  const ReactPlayer = dynamic(() => import("react-player"), {
    ssr: false,
  });

  const router = useRouter();
  const { dispatch } = useContext(AppContext);
  const context = useContext(AppContext);

  async function handleLogin() {
    const session = (await loginAPI()) as Session;
    if (session) {
      dispatch(loadSession(session));
      const profile = await getProfileAPI(session.address);
      dispatch(loadProfile(profile as Profile));
      if (context.state.session.token.accessToken) {
        router.push("/dashboard");
      }
    }
  }

  async function verification(verificationResponse) {
    return await verifyOnChain(verificationResponse);
    /*   console.log("Value", value);
    if (value) return true;
    else return false; */
    /* const options = {      Verification OnCloud 
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(verificationResponse),
    };
    const verification = await fetch(`api/ppp/verify`, options)  
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
        throw new Error("Api is not available ppp verification");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
      return verification.success;
 */
  }
  return (
    <>
      <Head>
        <title>ManuFI</title>
        <meta
          name="description"
          content="ManuFI Powered by Superfluid and Lens."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ height: "100vh", background: "black", color: "white" }}>
        <Box sx={{ position: "absolute", width: "100vw", height: "100vh" }}>
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
          <h1 className={styles.title}>ManuFI</h1>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </Button>
          <br />
          <WorldIDWidget
            actionId={actionId}
            signal="loginUser"
            enableTelemetry
            onSuccess={(verificationResponse) => {
              verification(verificationResponse).then((response) => {
                if (response) handleLogin();
              });
            }}
            onError={(error) => {
              console.error("We couldn't verify your identity.", error);
            }}
          />
        </main>
        <Box
          style={{
            display: "flex",
            position: "relative",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
            zIndex: 15,
          }}
        >
          <Link href="https://ethglobal.com/showcase/manufi-yonr7">
            <a href="https://ethglobal.com/showcase/manufi-yonr7">
              <Image
                alt="EthGlobal Hackaton 2022"
                src="/ethglobal.svg"
                width="250"
                height="200"
                layout="fixed"
              />
            </a>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Home;
