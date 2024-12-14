import React, { useState } from "react";
import { Button, Menu, Box, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function Settings() {
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
        id="settings-button"
        aria-controls={open ? "settings-menu" : undefined}
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
        <SettingsOutlinedIcon fontSize="small" sx={{ color: "#1d3f6b" }} />
        <Typography sx={{ color: "#1d3f6b" }}>Settings</Typography>
      </Button>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "settings-button",
        }}
        PaperProps={{
          sx: {
            width: "min(800px, 100%)",
            marginRight: "2px",
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
            mt: -1,
            p: 2,
            color: "#fff",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Important Settings
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}></Box>
      </Menu>
    </div>
  );
}
