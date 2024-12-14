import React from "react";
import { Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutConfirmation from "./logoutConfirmation";

export default function Logout() {
  const [logout, setLogout] = React.useState(false);

  const handleLogout = () => {
    setLogout(!logout);
  };

  return (
    <Button
      onClick={handleLogout}
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        textTransform: "none",
        color: "#3f3f3fd6",
      }}
    >
      {logout && <LogoutConfirmation />}
      <LogoutIcon fontSize="small" sx={{ color: "#1d3f6b" }} />
      <Typography sx={{ color: "#1d3f6b" }}>Logout</Typography>
    </Button>
  );
}
