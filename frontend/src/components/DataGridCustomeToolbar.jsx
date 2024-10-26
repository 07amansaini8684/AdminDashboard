import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
    GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FLexBetween from "./FlexBetween";

const DataGridCustomeToolbar = ({searchInput, setSearchInput, setSearch}) => {
  const handleSearch = () => {
    setSearch(searchInput);
    setSearchInput("");
  };

  return (
    <GridToolbarContainer>
      <FLexBetween>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </FLexBetween>
      <TextField
        label="Search.."
        sx={{
          width: "15rem",
          mb: "0.5rem",
        }}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <Search/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </GridToolbarContainer>
  );
};

export default DataGridCustomeToolbar;
