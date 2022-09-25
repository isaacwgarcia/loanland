import React, { useEffect, useState, useContext } from "react";
import { getActiveLoansbyBorrower } from "./lib/loan";
import { AppContext } from "./state/context";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const ActiveLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setLoaded(false);
      let loans = await getActiveLoansbyBorrower(context.state.session.address);
      if (loans.length > 0) {
        setLoaded(true);
        setLoading(false);
        setLoans(loans);
        //console.log("Active borrowers loans: ", loans);
      }
    })();
  }, []);

  return (
    <div>
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
      ) : loaded ? (
        <>
          {loans?.map((loan, index) => {
            return (
              <>
                <br />
                {loan.loanaddress}&nbsp;-&nbsp;{loan.amountRemaining}
                &nbsp;DAI&nbsp;-&nbsp;
                {loan.duration}&nbsp;months&nbsp;-&nbsp;
                {loan.interest}%
              </>
            );
          })}
        </>
      ) : (
        <>No active loans.</>
      )}
    </div>
  );
};
export default ActiveLoans;
