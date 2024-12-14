import React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";

export default function Notification({
  message,
  autoHideDuration = 3000,
  color = "blue",
}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ m: 3 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={autoHideDuration}
        key="center"
      >
        <SnackbarContent
          message={message}
          sx={{
            backgroundColor: "white",
            color: { color },
          }}
        />
      </Snackbar>
    </Box>
  );
}
