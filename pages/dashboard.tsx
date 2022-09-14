import React from "react";
import LoanCard from "../components/LoanCard";
import Box from "@mui/material/Box";
import { AppContext } from "../components/state/context";
import { useRouter } from "next/router";

import { useContext } from "react";
function Dashboard() {
  const router = useRouter();
  const context = useContext(AppContext);

  //console.log("Context State >>", context.state);
  return (
    <Box height="100vh">
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="space-around"
        rowGap="10px"
        flexWrap="wrap"
      >
        <a
          onClick={() => {
            router.push("/loans/1"); //TODO GRABID FROM POST
          }}
        >
          <LoanCard
            interest="12%"
            handle="isaacwgarcia"
            reputation="5.0"
            amount="1000$-5000$"
            days="60"
            collateral="Collateral Required."
            id="3"
          />
        </a>
        <a
          onClick={() => {
            router.push("/loans/1");
          }}
        >
          <LoanCard
            interest="18%"
            handle="johndoe"
            reputation="5.0"
            amount="1000$-5000$"
            days="60"
            collateral="Collateral Required."
            id="4"
          />
        </a>
        <a
          onClick={() => {
            router.push("/loans/1");
          }}
        >
          <LoanCard
            interest="9%"
            handle="gavinbelson"
            reputation="5.0"
            amount="1000$-1500$"
            days="60"
            collateral="Collateral Required."
            id="5"
          />
        </a>
        <a
          onClick={() => {
            router.push("/loans/1");
          }}
        >
          <LoanCard
            interest="9%"
            handle="testuser"
            reputation="5.0"
            amount="1000$-1500$"
            days="60"
            collateral="Collateral Required."
            id="6"
          />
        </a>
      </Box>
    </Box>
  );
}

Dashboard.layout = true;

export default Dashboard;
