// client/src/pages/Login.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@/components/icons/GoogleIcon.jsx";
import { useAuth } from "../contexts/useAuth";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { API_BASE_URL } from "../lib/url";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import { notifySuccess, notifyError } from "@/lib/notify";

export default function Login() {
  const { login, loading, loginWithGoogleToken } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { emailOrUsername: "", password: "" },
  });
  const googleHandled = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token") || "";
    const userStr = params.get("user") || "";
    const redirectedFrom = params.get("from") || "";

    if (token && userStr) {
      if (googleHandled.current) return;
      googleHandled.current = true;
      try {
        const user = JSON.parse(userStr);
        loginWithGoogleToken(token, user);
        notifySuccess("เข้าสู่ระบบด้วย Google สำเร็จ");
        const target =
          redirectedFrom && redirectedFrom.startsWith("/")
            ? redirectedFrom
            : from;
        navigate(target, { replace: true });
      } catch {
        setError("ล็อกอินด้วย Google ไม่สำเร็จ");
        notifyError("ล็อกอินด้วย Google ไม่สำเร็จ");
      }
    }
  }, [location, loginWithGoogleToken, navigate, from]);

  const onSubmit = async ({ emailOrUsername, password }) => {
    setError("");
    try {
      await login({ emailOrUsername, password });
      notifySuccess("เข้าสู่ระบบสำเร็จ");
      navigate(from, { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ";
      setError(message);
      notifyError(message);
    }
  };

  const handleGoogleLogin = () => {
    const statePayload = {
      from,
      origin: window.location.origin,
    };
    const state = window.btoa(
      encodeURIComponent(JSON.stringify(statePayload))
    );
    window.location.href = `${API_BASE_URL}/auth/google?state=${encodeURIComponent(
      state
    )}`;
  };

  return (
    <Box
      sx={{ display: "grid", placeItems: "center", minHeight: "70vh", px: 2 }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 480 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h5" gutterBottom>
                เข้าสู่ระบบ
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ยินดีต้อนรับกลับสู่ Fiction Book Review
              </Typography>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="อีเมลหรือชื่อผู้ใช้"
              {...register("emailOrUsername")}
              error={!!errors.emailOrUsername}
              helperText={errors.emailOrUsername?.message}
              fullWidth
              InputLabelProps={{ required: false }}
            />
            <TextField
              label="รหัสผ่าน"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              InputLabelProps={{ required: false }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || isSubmitting}
              fullWidth
              sx={{ mt: 1 }}
            >
              เข้าสู่ระบบ
            </Button>
            <Divider flexItem>หรือ</Divider>
            <Button
              variant="outlined"
              size="large"
              onClick={handleGoogleLogin}
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{ justifyContent: "center", gap: 1 }}
            >
              เข้าสู่ระบบด้วย Google
            </Button>
            <Divider flexItem sx={{ my: 1 }} />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "flex-start", sm: "center" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1}
              sx={{ width: "100%", columnGap: { sm: "16px" } }}
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: { sm: "nowrap" },
                  textAlign: { xs: "left", sm: "center" },
                }}
              >
                ลืมรหัสผ่าน?{" "}
                <Link component={RouterLink} to="/forgot-password">
                  กดที่นี่
                </Link>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: { sm: "nowrap" },
                  textAlign: { xs: "left", sm: "center" },
                }}
              >
                ยังไม่มีบัญชี?{" "}
                <Link component={RouterLink} to="/register">
                  สมัครสมาชิก
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
