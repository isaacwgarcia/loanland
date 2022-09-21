import React, { useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import { FormData } from "./lib/types";
import { IPFS_CLIENT } from "./lib/ipfs";
import { AppContext } from "./state/context";
import { useRouter } from "next/router";
import { updateProfileImage } from "./lib/api";
import CircularProgress from "@mui/material/CircularProgress";
import { getProfile } from "./lib/api";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function ProfileImageForm() {
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = React.useState(data.form_data);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();
  const session = useContext(AppContext);

  async function updatePicture() {
    setLoading(true);
    const resultTx = await updateProfileImage(
      session.state.session.token.accessToken,
      session.state.profile.id,
      formState.profile_picture
    );

    console.log("updatePicture result TX ", resultTx);
    if (resultTx.length > 1) {
      const profile = await getProfile(session?.state.session.address);

      console.log("Reload User >>"); //TODO RELOAD USER AFTER UPLOAD
    }
  }

  async function uploadFile(e) {
    const dedicatedEndPoint = process.env.INFURA_ENDPOINT;
    const file = e.target.files[0];
    try {
      const added = await IPFS_CLIENT.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });

      const url = `${dedicatedEndPoint}${added.path}`;
      console.log("URL> ", url);
      setFormState({
        ...formState,
        ["profile_picture"]: url,
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        justifyContent="center"
        border="rounded"
        height="30vh"
        mt="5vh"
      >
        {!loading ? (
          <Box
            display="flex"
            flexDirection="column"
            my={2}
            height="75vh"
            width="75vw"
            padding="12px"
            fontSize="0.8rem"
          >
            <Box my={0}>
              <b>Profile Picture</b>
              <br /> <br />
              <input type="file" name="Asset" onChange={uploadFile} />
            </Box>
            <br />

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
                  updatePicture();
                }}
              >
                Update Image
              </Button>
            </Box>
          </Box>
        ) : uploaded ? (
          <Box
            display="flex"
            flexDirection="column"
            my={2}
            padding="12px"
            fontSize="0.8rem"
            alignContent="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              fontSize="0.8rem"
              width="100vw"
              alignContent="center"
              alignItems="center"
            >
              <VerifiedIcon />
              <br />
              Profile Updated.
              <br />
              <br />
              <Button
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                Go Back
              </Button>
            </Box>
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
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
}
