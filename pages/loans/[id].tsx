import { Box, TextField, Button } from "@mui/material";
import { FormData } from "../../components/lib/types";
import { preApply } from "../../components/lib/loan";
import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import VerifiedIcon from "@mui/icons-material/Verified";

import React, { useState } from "react";
import { getDetails } from "../../components/lib/api";
import { useRouter } from "next/router";

function LoanPage(props) {
  const router = useRouter();
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = useState(data.form_data);
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  let content = JSON.parse(props.loan.metadata.content);
  let loan = props.loan;

  async function handleApplication(loan, formState) {
    setLoading(true);
    const response = await preApply(loan, formState);
    if (response.hash) {
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
          Congratulations - Your application has been sent.
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
          Amount {content.amount}&nbsp; InterestRate: {content.interest_rate}
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
              //href="/preApplyWID"
              onClick={() => {
                //preApplyVerification(); //WorldCoin
                handleApplication(loan, formState);
              }}
            >
              Pre - Application Process
            </Button>
          </Box>
        </Box>
      )}
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
