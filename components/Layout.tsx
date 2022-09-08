import React from "react";
import Navbar from "../components/Navbar";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Grid container spacing={3} width="auto" padding="1vw">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Button
            style={{
              color: "#1AB227",
              cursor: "pointer",
              background: "#F0F9F0",
              width: "100%",
            }}
            onClick={() => {
              router.push("/create-loan");
            }}
          >
            <b>
              <AttachMoneyIcon />
              Create a Loan
            </b>
          </Button>
        </Grid>

        <Grid height="85vh" item xs={12} sm={12} md={9} lg={9} xl={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
