import * as React from "react";
import { Box, Stack, Slider } from "@mui/material";

function valuetext(value) {
  return `${value}DAI`;
}

export default function AmountSlider() {
  const [value, setValue] = React.useState([0, 5000]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 250 }}>
      <b>Loan Amount</b>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        0&nbsp;&nbsp;&nbsp;
        <Slider
          getAriaLabel={() => "Loan Amount"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          step={10}
          marks
          min={0}
          max={10000}
          sx={{ color: "#1AB227" }}
          track="inverted"
        />
        <Box>10000 DAI</Box>
      </Stack>
    </Box>
  );
}
