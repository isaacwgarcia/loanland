import React from "react";
import Navbar from "../components/Navbar";
import { Grid, Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CheckIcon from "@mui/icons-material/Check";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../components/state/context";

export default function Layout({ children }) {
  const context = useContext(AppContext);
  const router = useRouter();
  const profileId = context.state.profile.id as string;

  return (
    <>
      <Navbar />
      <Grid container spacing={3} width="auto">
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "90vh",
          }}
        >
          <Button
            style={{
              color: "#1AB227",
              cursor: "pointer",
              background: "#F0F9F0",
              width: "50%",
            }}
            onClick={() => {
              router.push("/create-profile");
            }}
          >
            <b>
              <NoteAddIcon />
              &nbsp; Create Profile
            </b>
          </Button>
          <Button
            style={{
              color: "#1AB227",
              cursor: "pointer",
              background: "#F0F9F0",
              width: "50%",
            }}
            onClick={() => {
              router.push("/my-profile");
            }}
          >
            <b>
              <AccountBoxIcon />
              &nbsp; My Profile
            </b>
          </Button>
          <Button
            style={{
              color: "#1AB227",
              cursor: "pointer",
              background: "#F0F9F0",
              width: "50%",
            }}
            onClick={() => {
              router.push("/create-loan");
            }}
          >
            <b>
              <AttachMoneyIcon />
              Create a Loan
            </b>
          </Button>
          <Button
            style={{
              color: "#1AB227",
              cursor: "pointer",
              background: "#F0F9F0",
              width: "50%",
            }}
            onClick={() => {
              router.push("/loans/user/" + `${profileId}`);
            }}
          >
            <b>
              <LocalOfferIcon />
              &nbsp; Your Offers
            </b>
          </Button>
          <Button
            style={{
              color: "#1AB227",
              cursor: "pointer",
              background: "#F0F9F0",
              width: "50%",
            }}
            onClick={() => {
              router.push("/approve-loan");
            }}
          >
            <b>
              <CheckIcon />
              Approve Loan
            </b>
          </Button>
          <Button
            style={{
              color: "#1AB227",
              cursor: "pointer",
              background: "#F0F9F0",
              width: "50%",
            }}
            onClick={() => {
              router.push("/pay-advance");
            }}
          >
            <b>
              <CloseFullscreenIcon />
              Pay in advance
            </b>
          </Button>
          <Button
            style={{
              color: "#1AB227",
              cursor: "pointer",
              background: "#F0F9F0",
              width: "50%",
            }}
            onClick={() => {
              router.push("/history");
            }}
          >
            <b>
              <ManageHistoryIcon />
              &nbsp;Your History
            </b>
          </Button>

          <Box display="flex" flexDirection="column">
            <b>Powered by</b>
            <Image
              alt="superfluid logo"
              src="/superfluid.png"
              width="120"
              height="50"
              layout="intrinsic"
            />
          </Box>
        </Grid>

        <Grid height="85vh" item xs={12} sm={12} md={9} lg={9} xl={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
