//  client/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import api from "@/lib/api";
import { notifySuccess, notifyError } from "@/lib/notify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailRequiredSchema } from "@/lib/schemas";

export default function ForgotPassword() {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(emailRequiredSchema),
    defaultValues: { email: "" },
  });
  const renderMessage = () => {
    if (!feedback) return null;
    if (feedback.type === "info") {
      return (
        <Stack spacing={0.75}>
          <Typography variant="body2" component="span">
            {feedback.message ||
              `หากมีอีเมลนี้ในระบบ ระบบจะส่งลิงก์รีเซ็ตไปให้ทันที ตรวจสอบกล่องอีเมลของคุณที่ ${feedback.email}`}
          </Typography>
          {feedback.previewResetLink && (
            <Typography variant="caption" component="span">
              สำหรับทดสอบ:{" "}
              <Link
                href={feedback.previewResetLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                เปิดลิงก์รีเซ็ต
              </Link>
            </Typography>
          )}
        </Stack>
      );
    }
    return feedback.message;
  };

  const onSubmit = async ({ email }) => {
    setFeedback(null);
    setLoading(true);
    try {
      const clientOrigin =
        typeof window !== "undefined" && window.location
          ? window.location.origin
          : undefined;
      const { data } = await api.post("/auth/forgot-password", {
        email,
        clientUrl: clientOrigin,
      });
      const successMessage =
        data?.message ||
        `หากมีอีเมลนี้ในระบบ ระบบจะส่งลิงก์รีเซ็ตไปให้ทันที ตรวจสอบกล่องอีเมลของคุณที่ ${email}`;
      setFeedback({
        type: "info",
        email,
        message: successMessage,
        previewResetLink: data?.previewResetLink,
      });
      notifySuccess(successMessage);
      reset({ email: "" });
    } catch (err) {
      const raw = err?.response?.data?.message;
      const fallback = "ส่งคำขอรีเซ็ตไม่สำเร็จ";
      setFeedback({
        type: "error",
        key: raw ? null : "toastForgotFail",
        message: raw || fallback,
      });
      notifyError(raw || fallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ display: "grid", placeItems: "center", minHeight: "70vh", px: 2 }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 560 }}>
        <Stack spacing={2}>
          <Typography variant="h5">ลืมรหัสผ่าน</Typography>
          {feedback && (
            <Alert severity={feedback.type === "info" ? "info" : "error"}>
              {renderMessage()}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                label="อีเมล"
                type="email"
                fullWidth
                InputLabelProps={{ required: false }}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || isSubmitting}
                fullWidth
              >
                {loading || isSubmitting ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "ส่งลิงก์รีเซ็ต"
                )}
              </Button>
            </Stack>
          </Box>
          <Divider flexItem sx={{ my: 1 }} />
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            จำรหัสผ่านได้แล้ว?{" "}
            <Link component={RouterLink} to="/login">
              กลับไปเข้าสู่ระบบ
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
