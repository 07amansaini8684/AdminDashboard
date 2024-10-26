import React, { useState } from "react";
import { DataGrid, GridToolbar  } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { useGetTransactionQuery } from "state/api";
// import { PanoramaSharp } from "@mui/icons-material";
import Header from "components/Header";
import { Box } from "@mui/material";
// import DataGridCustomeToolbar from "components/DataGridCustomeToolbar";

const Transaction = () => {
  const theme = useTheme();

  // values sending to backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({});

//   const [searchInput , setSearchInput] = useState("")

  const { data, isLoading } = useGetTransactionQuery({
    page,
    pageSize,
    search,
    sort: JSON.stringify(sort),
  });

  //   console.log(data);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    {
      field: "products",
      headerName: "Products",
      flex: 1,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTION" subtitle="list of transaction" />
      <Box height="70vh" mt="2rem">
 
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions = {[20,50,100 || 0]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSort) => setSort(...newSort)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
        //   components={{
        //     Toolbar: () => DataGridCustomeToolbar,
        //   }}
        //   componentsProps= {{
        //     toolbar:{
        //         searchInput, setSearchInput, setSearch
        //     }
        //   }}

        slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default Transaction;
