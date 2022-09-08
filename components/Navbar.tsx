import React from "react";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function Navbar() {
  return (
    <Box
      sx={{
        display: "flex",
        background: "#1AB227",
        color: "white",
        width: "100vw",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          width: "100vw",
          padding: "1vw",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        0xd0b95E27E9f789Bb2Eb7b2675Aa938a3a1A870Eb&nbsp;&nbsp;&nbsp;
        <Avatar
          alt="User"
          src="https://picsum.photos/200/300?random=1"
          sx={{ width: 56, height: 56 }}
        />
      </Box>
    </Box>
  );
}
