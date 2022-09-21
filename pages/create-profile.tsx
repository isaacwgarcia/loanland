import React from "react";
import { Box } from "@mui/material";
import ProfileForm from "../components/ProfileForm";

function CreateProfile() {
  return (
    <Box height="100vh">
      <ProfileForm />
    </Box>
  );
}
CreateProfile.layout = true;

export default CreateProfile;
