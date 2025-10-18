// client/src/components/layout/AppLayout.jsx
import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Stack,
  CircularProgress,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import theme from "@/theme";
import { useAuth } from "@/contexts/useAuth";
import { toApiAsset, resolveProfileImagePath } from "@/lib/url";
import { colorFromString, initialFromName } from "@/lib/avatar";
import { notifySuccess } from "@/lib/notify";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppFooter from "./AppFooter.jsx";

export default function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const pathname = location.pathname;
  const authRoutes = new Set([
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ]);
  const isAuthPage = authRoutes.has(pathname);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const showFooter = pathname === "/" || pathname.startsWith("/book/detail");

  const handleLogout = () => {
    if (loggingOut) return;
    setLoggingOut(true);
    // clear auth immediately; give small delay for UX
    logout();
    notifySuccess("ออกจากระบบแล้ว");
    setMobileDrawerOpen(false);
    setTimeout(() => {
      navigate("/");
      setLoggingOut(false);
    }, 600);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // Prepare header avatar/name if logged in
  const name = user ? user.displayName || user.username || "User" : null;
  const resolved = user ? resolveProfileImagePath(user.profileImage) : null;
  const avatarSrc = resolved ? toApiAsset(resolved) : undefined;
  const avatarBg = user ? colorFromString(user.id || name) : undefined;
  const initial = user ? initialFromName(user.displayName, user.username) : "U";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: { fontSize: 14 },
          success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar
          position="static"
          color="primary"
          elevation={0}
          sx={{
            borderBottomLeftRadius: { xs: 0, md: 28 },
            borderBottomRightRadius: { xs: 0, md: 28 },
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              disableGutters
              sx={{
                py: { xs: 1.25, md: 2 },
                px: { xs: 1, sm: 1.5, md: 0 },
                flexDirection: "row",
                alignItems: "center",
                gap: { xs: 1.5, md: 0 },
              }}
            >
              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleMobileDrawer}
                  sx={{ mr: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* Logo and Title */}
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{
                  flexGrow: 1,
                  justifyContent: { xs: "flex-start", md: "flex-start" },
                }}
              >
                <IconButton
                  component={RouterLink}
                  to="/"
                  sx={{
                    bgcolor: "rgba(31,54,64,0.08)",
                    color: "#1f3640",
                    "&:hover": { bgcolor: "rgba(31,54,64,0.15)" },
                    flexShrink: 0,
                  }}
                >
                  <MenuBookRoundedIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  component={RouterLink}
                  to="/"
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Booklet Fiction
                </Typography>
              </Stack>

              {/* User Actions - Desktop */}
              {!isMobile && (
                <Stack
                  direction="row"
                  spacing={1.2}
                  alignItems="center"
                  sx={{
                    flexGrow: 1,
                    justifyContent: "flex-end",
                  }}
                >
                {user ? (
                  <>
                    <Stack
                      component={RouterLink}
                      to="/profile"
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        color: "inherit",
                        textDecoration: "none",
                        minWidth: 160,
                      }}
                    >
                      <Avatar
                        alt={name || "me"}
                        src={avatarSrc}
                        imgProps={{ referrerPolicy: "no-referrer" }}
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: avatarBg,
                          flexShrink: 0,
                        }}
                      >
                        {initial}
                      </Avatar>
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{ maxWidth: 160, fontWeight: 500 }}
                      >
                        {name}
                      </Typography>
                    </Stack>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      size="small"
                      startIcon={
                        loggingOut ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <LogoutIcon />
                        )
                      }
                      sx={{ minWidth: 108 }}
                    >
                      {loggingOut ? "กำลังออก..." : "ออกจากระบบ"}
                    </Button>
                  </>
                ) : !isAuthPage ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    component={RouterLink}
                    to="/login"
                    size="small"
                    startIcon={<LoginIcon />}
                    sx={{
                      minWidth: 130,
                      borderRadius: 2,
                      px: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                      boxShadow: 'none',
                      '&:hover': { boxShadow: 'none' },
                    }}
                  >
                    ลงชื่อเข้าใช้
                  </Button>
                ) : null}
              </Stack>
              )}

              {/* Mobile User Actions */}
              {isMobile && user && (
                <IconButton
                component={RouterLink}
                to="/profile"
                sx={{ color: "inherit" }}
              >
                <Avatar
                  alt={name || "me"}
                  src={avatarSrc}
                  imgProps={{ referrerPolicy: "no-referrer" }}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: avatarBg,
                  }}
                >
                  {initial}
                </Avatar>
              </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={toggleMobileDrawer}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <IconButton
                component={RouterLink}
                to="/"
                onClick={() => setMobileDrawerOpen(false)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <MenuBookRoundedIcon />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                Booklet Fiction
              </Typography>
            </Stack>

            {user && (
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mb: 2, px: 0.5 }}
              >
                <Avatar
                  alt={name || "me"}
                  src={avatarSrc}
                  imgProps={{ referrerPolicy: "no-referrer" }}
                  sx={{ width: 40, height: 40, bgcolor: avatarBg }}
                >
                  {initial}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{ fontWeight: 700, color: "white" }}
                    title={name}
                  >
                    {name}
                  </Typography>
                  {user.email && (
                    <Typography
                      variant="caption"
                      noWrap
                      sx={{ color: "rgba(255,255,255,0.8)" }}
                      title={user.email}
                    >
                      {user.email}
                    </Typography>
                  )}
                </Box>
              </Stack>
            )}

            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/"
                  onClick={() => setMobileDrawerOpen(false)}
                  selected={pathname === "/"}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="หน้าแรก" />
              </ListItemButton>
            </ListItem>

            {user && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to="/profile"
                    onClick={() => setMobileDrawerOpen(false)}
                    selected={pathname === "/profile"}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.3)",
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="โปรไฟล์" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={handleLogout}
                    disabled={loggingOut}
                    sx={{
                      borderRadius: 1,
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={loggingOut ? "กำลังออก..." : "ออกจากระบบ"}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            )}

            {!user && !isAuthPage && (
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/login"
                  onClick={() => setMobileDrawerOpen(false)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="ลงชื่อเข้าใช้" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: { xs: 4, md: 6 },
          }}
        >
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
            {children}
          </Container>
        </Box>
        {showFooter && <AppFooter />}
      </Box>
    </ThemeProvider>
  );
}
