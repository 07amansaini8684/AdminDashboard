import React from "react";
import FLexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";

import StatBox from "components/StatBox";

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

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  // console.log("dashboardData", data);

  // console.log("monthly", data?.thisMonthStats.totalSales);

  return (
    <Box m="1.2rem 2rem">
      <FLexBetween>
        <Header title="Dashboard" subtitle="Overview of your dashboard" />
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadOutlined />}
            sx={{ marginLeft: "1rem" }}
          >
            Download Report
          </Button>
        </Box>
      </FLexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
          // Row no 1
        }}
      >
        <StatBox
          title="Total Customer"
          value={data?.totalCustomers}
          increase="+14%"
          icon={
            <Email
              style={{ color: theme.palette.primary.main, fontSize: "2rem" }}
            />
          }
          description="Since last month"
        />
        <StatBox
          title="Today's Sales"
          value={data?.todayStats.totalSales}
          increase="+24%"
          icon={
            <PointOfSale
              style={{ color: theme.palette.primary.main, fontSize: "2rem" }}
            />
          }
          description="Since last month"
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Mothly Sales"
          value={data?.thisMonthStats.totalSales}
          increase="+4%"
          icon={
            <PersonAdd
              style={{ color: theme.palette.primary.main, fontSize: "2rem" }}
            />
          }
          description="Since last month"
        />
        <StatBox
          title="Yearly Sales"
          value={data?.yearlySalesTotal}
          increase="+38%"
          icon={
            <Traffic
              style={{ color: theme.palette.primary.main, fontSize: "2rem" }}
            />
          }
          description="Since last year"
        />
        {/* // secnod row */}
        <Box gridColumn="span 8" gridRow="span 3">
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.recentTransactions) || []}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
            }}
          />
        </Box>
        <Box gridColumn="span 4"  gridRow="span 3">
          <Typography variant="h6" color="text.primary" gutterBottom>
            Sales By Category
          </Typography>
          <BreakdownChart  view="sales" isDashboard={true} />
        <Typography variant="h6" color="text.primary" gutterBottom>
          Breakdon of real states and information via category for revenue made for this year and total sale 
        </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
