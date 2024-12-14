import React from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
  Typography,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AirlineSeatReclineNormalOutlinedIcon from "@mui/icons-material/AirlineSeatReclineNormalOutlined";
import EvStationIcon from "@mui/icons-material/EvStation";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import DeckIcon from "@mui/icons-material/Deck";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";

export default function SideBar() {
  // Shared styles for icons and links
  const iconStyle = { color: "white" };
  const linkStyle = { color: "white" };

  return (
    <List sx={{ mt: 9 }}>
      <Divider sx={{ backgroundColor: "#05056e" }} />
      {/* Dashboard Link */}
      <ListItemButton>
        <ListItemIcon>
          <DashboardOutlinedIcon sx={iconStyle} />
        </ListItemIcon>
        <ListItemText>
          <Link underline="none" href="/" sx={linkStyle}>
            Dashboard
          </Link>
        </ListItemText>
      </ListItemButton>

      {/* Users Link */}
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon sx={iconStyle} />
        </ListItemIcon>
        <ListItemText>
          <Link underline="none" href="/users" sx={linkStyle}>
            Users
          </Link>
        </ListItemText>
      </ListItemButton>

      {/* Vehicles Link */}
      <ListItemButton>
        <ListItemIcon>
          <DirectionsCarIcon sx={iconStyle} />
        </ListItemIcon>
        <ListItemText>
          <Link underline="none" href="/vehicles" sx={linkStyle}>
            Vehicles
          </Link>
        </ListItemText>
      </ListItemButton>

      {/* Fleet assignment Link */}
      <ListItemButton>
        <ListItemIcon>
          <DepartureBoardIcon sx={iconStyle} />
        </ListItemIcon>
        <ListItemText>
          <Link underline="none" href="/fleet-assignment" sx={linkStyle}>
            Fleet Assignment
          </Link>
        </ListItemText>
      </ListItemButton>

      <Divider sx={{ backgroundColor: "#05056e" }} />

      <Typography
        sx={{ p: 2, ml: -1, fontSize: "0.85em", color: "whitesmoke" }}
      >
        Expenses
      </Typography>
      {/* Fuel Consumption Link */}
      <ListItemButton>
        <ListItemIcon>
          <EvStationIcon sx={iconStyle} />
        </ListItemIcon>
        <ListItemText>
          <Link underline="none" href="/fuel-consumption" sx={linkStyle}>
            Fuel Consumption
          </Link>
        </ListItemText>
      </ListItemButton>

      {/* Maintenance Link */}
      <ListItemButton>
        <ListItemIcon>
          <CarRepairIcon sx={iconStyle} />
        </ListItemIcon>
        <ListItemText>
          <Link underline="none" href="/service-maintenance" sx={linkStyle}>
            Service & Maintenance
          </Link>
        </ListItemText>
      </ListItemButton>

      {/* Insurance Link */}
      <ListItemButton>
        <ListItemIcon>
          <DeckIcon sx={iconStyle} />
        </ListItemIcon>
        <ListItemText>
          <Link underline="none" href="/insurance" sx={linkStyle}>
            Insurance
          </Link>
        </ListItemText>
      </ListItemButton>

      <Divider sx={{ backgroundColor: "#05056e" }} />

      {/* Summarised Report Link */}
      <ListItemButton>
        <ListItemText>
          <Link underline="none" href="/report" sx={linkStyle}>
            Summarised Report
          </Link>
        </ListItemText>
      </ListItemButton>
    </List>
  );
}
