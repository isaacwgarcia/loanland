import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Box } from "@mui/material";
import styles from "../styles/Home.module.css";
import { login } from "../components/lib/api";
import { Session } from "../components/lib/types";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});
export default function Home() {
  async function handleLogin() {
    //TODO - Auth Test
    const session = (await login()) as Session;
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
