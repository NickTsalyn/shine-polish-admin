"use client";
    
import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ display: "flex", color: "#006778" }}>
      <CircularProgress />
    </Box>
  );
}
