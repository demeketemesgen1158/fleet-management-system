import React, { useEffect, useState } from "react";
import { Button, Menu, Box, Typography } from "@mui/material";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DateFilter({ handleDateFilter }) {
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (fromValue || toValue) {
      handleDateFilter(fromValue, toValue);
    }
  }, [fromValue, toValue, handleDateFilter]);

  return (
    <div>
      <Button
        variant="text"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textTransform: "none",
        }}
      >
        <FilterListOutlinedIcon fontSize="small" sx={{ color: "#1d3f6b" }} />
        <Typography sx={{ whiteSpace: "nowrap", color: "#1d3f6b" }}>
          Date Selector
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box sx={{ m: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From"
              value={fromValue}
              onChange={(newValue) => setFromValue(newValue)}
              sx={{ mb: 2 }}
            />
            <DatePicker
              label="To"
              value={toValue}
              onChange={(newValue) => setToValue(newValue)}
            />
          </LocalizationProvider>
        </Box>
      </Menu>
    </div>
  );
}
