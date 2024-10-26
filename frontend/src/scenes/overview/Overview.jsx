import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";

function Overview() {
  const [view, setView] = useState("units");
  return (
    <Box m='1.2rem 2rem'>
      <Header
        title="Overview"
        subtitle="Overview of general revenue and profit"
      />
      <Box mt="2rem" height="70vh" p="1rem">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="view-select-label">View</InputLabel>
          <Select
            labelId="view-select-label"
            id="view-select"
            value={view}
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="units">Units</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
}

export default Overview;
