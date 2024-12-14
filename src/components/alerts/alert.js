import React, { useState } from "react";
import { Button, Menu, Box, Typography, Badge, MenuItem } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function Alert() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="alert-button"
        aria-controls={open ? "alert-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textTransform: "none",
          color: "#3f3f3fd6",
        }}
      >
        <Badge
          badgeContent={3}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#e50140",
              color: "#fff",
            },
          }}
        >
          <NotificationsNoneIcon sx={{ color: "#1d3f6b" }} />
        </Badge>
        <Typography sx={{ color: "#1d3f6b" }}>Alert</Typography>
      </Button>
      <Menu
        id="alert-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "alert-button",
        }}
        PaperProps={{
          sx: {
            width: "min(800px, 100%)",
            marginRight: "20px",
            backgroundColor: "#FBFBFB",
            borderRadius: 1,
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#1d3f6b",
            borderBottom: "2px solid #1d3f6b",
            p: 2,
            color: "#fff",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Important Alerts
          </Typography>
        </Box>
        <MenuItem onClick={handleClose}>
          <Typography>No alerts yet</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
