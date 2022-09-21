import { Box, TextField, Button } from "@mui/material";
import { FormData } from "../../components/lib/types";
import { preApply } from "../../components/lib/loan";
import { useContext } from "react";
import { AppContext } from "../../components/state/context";
import React from "react";
import { getDetails } from "../../components/lib/api";
import { useRouter } from "next/router";
function LoanPage(props) {
  const router = useRouter();
  const context = useContext(AppContext);
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = React.useState(data.form_data);

  let content = JSON.parse(props.loan.metadata.content);
  let loan = props.loan;

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="center"
      rowGap="10px"
      flexWrap="wrap"
      marginTop="10vh"
      flexDirection="column"
      alignItems="center"
    >
      Apply for a Loan - You can not exceed these conditions.
      <br /> <br />
      Amount: {content.amount}&nbsp; InterestRate: {content.interest_rate}
      %&nbsp; LoanTerm: {content.loan_term}.
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
      <Box>
        {" "}
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Go Back
        </Button>
        <Button
          onClick={() => {
            preApply(loan, formState);
          }}
        >
          Pre - Application Process
        </Button>
      </Box>
    </Box>
  );
}

export const getServerSideProps = async (context) => {
  const loan_details = await getDetails(context.params.id);
  return {
    props: {
      loan: loan_details,
    },
  };
};

LoanPage.layout = true;

export default LoanPage;
