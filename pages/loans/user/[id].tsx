import { Box, Button } from "@mui/material";
import { getLoanOffers } from "../../../components/lib/loan";
import { useContext } from "react";
import { AppContext } from "../../../components/state/context";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import OffersLoans from "../../../components/OffersLoans";

function LoanOffers(props) {
  const router = useRouter();
  const context = useContext(AppContext);

  const [loaded, setLoaded] = useState(false);
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    const getLoans = async () => {
      const data = await getLoanOffers(
        context.state.session.token.accessToken,
        context.state.profile.id
      );

      setLoans(data.publications.items);
      setLoaded(true);
    };
    getLoans().catch(console.error);
  }, [loaded]);
  console.log("loans", loans);
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
      <b> Loan Offers</b>
      <br />
      <br />{" "}
      {loans?.map((loan, index) => {
        let content = JSON.parse(loan.metadata.content);
        return (
          <OffersLoans
            key={index}
            interest={content.interest_rate}
            amount={content.amount}
            days={content.loan_term}
            picture={loan.profile?.picture?.original?.url}
            id={loan.id}
          />
        );
      })}
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

LoanOffers.layout = true;

export default LoanOffers;
