import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { createLoan } from "../components/lib/loan";
import { AppContext } from "../components/state/context";
import { useContext } from "react";
import { FormData } from "../components/lib/types";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import VerifiedIcon from "@mui/icons-material/Verified";

function CreateLoan() {
  const router = useRouter();
  const context = useContext(AppContext);
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = React.useState(data.form_data);
  const accessToken = context.state.session.token.accessToken;
  const userId = context.state.profile.id;
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  async function handleLoan(accessToken, userId, formState) {
    setLoading(true);
    const response = await createLoan(accessToken, userId, formState);

    if (response) {
      setLoading(false);
      setComplete(true);
    }
  }
  return (
    <Box display="flex" justifyContent="center" border="rounded" height="80vh">
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          border="rounded"
          height="80vh"
          mt="10vh"
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : complete ? (
        <Box
          display="flex"
          justifyContent="center"
          border="rounded"
          height="80vh"
          mt="10vh"
          flexDirection="column"
          justifyItems="center"
          alignContent="center"
          alignItems="center"
        >
          <VerifiedIcon />
          Congratulations - Loan Created.
          <Button
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Dashboard
          </Button>
        </Box>
      ) : (
        <Box
          height="80vh"
          marginTop="10vh"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <b>Describe your Loan Terms </b> <br />
          <br />
          <Box my={2}>
            <TextField
              label="Max. Amount"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["amount"]: ev.target.value,
                })
              }
            />
          </Box>
          <Box my={2}>
            <TextField
              label="Interest Rate"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["interest"]: ev.target.value,
                })
              }
            />
          </Box>
          <Box my={2}>
            <TextField
              label="Loan Term Months"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["duration"]: ev.target.value,
                })
              }
            />
          </Box>
          <br />
          <Box display="flex">
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Go Back
            </Button>
            <Button
              onClick={() => {
                handleLoan(accessToken, userId, formState);
              }}
            >
              Create Loan
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
CreateLoan.layout = true;

export default CreateLoan;
