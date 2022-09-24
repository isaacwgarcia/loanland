import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { getLoansbyLender } from "../components/lib/loan";
import { AppContext } from "../components/state/context";
import { useContext } from "react";
import LoanCardToApprove from "../components/LoanCardToApprove";
import { useRouter } from "next/router";

function ApproveLoan() {
  const router = useRouter();
  const context = useContext(AppContext);
  const [loans, setLoans] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getLoans = async () => {
      const data = await getLoansbyLender(context.state.profile.ownedBy);
      setLoans(data);
      setLoaded(true);
    };
    getLoans().catch(console.error);
  }, [loaded]);

  if (loans.length == 0)
    return (
      <Box
        height="80vh"
        marginTop="10vh"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        No Loans to approve.
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Go Back
        </Button>
      </Box>
    );

  return (
    <>
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
      </Box>{" "}
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
