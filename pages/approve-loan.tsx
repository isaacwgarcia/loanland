import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { getLoansbyLender } from "../components/lib/loan";
import { AppContext } from "../components/state/context";
import { useContext } from "react";
import LoanCardToApprove from "../components/LoanCardToApprove";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

function ApproveLoan() {
  const router = useRouter();
  const context = useContext(AppContext);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getLoans = async () => {
      const data = await getLoansbyLender(context.state.profile.ownedBy);
      setLoans(data);
      setLoading(false);
      setComplete(true);
    };
    getLoans().catch(console.error);
  }, [complete]);

  return (
    <>
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
          flexDirection="column"
          width="100%"
          justifyContent="center"
          rowGap="15px"
          marginTop="10vh"
          flexWrap="wrap"
        >
          <b>Approve Loan</b>
          <br />
          {loans?.map((loan, index) => {
            console.log("Loan ", loan);
            return (
              <LoanCardToApprove
                key={index}
                address={loan.loanaddress}
                interest={loan.interest}
                reputation="5.0"
                amount={loan.amount}
                days={loan.duration}
                borrower={loan.borrower}
                id={loan.id}
              />
            );
          })}
        </Box>
      ) : (
        <Box
          height="80vh"
          marginTop="10vh"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          No Loans to approve.
        </Box>
      )}

      <Box display="flex" justifyContent="center" marginTop="15px">
        {" "}
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Go Back
        </Button>
      </Box>
    </>
  );
}

ApproveLoan.layout = true;

export default ApproveLoan;
