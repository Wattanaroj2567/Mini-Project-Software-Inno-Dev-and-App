// client/src/components/common/Loading.jsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: { xs: "calc(100vh - 260px)", md: "calc(100vh - 320px)" },
        py: { xs: 4, md: 6 },
      }}
    >
      <CircularProgress />
    </Box>
  );
}
