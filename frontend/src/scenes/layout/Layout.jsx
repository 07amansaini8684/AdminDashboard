import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // grabing the userId
  const userId = useSelector((state) => state.global.userId);
  // console.log("userId", userId)
  // fetching the user data
  const { data } = useGetUserQuery(userId);
  // console.log("data",data)
  // console.log("info", data.name,data.role, data.email)
  // if the user data is not loaded, we will not render the sidebar

  return (
    <Box
      display={isNonMobile ? "flex" : "block"}
      width="100%"
      height="100%"
      overflow="revert-layer"
    >
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box width="100%">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          user={data || {}}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
