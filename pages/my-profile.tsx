import React from "react";
import ProfileImageForm from "../components/ProfileImageForm";
import Reputation from "../components/Reputation";

function MyProfile() {
  return (
    <>
      <ProfileImageForm />
      <Reputation />
    </>
  );
}

MyProfile.layout = true;

export default MyProfile;
