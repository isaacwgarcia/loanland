import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { createLoan } from "../components/lib/loan";
import { AppContext } from "../components/state/context";
import { useContext } from "react";
import { FormData } from "../components/lib/types";

function CreateLoan() {
  const context = useContext(AppContext);
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = React.useState(data.form_data);
  const accessToken = context.state.session.token.accessToken;
  const userId = context.state.profile.id;

  async function handleLoan(accessToken, userId, formState) {
    const response = await createLoan(accessToken, userId, formState);
    //console.log("Final Response from Loan", response);
  }
  return (
    <Box height="100vh">
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
      <Button
        onClick={() => {
          //console.log("Creating Loan with", formState);
          handleLoan(accessToken, userId, formState);
        }}
      >
        Create Loan
      </Button>
    </Box>
  );
}
CreateLoan.layout = true;

export default CreateLoan;
