import React from "react";
import LoanCard from "../components/LoanCard";
import Box from "@mui/material/Box";
import { AppContext } from "../components/state/context";
import { useRouter } from "next/router";

import { useContext } from "react";
import { getLoans } from "../components/lib/api";
function Dashboard(props) {
  const router = useRouter();
  const context = useContext(AppContext);
  return (
    <Box height="100vh">
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="space-around"
        rowGap="10px"
        flexWrap="wrap"
      >
        {props.loans?.map((loan, index) => {
          let content = JSON.parse(loan.metadata.content);
          return (
            <a
              key={index}
              onClick={() => {
                router.push("/loans/" + loan.id);
              }}
            >
              <LoanCard
                key={index}
                interest={content.interest}
                handle={loan.profile.handle}
                reputation="5.0"
                amount={content.amount}
                days={content.loan_term}
                collateral="Collateral Required."
                picture={loan.profile?.picture?.original?.url}
              />
            </a>
          );
        })}
      </Box>
    </Box>
  );
}

Dashboard.layout = true;

export async function getServerSideProps() {
  const loans = await getLoans();
  return {
    props: { loans: loans },
  };
}

export default Dashboard;
