import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  Box,
  Rating,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { toApiAsset } from "@/lib/url";
import ImageIcon from "@mui/icons-material/Image";

export default function BookCard({ book }) {
  const [imageError, setImageError] = useState(false);

  // ป้องกัน component พังถ้าหาก `book` prop เป็น null หรือ undefined
  if (!book) {
    return null;
  }
  const img = toApiAsset(book.coverImageUrl);
  const avgRating = Number(book.avgRating) || 0;
  const formattedAvg = Number.isInteger(avgRating)
    ? avgRating.toFixed(0)
    : avgRating.toFixed(1);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)",
        mx: 0,
        backgroundColor: "#fff",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        ":hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px 0 rgba(0,0,0,0.10)",
        },
      }}
      elevation={0}
    >
      <CardActionArea
        component={RouterLink}
        to={`/book/detail/${book.id}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        {/* ส่วนแสดงรูปภาพ */}
        <Box
          sx={{
            width: "100%",
            aspectRatio: { xs: "3 / 4", sm: "3 / 4" },
            bgcolor: "#fff", // สีพื้นหลังขาวเหมือนหน้าดีเทล
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {imageError ? (
            <Box sx={{ color: "text.secondary" }}>
              <ImageIcon sx={{ fontSize: 48 }} />
            </Box>
          ) : (
            <Box
              component="img"
              src={img}
              alt={book.title}
              sx={{
                height: "88%",
                width: "auto",
                maxWidth: "88%",
                objectFit: "contain", // สำคัญมาก: แสดงภาพเต็มโดยไม่ตัดขอบ
                display: "block",
                borderRadius: "6px", // ปรับขอบมนให้เหมาะสม
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
              onError={handleImageError}
            />
          )}
        </Box>
        {/* ส่วนแสดงเนื้อหา */}
        <CardContent
          sx={{
            pt: { xs: 1.2, sm: 1.5, md: 1.8 },
            pb: { xs: 1.2, sm: 1.8, md: 2 },
            px: { xs: 1.2, sm: 1.6, md: 2 },
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            minWidth: 0, // ป้องกัน overflow
          }}
        >
          <Stack spacing={0.5} flexGrow={1}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: { xs: 3, sm: 2 },
                WebkitBoxOrient: "vertical",
                lineHeight: 1.3,
                height: { xs: "3.9em", sm: "2.6em" }, // รองรับ 3 บรรทัดในมือถือ, 2 บรรทัดในหน้าจอใหญ่กว่า
                mb: { xs: 0.4, sm: 0.5 },
                fontSize: { xs: "0.82rem", sm: "0.95rem", md: "1.05rem" },
                letterSpacing: "-0.01em",
              }}
              title={book.title}
            >
              {book.title}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              title={book.author}
              sx={{
                mb: { xs: 0.3, sm: 0.5 },
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
              }}
            >
              {book.author}
            </Typography>
            <Stack direction="row" spacing={0.6} alignItems="center" mt="auto">
              <Rating
                size="small"
                value={avgRating}
                precision={0.1}
                readOnly
                sx={{ fontSize: { xs: "0.8rem", sm: "1.1rem" } }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
              >
                {formattedAvg}
                {` (${book.reviewCount || 0})`}
              </Typography>
            </Stack>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                mt: { xs: 0.2, sm: 0.5 },
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
              }}
            >
              หมวดวรรณกรรม
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
