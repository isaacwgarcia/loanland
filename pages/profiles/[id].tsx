import { Box, TextField, Button } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../components/state/context";
import React from "react";
import { getProfileDetails } from "../../components/lib/api";

function ProfilePage(props) {
  const context = useContext(AppContext);

  let content = JSON.parse(props.profile);

  return <>Profile Page</>;
}

export const getServerSideProps = async (context) => {
  const profile_details = await getProfileDetails(context.params.id);
  return {
    props: {
      profile: profile_details,
    },
  };
};

ProfilePage.layout = true;

export default ProfilePage;
