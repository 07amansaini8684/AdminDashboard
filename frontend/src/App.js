// just checking
// import { tokensLight } from 'theme'

import React, { useMemo } from "react";
// importing items from the material ui
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
// from react redux
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// importing components
import Layout from "scenes/layout/Layout";
// import Navigate from ""
import Dashboard from "scenes/dashboard/Dashboard";
import Products from "scenes/products/Products"
import Customers from "scenes/customers/Customers"
import Transaction from "scenes/transaction/Transaction"
import Geography from "scenes/geography/Geography"
import Overview from "scenes/overview/Overview"
import Daily from "scenes/daily/Daily"
import Monthly from "scenes/monthly/Monthly"
import Breakdown from "scenes/breakdown/Breadkdown"
import Admin from "scenes/admin/Admins"
import Performance from "scenes/performance/Performance"
const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
