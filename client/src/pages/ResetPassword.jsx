// client/src/pages/ResetPassword.jsx
import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import {
  useNavigate,
  useSearchParams,
  Link as RouterLink,
} from "react-router-dom";
import api from "@/lib/api";
import { notifySuccess, notifyError } from "@/lib/notify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/schemas";

export default function ResetPassword() {
  const [search] = useSearchParams();
  const token = search.get("token") || "";
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "" },
  });

  const onSubmit = async ({ newPassword }) => {
    setMsg("");
    setLoading(true);
    try {
      await api.put("/auth/reset-password", { token, newPassword });
      setMsg("รีเซ็ตรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบ");
      notifySuccess("ตั้งรหัสผ่านใหม่สำเร็จ");
      setTimeout(() => navigate("/login"), 1200);
      reset({ newPassword: "" });
    } catch (err) {
      const message = err?.response?.data?.message || "รีเซ็ตรหัสผ่านไม่สำเร็จ";
      setMsg(message);
      notifyError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ display: "grid", placeItems: "center", minHeight: "70vh", px: 2 }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 560 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h5" gutterBottom>
                ตั้งรหัสผ่านใหม่
              </Typography>
              <Typography variant="body2" color="text.secondary">
                กรอกรหัสผ่านใหม่เพื่อรีเซ็ตบัญชีของคุณ
              </Typography>
            </Box>
            {msg && (
              <Alert
                severity={
                  msg === "รีเซ็ตรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบ"
                    ? "success"
                    : "error"
                }
              >
                {msg}
              </Alert>
            )}
            <TextField
              label="รหัสผ่าน"
              type="password"
              fullWidth
              InputLabelProps={{ required: false }}
              {...register("newPassword")}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || !token || isSubmitting}
              fullWidth
            >
              ยืนยันรหัสผ่านใหม่
            </Button>
            <Divider flexItem sx={{ my: 1 }} />
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              มีบัญชีอยู่แล้ว?{" "}
              <Link component={RouterLink} to="/login">
                เข้าสู่ระบบ
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
