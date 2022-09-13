import React from "react";
import { Box, Button } from "@mui/material";
import { createLoan } from "../components/lib/loan";
import { AppContext } from "../components/state/context";
import { useContext } from "react";

function CreateLoan() {
  const context = useContext(AppContext);

  const accessToken = context.state.session.token.accessToken;
  const userId = context.state.profile.id;
  const description = {
    amount: 10000,
    interest_rate: 10,
    loan_term: 72,
  };
  async function handleLoan(accessToken, userId, description) {
    const response = await createLoan(accessToken, userId, description);
    console.log("Final Response from Loan", response);
  }
  return (
    <Box height="100vh">
      <Button
        onClick={() => {
          console.log("Creating Loan");
          handleLoan(accessToken, userId, description);
        }}
      >
        Create Loan
      </Button>
    </Box>
  );
}
CreateLoan.layout = true;

export default CreateLoan;
