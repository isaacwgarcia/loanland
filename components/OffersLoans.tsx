import React, { useContext } from "react";
import {
  Box,
  Button,
  Avatar,
  CardContent,
  Card,
  Typography,
} from "@mui/material";
import { removeOffer } from "./lib/loan";
import { AppContext } from "./state/context";

export default function OffersLoans({ interest, amount, days, picture, id }) {
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
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        Interest Rate&nbsp;<b>{interest}%</b>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <Avatar alt="User" src={picture} sx={{ width: 250, height: 50 }} />
      </Box>
      <CardContent>
        <Typography gutterBottom component="div"></Typography>
        <Typography variant="body2" color="text.secondary">
          Amount <b>{amount} DAI</b>
          <br /> Term <b>{days} months</b>
          <br />
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button
            color="error"
            onClick={() => {
              removeOffer(id, context.state.session.token.accessToken);
            }}
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
