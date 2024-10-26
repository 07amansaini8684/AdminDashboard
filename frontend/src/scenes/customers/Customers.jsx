import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  // console.log("data", data);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "occupation", headerName: "Occupation", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
  ];

  return (
    <Box
      m="1.5rem 2rem"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Header title="Customers" subtitle="Here is the all Customers" />
      <Box mt="2rem" height="80vh">
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Customers;
