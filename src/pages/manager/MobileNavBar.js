import React from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import Logout from "../../services/logout";
import DateFilter from "../../services/dateFilter";
import Settings from "../../components/settings/setting";
import Alert from "../../components/alerts/alert";

export default function MobileNavBar({ handleDateFilter, dateSelector }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Handle dropdown open
  const handleDropDown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: { lg: "none", md: "flex", sm: "flex", xs: "flex" },
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleDropDown}
      >
        <SegmentOutlinedIcon
          sx={{
            fontSize: "2.25em",
            color: "#1d3f6b",
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
        sx={{
          ml: -3,
        }}
      >
        {dateSelector && (
          <MenuItem>
            <DateFilter handleDateFilter={handleDateFilter} />
          </MenuItem>
        )}
        <MenuItem>
          <Settings />
        </MenuItem>
        <MenuItem>
          <Alert />
        </MenuItem>
        <MenuItem>
          <Logout />
        </MenuItem>
      </Menu>
    </Box>
  );
}
