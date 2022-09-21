import React from "react";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { AppContext } from "../components/state/context";
import { useContext } from "react";

export default function Navbar() {
  const context = useContext(AppContext);
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
        {context.state.profile.ownedBy
          ? context.state.profile.ownedBy
          : "You don't own a Lens Profile"}
        &nbsp;&nbsp;&nbsp;{" "}
        <Avatar
          alt="User"
          src={
            context.state.profile?.picture?.original?.url
              ? (context.state.profile?.picture?.original?.url as string)
              : "https://picsum.photos/200/300?random=1"
          }
          sx={{ width: 56, height: 56 }}
        />
      </Box>
    </Box>
  );
}
