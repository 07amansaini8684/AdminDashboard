import React from "react";

import { useGetAdminsQuery } from "state/api";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
// import CustomColumnMenu from "components/CustomColumnMenu"

const Admins = () => {
  const { data, isLoading, error } = useGetAdminsQuery();
  const theme = useTheme();

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "occupation", headerName: "Occupation", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
  ];

  return (
    <Box m="1.2rem 2rem">
      <Header title="Admins" subtitle="List of all admins" />

      <Box
        mt="2rem"
        height="75vh"
        sx={{
          width: "100%",
          "& .MuiDataGrid-root": {
            border: `1px solid ${theme.palette.divider}`, // Softer border using theme palette
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${theme.palette.divider}`, // Softer bottom border for cells using theme palette
          },
        }}
      >
        <DataGrid
          rows={data || []}
          columns={columns}
        //   components={{
        //     ColumnMenu : CustomColumnMenu,
        //   }}
          loading={isLoading}
          getRowId={(row) => row._id}
          pagination
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}

          sx={{
            border: "1px solid",
            borderColor: theme.palette.divider,
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            "& .MuiDataGrid-cell:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Admins;
