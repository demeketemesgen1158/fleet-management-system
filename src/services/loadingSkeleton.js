import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function LoadingSkeleton() {
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Skeleton width={80} height={40} />
        <Skeleton width={80} height={40} />
        <Skeleton width={80} height={40} />
        <Skeleton width={80} height={40} />
      </Box>
      <Skeleton width="100%" height={40} />
      <Skeleton width="100%" height={40} />
      <Skeleton width="100%" height={40} />
      <Skeleton width="100%" height={40} />
    </Box>
  );
}
