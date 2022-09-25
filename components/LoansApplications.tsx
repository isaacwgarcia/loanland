import React, { useEffect, useState, useContext } from "react";
import { getLoansbyBorrower } from "../components/lib/loan";
import { AppContext } from "../components/state/context";

const LoansApplications = () => {
  const [loans, setLoans] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setLoaded(false);
      let loans = await getLoansbyBorrower(context.state.session.address);
      if (loans.length > 0) {
        setLoaded(true);
        setLoans(loans);
        console.log("borrowers loans: ", loans);
      }
    })();
  }, []);
  return (
    <div>
      {loaded ? (
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
