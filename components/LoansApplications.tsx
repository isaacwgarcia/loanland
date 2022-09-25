import React, { useEffect, useState, useContext } from "react";
import { getLoansbyBorrower } from "../components/lib/loan";
import { AppContext } from "../components/state/context";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const LoansApplications = () => {
  const [loans, setLoans] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setLoaded(false);
      let loans = await getLoansbyBorrower(context.state.session.address);
      if (loans.length > 0) {
        setLoading(false);
        setLoaded(true);
        setLoans(loans);
        console.log("borrowers loans: ", loans);
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
              <div key={index}>
                <br />
                {loan.loanaddress}&nbsp;-&nbsp;{loan.amount}
                &nbsp;DAI&nbsp;-&nbsp;
                {loan.duration}&nbsp;months&nbsp;-&nbsp;
                {loan.interest}%
              </div>
            );
          })}
        </>
      ) : (
        <>
          <br /> <br />
          No applications found.
        </>
      )}
    </div>
  );
};
export default LoansApplications;
