import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { createLoan } from "../components/lib/loan";
import { AppContext } from "../components/state/context";
import { useContext } from "react";
import { FormData } from "../components/lib/types";

function CreateProfile() {
  const context = useContext(AppContext);

  return <Box height="100vh">Create Profile.</Box>;
}
CreateProfile.layout = true;

export default CreateProfile;
