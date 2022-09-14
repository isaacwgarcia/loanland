import { Box, TextField, Button } from "@mui/material";
import { FormData } from "../../components/lib/types";
import { preApply } from "../../components/lib/loan";
import { useContext } from "react";
import { AppContext } from "../../components/state/context";
import React from "react";

function LoanPage(props) {
  const context = useContext(AppContext);
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = React.useState(data.form_data);
  const accessToken = context.state.session.token.accessToken;
  //console.log("Loan Page ", context.state);

  return (
    <>
      Apply for a Loan - You can not exceed these conditions.
      <br /> <br />
      Amount: 10000&nbsp; InterestRate: 10%&nbsp; LoanTerm: 72.
      <Box my={2}>
        <TextField
          label="Employer Address"
          onChange={(ev) =>
            setFormState({
              ...formState,
              ["employer_address"]: ev.target.value,
            })
          }
        />
      </Box>
      <Box my={2}>
        <TextField
          label="Amount"
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
          label="Months"
          onChange={(ev) =>
            setFormState({
              ...formState,
              ["months"]: ev.target.value,
            })
          }
        />
      </Box>
      <Button
        onClick={() => {
          console.log("Applying with ", formState);
          preApply();
        }}
      >
        Pre - Application Process
      </Button>
    </>
  );
}

export const getServerSideProps = async (context) => {
  //TODO Retrieve LOAN DETAILS
  return {
    props: {},
  };
};

LoanPage.layout = true;
export default LoanPage;
