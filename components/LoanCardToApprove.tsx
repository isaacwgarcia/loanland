import React, { useContext } from "react";
import { Card, Button, Typography, Box, CardContent } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import { approveLoan } from "../components/lib/loan";
import { AppContext } from "./state/context";

export default function LoanCardToApprove({
  address,
  interest,
  borrower,
  reputation,
  amount,
  days,
  id,
}) {
  const context = useContext(AppContext);
  return (
    <Card
      sx={{
        width: 300,
        padding: "20px",
        borderRadius: "30px",
      }}
      elevation={11}
    >
      <Typography
        gutterBottom
        variant="h6"
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        Interest Rate&nbsp;<b>{interest}%</b>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
      <CardContent>
        {borrower ? borrower?.slice(0, 4) : ""}...
        {borrower ? borrower.slice(30, borrower.length) : ""}
        <Typography variant="body2" color="text.secondary">
          Reputation&nbsp;<b>{reputation}</b>
          <StarIcon />
          <br />
          Amount <b>{amount} DAI</b>
          <br /> Term <b>{days} months</b>
          <br />
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ color: "red" }}
            onClick={() => {
              approveLoan(id, address, context.state.session.token.accessToken); //TODO APPROVE AND LEND CONFIRMATION PAGE
            }}
          >
            Approve
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
