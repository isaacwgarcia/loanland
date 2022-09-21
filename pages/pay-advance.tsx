import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { getLoansbyLender } from "../components/lib/loan";
import { AppContext } from "../components/state/context";
import { useContext } from "react";
import { FormData } from "../components/lib/types";
import LoanCardToApprove from "../components/LoanCardToApprove";

function PayAdvance() {
  const context = useContext(AppContext);
  const data: FormData = { form_data: {} };
  const [loans, setLoans] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {}, [loaded]);

  return <Box height="100vh"></Box>;
}

PayAdvance.layout = true;

export default PayAdvance;
