// client/src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Stack, Typography, Box, Skeleton } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import api from "@/lib/api";
import BookCard from "@/components/books/BookCard.jsx";
import { useQuery } from "@tanstack/react-query";
import ErrorState from "@/components/common/ErrorState.jsx";

export default function Home() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const MAX_DISPLAY = 10;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["books", page],
    queryFn: async () => {
      const { data } = await api.get(`/book?page=${page}&limit=12`);
      return data;
    },
  });

  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowSkeleton(false);
      return;
    }
    const timer = setTimeout(() => setShowSkeleton(true), 200);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const stackMinHeight =
    showSkeleton || isLoading
      ? { xs: "calc(100vh - 260px)", md: "calc(100vh - 320px)" }
      : "auto";

  return (
    <Stack
      spacing={3}
      sx={{ minHeight: stackMinHeight, justifyContent: "flex-start" }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          รายการหนังสือล่าสุด
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, sm: 2.5, md: 3 },
            "--card-width": {
              xs: "min(45vw, 200px)",
              sm: "220px",
              md: "230px",
            },
            gridTemplateColumns: {
              xs: "repeat(2, minmax(var(--card-width), 1fr))",
              sm: "repeat(auto-fit, minmax(var(--card-width), var(--card-width)))",
            },
            justifyContent: { sm: "center" },
          }}
        >
          {showSkeleton ? (
            Array.from({ length: MAX_DISPLAY }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: "100%",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{ borderRadius: 2, mb: 1 }}
                />
                <Skeleton width="80%" sx={{ mb: 0.5 }} />
                <Skeleton width="60%" />
              </Box>
            ))
          ) : isError ? (
            <Box
              sx={{
                gridColumn: { xs: "1 / -1" },
                width: { xs: "100%", md: "auto" },
                flexShrink: 0,
              }}
            >
              <ErrorState
                onRetry={refetch}
                message="ไม่สามารถโหลดรายการหนังสือได้"
              />
            </Box>
          ) : (
            (data?.books || []).slice(0, MAX_DISPLAY).map((b) => (
              <Box
                key={b.id}
                sx={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <BookCard book={b} />
              </Box>
            ))
          )}
        </Box>
      </Box>
      {/* Pagination intentionally hidden per request */}
    </Stack>
  );
}
