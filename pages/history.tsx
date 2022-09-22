import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { getLoansbyLender } from "../components/lib/loan";
import { AppContext } from "../components/state/context";
import { useContext } from "react";
import { FormData } from "../components/lib/types";
import LoanCardToApprove from "../components/LoanCardToApprove";
import { useRouter } from "next/router";
function History() {
  const router = useRouter();
  const context = useContext(AppContext);
  const data: FormData = { form_data: {} };
  const [loans, setLoans] = useState([]);
  const [loaded, setLoaded] = useState(false); //TODO GET LOANS HISTORY OF THE BORROWER

  useEffect(() => {}, [loaded]);

  return (
    <Box
      height="80vh"
      marginTop="10vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <br /> <br /> <br />
      <b> Open Loans</b>
      <br /> <br /> <br />
      <b> Loans Completed </b>
      <br /> <br /> <br />
      <b> Loans Unpaid</b>
      <br /> <br /> <br />
      <Button
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Go Back
      </Button>
    </Box>
  );
}

History.layout = true;

export default History;
