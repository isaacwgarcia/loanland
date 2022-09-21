import React from "react";
import { Box, Rating, Divider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function Reputation() {
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  const value = 5; //TODO GRAB VALUE FROM SCORE
  return (
    <Box
      height="40vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Divider orientation="horizontal" flexItem />
      <br /> <br /> <br />
      Scoring Dashboard
      <br /> <br /> <br />
      Your score is new.
      <br /> <br />
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Rating
          name="text-feedback"
          value={value}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 2 }}>{labels[value]}</Box>
        <br /> <br /> {/*   TODO GRAB METRICS FROM SCORE */}
        Loans Open: 0<br />
        Loans Completed: 0<br />
        Loans Unpaid: 0<br />
      </Box>
    </Box>
  );
}
