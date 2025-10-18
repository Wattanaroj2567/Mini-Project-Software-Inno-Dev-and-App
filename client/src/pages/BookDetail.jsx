// client/src/pages/BookDetail.jsx
import { useParams } from "react-router-dom";
import {
  Box,
  Chip,
  Stack,
  Typography,
  Divider,
  Rating,
  Paper,
} from "@mui/material";
import api from "../lib/api";
import { toApiAsset } from "@/lib/url";
import ReviewList from "@/components/reviews/ReviewList"; // Import the new component
import { useQuery } from "@tanstack/react-query";
import ErrorState from "@/components/common/ErrorState.jsx";

export default function BookDetail() {
  const { id } = useParams();
  const {
    data: book,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const { data } = await api.get(`/book/${id}`);
      return data;
    },
  });

  if (isLoading) return <Typography>กำลังโหลด...</Typography>;
  if (isError)
    return (
      <ErrorState
        message="ไม่พบหนังสือ หรือโหลดข้อมูลไม่สำเร็จ"
        onRetry={refetch}
      />
    );

  const avgRating = Number(book.avgRating) || 0;
  const formattedAvg = Number.isInteger(avgRating)
    ? avgRating.toFixed(0)
    : avgRating.toFixed(1);

  return (
    <Stack spacing={4}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          background:
            "linear-gradient(140deg, rgba(217,242,77,0.12) 0%, rgba(255,255,255,0.97) 55%, rgba(31,54,64,0.05) 100%)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 4 },
        }}
      >
        {book.coverImageUrl && (
          <Box
            sx={{
              maxWidth: { xs: 200, sm: 240, md: 320 },
              width: "100%",
              flexShrink: 0,
              textAlign: "center",
              mx: "auto",
            }}
          >
            <Box
              component="img"
              src={toApiAsset(book.coverImageUrl)}
              alt={book.title}
              sx={{
                width: "100%",
                maxWidth: { xs: 180, sm: 220, md: 300 },
                borderRadius: 2,
                boxShadow: "0 12px 28px rgba(31,54,64,0.16)",
              }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </Box>
        )}
        <Stack spacing={1.5}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: 1.15,
              pr: { xs: 0, md: 2 },
              fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2.6rem" },
              maxWidth: { xs: "100%", md: "900px" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {book.title}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              textAlign: { xs: "center", md: "left" },
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            }}
          >
            {book.author}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.2}
            alignItems={{ xs: "center", sm: "center" }}
            sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
          >
            <Stack direction="row" spacing={0.6} alignItems="center">
              <Rating
                value={avgRating}
                precision={0.1}
                readOnly
                size="small"
                sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem" } }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" } }}
              >
                {formattedAvg} {`(${book.reviewCount || 0})`}
              </Typography>
            </Stack>
            {book.publishedYear && (
              <Chip
                label={`ปีที่พิมพ์ ${book.publishedYear}`}
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                  height: { xs: 24, sm: 28 },
                }}
              />
            )}
          </Stack>
          {book.description && (
            <Typography
              sx={{
                mt: 1.5,
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
              color="text.secondary"
              paragraph
            >
              {book.description}
            </Typography>
          )}
        </Stack>
      </Paper>

      <Divider sx={{ my: 1, pointerEvents: "none" }} />
      <ReviewList bookId={id} />
    </Stack>
  );
}
