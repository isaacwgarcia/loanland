import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import styles from "../styles/Home.module.css";
import { login } from "../components/lib/api";
import { Session } from "../components/lib/types";

export default function Home() {
  async function handleLogin() {
    //TODO - Auth Test
    const session = (await login()) as Session;
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
