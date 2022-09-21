import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { AppContext } from "../components/state/context";
import { useContext } from "react";
import { FormData } from "../components/lib/types";
import { useRouter } from "next/router";

function PayAdvance() {
  const context = useContext(AppContext);
  const data: FormData = { form_data: {} };
  const [loans, setLoans] = useState([]); //TODO GET OPEN LOANS TO PAY
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {}, [loaded]);

  return (
    <Box
      height="80vh"
      marginTop="10vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      Pay in advance.
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

PayAdvance.layout = true;

export default PayAdvance;
