import React, { useContext, useState } from "react";
import { AppContext } from "./state/context";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { FormData, Profile } from "./lib/types";
import { createProfile, refreshUser } from "../components/lib/api";
import CircularProgress from "@mui/material/CircularProgress";
import VerifiedIcon from "@mui/icons-material/Verified";
import { loadProfile } from "./state/reducer";

export default function ProfileForm() {
  const session = useContext(AppContext);
  const { dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const router = useRouter();

  const data: FormData = { form_data: {} };
  const [formState, setFormState] = React.useState(data.form_data);

  async function handleCreate() {
    setLoading(true);
    const result = await createProfile(
      session.state.session.token.accessToken,
      formState,
      session.state.session.address
    );

    if (result) {
      console.log("before refreshing user");
      const user = await refreshUser(session.state.session.address);
      dispatch(loadProfile(user as Profile));
      setLoading(false);
      setComplete(true);
    }

    //TODO PUSH TO DASHBOARD ON CONFIRMATION
  }
  return (
    <Box display="flex" justifyContent="center" border="rounded" height="80vh">
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          border="rounded"
          height="80vh"
          mt="10vh"
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : complete ? (
        <Box
          display="flex"
          justifyContent="center"
          border="rounded"
          height="80vh"
          mt="10vh"
          flexDirection="column"
          justifyItems="center"
          alignContent="center"
          alignItems="center"
        >
          <VerifiedIcon />
          Congratulations - Lens Profile Created.
          <Button
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Dashboard
          </Button>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          my={2}
          height="75vh"
          width="75vw"
          padding="12px"
          fontSize="0.8rem"
        >
          <Box my={2}>
            <TextField
              label="Name"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["nombre"]: ev.target.value,
                })
              }
            />
          </Box>
          <Box my={2}>
            <TextField
              label="Username"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["username"]: ev.target.value,
                })
              }
            />
          </Box>

          <Box my={2}>
            <TextField
              label="Bio"
              onChange={(ev) =>
                setFormState({
                  ...formState,
                  ["bio"]: ev.target.value,
                })
              }
            />
          </Box>

          <Box display="flex" justifyContent="center" padding="2vw">
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Go Back
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              onClick={() => {
                handleCreate();
              }}
            >
              Create Profile
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
