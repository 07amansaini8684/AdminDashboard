import React from "react";

import { useGetUserPerformanceQuery } from "state/api";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useSelector } from "react-redux";

const Performance = () => {
  const userId = useSelector((state) => state.global.userId);

  const { data, isLoading, error } = useGetUserPerformanceQuery(userId);
  const theme = useTheme();
  // console.log("data", data);
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "createdAt", headerName: "CreatedAt", flex: 1 },
    {
      field: "products",
      headerName: "# of Products",
      flex: 1,
      sortable: false,
      rederCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      rederCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.2rem 2rem">
      <Header
        title="Performance"
        subtitle="Track yor=ur Affiliate performance"
      />

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
          rows={(data && data.sales) || []}
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

export default Performance;
