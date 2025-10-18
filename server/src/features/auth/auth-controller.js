// server/src/features/auth/auth-controller.js
const debug = require("debug")("fictionbook:auth");
const passport = require("passport");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  deleteAccount,
} = require("./auth-service");
const config = require("../../config");

function parseState(rawState) {
  const fallback = { from: "/", origin: null };
  if (!rawState) return fallback;
  try {
    const decoded = Buffer.from(rawState, "base64").toString("utf8");
    const maybeJson = decodeURIComponent(decoded);
    try {
      const payload = JSON.parse(maybeJson);
      return {
        from: typeof payload.from === "string" && payload.from ? payload.from : "/",
        origin:
          typeof payload.origin === "string" && payload.origin
            ? payload.origin
            : null,
      };
    } catch {
      return {
        from: maybeJson || "/",
        origin: null,
      };
    }
  } catch {
    return fallback;
  }
}

function resolveRedirectOrigin(originFromState) {
  const allowList = Array.isArray(config.cors.allowedOrigins)
    ? config.cors.allowedOrigins
    : [];

  // 1) Always prefer the origin that initiated the flow (if allowed)
  if (originFromState && allowList.includes(originFromState)) {
    return originFromState;
  }

  // 2) Fallback to configured clientUrl
  if (config.clientUrl) return config.clientUrl;

  // 3) Next, any origin from allowlist (first)
  if (allowList.length > 0) return allowList[0];

  // 4) Default to localhost
  return 'http://localhost:5173';
}

exports.register = async (req, res) => {
  try {
    const { username, displayName, email, password, confirmPassword } = req.body;
    const user = await register({ username, displayName, email, password, confirmPassword });
    debug("สมัครใหม่", user.id);
    res.status(201).json({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
    });
  } catch (err) {
    debug("error register", err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const { user, token } = await login({ emailOrUsername, password });
    debug("ล็อกอิน", user.id);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    debug("error login", err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
  }
};

exports.googleCallback = (req, res, next) => {
  const { from: fromState, origin: originFromState } = parseState(req.query.state);
  const redirectOrigin = resolveRedirectOrigin(originFromState);

  passport.authenticate('google', { failureRedirect: '/login', session: false }, (err, data) => {
    if (err || !data) {
      return res.redirect(`${redirectOrigin}/login?error=google-auth-failed`);
    }
    const { token, user } = data;
    const query = new URLSearchParams({
      token,
      user: JSON.stringify(user),
      from: fromState,
    }).toString();
    res.redirect(`${redirectOrigin}/login?${query}`);
  })(req, res, next);
};

exports.forgotPassword = async (req, res) => {
  const { email, clientUrl } = req.body || {};
  // Prefer explicit client URL from body, fall back to request origin or config
  const originHeader = req.get("origin");
  const requestedClientUrl = clientUrl || originHeader || config.clientUrl;
  try {
    const result = await forgotPassword({ email, clientUrl: requestedClientUrl });
    if (result?.dispatched) {
      debug("forgot password dispatched", {
        email,
        clientUrl: requestedClientUrl,
        transport: result?.meta?.transport || "unknown",
      });
    } else {
      debug("forgot password requested for non-existing email", { email });
    }

    const responsePayload = {
      message: "ถ้ามีอีเมลนี้ในระบบ จะส่งลิงก์ให้",
    };

    if (
      config.server.nodeEnv !== "production" &&
      result?.dispatched &&
      result?.resetLink
    ) {
      responsePayload.previewResetLink = result.resetLink;
    }

    res.json(responsePayload);
  } catch (err) {
    debug("error forgotPassword", err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    await resetPassword({ token, newPassword });
    debug("reset password");
    res.json({ message: "เปลี่ยนรหัสผ่านสำเร็จ" });
  } catch (err) {
    debug("error resetPassword", err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    await deleteAccount(userId);
    debug(`ลบบัญชีผู้ใช้สำเร็จ ID: ${userId}`);
    res.json({
      success: true,
      message: "ลบบัญชีและรีวิวเรียบร้อยแล้ว",
      actions: [{ type: "CLEAR_TOKEN" }, { type: "REDIRECT", url: "/" }],
    });
  } catch (err) {
    debug("เกิดข้อผิดพลาดในการลบบัญชี:", err);
    const status = err.status || 500;
    res.status(status).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการลบบัญชี",
      error: config.server.nodeEnv === "development" ? err.message : undefined,
    });
  }
};
