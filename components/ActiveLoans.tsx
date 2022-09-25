import React, { useEffect, useState, useContext } from "react";
import { getActiveLoansbyBorrower } from "./lib/loan";
import { AppContext } from "./state/context";

const ActiveLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setLoaded(false);
      let loans = await getActiveLoansbyBorrower(context.state.session.address);
      if (loans.length > 0) {
        setLoaded(true);
        setLoans(loans);
        //console.log("Active borrowers loans: ", loans);
      }
    })();
  }, []);

  if (loans.length == 0) return <>No active loans.</>;

  return (
    <div>
      {loaded ? (
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
        <></>
      )}
    </div>
  );
};
export default ActiveLoans;
