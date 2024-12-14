import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import dayjs from "dayjs";

import { Link, Typography } from "@mui/material";
import SideBar from "./sideBar";
import ManagerRoute from "./managerRoute";
import DateFilter from "../../services/dateFilter";
import Settings from "../../components/settings/setting";
import Alert from "../../components/alerts/alert";
import Logout from "../../services/logout";
import MobileNavBar from "./MobileNavBar";

const drawerWidth = 270;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
  [theme.breakpoints.up("xs")]: {
    padding: theme.spacing(0),
    display: open && "none",
    flexDirection: "column",
  },
  padding: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(1),
    display: open && "flex",
    flexDirection: "column",
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2),
    display: open && "flex",
    flexDirection: "column",
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(3),
    display: open && "flex",
    flexDirection: "column",
  },
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(100% - ${drawerWidth}px)`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  backgroundColor: " white",
  position: "fixed",
  top: 0,
  zIndex: 1,
}));

export default function Manager() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(
    window.innerWidth > 1100 ? true : false
  );
  const [dateSelector, setDateSelector] = React.useState(false);

  const [fromValue, setFromValue] = React.useState(null);
  const [toValue, setToValue] = React.useState(null);

  // Initialize dates as null (no default values)
  const [date_start, setDateStart] = useState(null);
  const [date_end, setDateEnd] = useState(null);

  // Function to handle date range filter
  const handleDateFilter = (startDate, endDate) => {
    // Format the dates if they are provided, otherwise keep them as null
    setDateStart(startDate ? dayjs(startDate).format("YYYY-MM-DD") : null);
    setDateEnd(endDate ? dayjs(endDate).format("YYYY-MM-DD") : null);
  };

  function handleDateSelector() {
    setDateSelector(true);
  }

  useEffect(() => {
    handleDateFilter(fromValue, toValue);
  }, [fromValue, toValue]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <CssBaseline />
      <Drawer
        sx={{
          width: open && drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#002060",
            color: "black",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box
            sx={{
              width: 250,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "#002060",
              pt: 3,
              pl: 1,
            }}
          >
            <Link href="/">
              <img
                style={{
                  width: 160,
                  height: "auto",
                }}
                src="https://fleet-demo.maflink.com/logo.PNG"
              />
            </Link>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" && (
                <ArrowBackRoundedIcon
                  sx={{
                    color: "white",
                  }}
                />
              )}
            </IconButton>
          </Box>
        </DrawerHeader>
        <SideBar />
      </Drawer>
      <Main open={open}>
        <Box
          sx={{
            width: "100%",
            position: "sticky",
            top: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            cursor: "pointer",
            pt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            {!open && (
              <>
                <MenuIcon
                  sx={{
                    fontSize: "2.25em",
                    color: "black",
                    ml: 2,
                  }}
                  onClick={handleDrawerOpen}
                />
                <Link href="/" underline="none">
                  <img
                    style={{
                      width: 120,
                      height: "auto",
                    }}
                    src="https://fleet-demo.maflink.com/logo2.PNG"
                  />
                </Link>
              </>
            )}
            <Typography variant="h6" sx={{ pl: 3 }}>
              Fleet Management
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "none", lg: "flex" },
              flexFlow: "row nowrap",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 3,
            }}
          >
            {dateSelector && <DateFilter handleDateFilter={handleDateFilter} />}
            <Logout />
            <Divider orientation="vertical" flexItem />
            <Settings />
            <Divider orientation="vertical" flexItem />
            <Alert />
          </Box>
          <MobileNavBar
            handleDateFilter={handleDateFilter}
            dateSelector={dateSelector}
          />
        </Box>
        <Divider />
        <Box
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <ManagerRoute
            date_start={date_start}
            date_end={date_end}
            handleDateSelector={handleDateSelector}
          />
        </Box>
      </Main>
    </Box>
  );
}
