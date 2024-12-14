import React from "react";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

const BackDropComp = ({ loading }) => {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1d3f6b",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <CircularProgress sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
            Logging . . .
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};

export default BackDropComp;
