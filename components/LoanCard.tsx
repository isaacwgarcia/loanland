import React from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

export default function LoanCard({
  interest,
  handle,
  reputation,
  amount,
  days,
  collateral,
  id,
}) {
  let url = "https://picsum.photos/200/300?random=" + id;
  return (
    <Card
      sx={{
        width: 300,
        padding: "15px",
        borderBottomRightRadius: "80px 80px",
      }}
      elevation={7}
    >
      <Typography
        gutterBottom
        variant="h6"
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        APR&nbsp;<b>{interest}</b>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <Avatar alt="User" src={url} sx={{ width: 150, height: 150 }} />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          @{handle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reputation&nbsp;<b>{reputation}</b>
          <StarIcon />
          <br />
          Amount: <b>{amount}</b>
          <br /> Term: <b>{days}mo</b>
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
