import * as React from "react";
import {
  Box,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

export default function LoanTerm() {
  return (
    <Box sx={{ width: 500 }}>
      <b>Loan Term</b>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            sx={{ color: "black" }}
            control={<Checkbox color="success" defaultChecked />}
            label="6 Months"
          />
          <FormControlLabel
            sx={{ color: "black" }}
            control={<Checkbox color="success" defaultChecked />}
            label="12 Months"
          />{" "}
          <FormControlLabel
            sx={{ color: "black" }}
            control={<Checkbox color="success" defaultChecked />}
            label="24 Months"
          />
        </FormGroup>{" "}
        <Button color="success" variant="contained">
          Search
        </Button>
      </Stack>
    </Box>
  );
}
