import React from "react";
import Navbar from "../components/Navbar";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CheckIcon from "@mui/icons-material/Check";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
export default function Layout({ children }) {
  const router = useRouter();

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
        </Grid>

        <Grid height="85vh" item xs={12} sm={12} md={9} lg={9} xl={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
