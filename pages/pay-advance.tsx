import React from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import ActiveLoans from "../components/ActiveLoans";

function PayAdvance() {
  const router = useRouter();

  return (
    <Box
      height="80vh"
      marginTop="10vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <b> Pay in advance</b>
      <br />
      <ActiveLoans />
      <br /> <br /> <br /> <br />
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
