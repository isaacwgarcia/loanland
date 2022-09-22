import React from "react";
import {
  Card,
  Button,
  Typography,
  Avatar,
  Box,
  CardContent,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import { approveLoan } from "../components/lib/loan";
export default function LoanCardToApprove({
  address,
  interest,
  handle,
  reputation,
  amount,
  days,
  collateral,
  picture,
}) {
  return (
    <Card
      sx={{
        width: 300,
        padding: "15px",
        borderRadius: "30px",
      }}
      elevation={7}
    >
      <Typography
        gutterBottom
        variant="h6"
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        Interest Rate&nbsp;<b>{interest}%</b>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar alt="User" src={picture} sx={{ width: 150, height: 150 }} />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          @{handle}
        </Typography>
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
              approveLoan(address); //TODO APPROVE AND LEND CONFIRMATION PAGE
            }}
          >
            Approve
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
