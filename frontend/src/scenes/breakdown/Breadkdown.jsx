import React from 'react';
import { Box } from "@mui/material";
import Header from 'components/Header';
import BreakdownChart from "components/BreakdownChart";

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Breakdown" subtitle="Chart of breakdown data" />
      <Box height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
}

export default Breakdown;