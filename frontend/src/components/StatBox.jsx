import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

import FLexBetween from "./FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();

  return (
    <Box
    gridColumn="span 2"
    gridRow="span 1"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    p="1.25rem 1rem"
    flex="1 1 100%"
    backgroundColor={theme.palette.background.alt}
    borderRadius="0.55rem"
    >
      <FLexBetween gap="5px">
        {icon}
        <Typography variant="h6" color={theme.palette.grey[700]}>
          {title}
        </Typography>
      </FLexBetween>
      <FLexBetween>
        Total :
        <Typography
          variant="h4"
          color={
            increase ? theme.palette.success.main : theme.palette.error.main
          }
          mt={1}
        >
          {value} {/* Displaying the value */}
        </Typography>
      </FLexBetween>
      <FLexBetween>
        <Typography
          variant="body2"
          color={
            increase ? theme.palette.success.main : theme.palette.error.main
          }
        >
          {increase ? `+${increase}` : increase} {/* Displaying the increase */}
        </Typography>
        <Typography variant="body2" color={theme.palette.grey[600]} mt={1}>
          {description}
        </Typography>
      </FLexBetween>
    </Box>
  );
};

export default StatBox;
