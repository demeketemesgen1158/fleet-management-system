import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";

export default function Dashboard({
  date_start,
  date_end,
  handleDateSelector,
}) {
  const tableContainerWidth = window.innerWidth;

  // Ensure handleDateSelector is only called once when component mounts
  useEffect(() => {
    handleDateSelector();
  }, [handleDateSelector]);

  return (
    <Stack
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p: 1,
        gap: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Allows wrapping for responsiveness
          gap: 5,
          "& > *": {
            flexGrow: 1,
            flexBasis: {
              xs: "100%",
              sm: "calc(25% - 10px)",
              lg: "calc(25% - 10px)",
            },
            minHeight: { xs: "200px", sm: "320px", lg: "320px" }, // Controls minimum height for each component
            height: "100%", // Allows components to grow vertically within the container
          },
        }}
      >
        Under development
      </Box>
    </Stack>
  );
}
