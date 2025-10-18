// client/src/components/layout/AppFooter.jsx
import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

const currentYear = new Date().getFullYear();

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 3, md: 4 },
        py: { xs: 2, md: 2.5 },
        backgroundColor: "rgba(31,54,64,0.03)",
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: 0 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 1.5 }}
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems="center"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              lineHeight: 1.4,
            }}
          >
            Fiction Book Review • สังคมคนรักนิยาย
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              lineHeight: 1.4,
            }}
          >
            © {currentYear} Fiction Book Review. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
