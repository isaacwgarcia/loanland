import React from "react";
import LoanCard from "../components/LoanCard";
import Box from "@mui/material/Box";
import { AppContext } from "../components/state/context";

import { useContext } from "react";
function Dashboard() {
  const context = useContext(AppContext);
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
        <LoanCard
          interest="12%"
          handle="isaacwgarcia"
          reputation="5.0"
          amount="1000$-5000$"
          days="60"
          collateral="Collateral Required."
          id="3"
        />
        <LoanCard
          interest="18%"
          handle="samhill"
          reputation="5.0"
          amount="1000$-5000$"
          days="60"
          collateral="Collateral Required."
          id="4"
        />
        <LoanCard
          interest="9%"
          handle="gavinbelson"
          reputation="5.0"
          amount="1000$-1500$"
          days="60"
          collateral="Collateral Required."
          id="5"
        />
        <LoanCard
          interest="9%"
          handle="testuser"
          reputation="5.0"
          amount="1000$-1500$"
          days="60"
          collateral="Collateral Required."
          id="6"
        />
      </Box>
    </Box>
  );
}

Dashboard.layout = true;

export default Dashboard;
