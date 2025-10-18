// server/src/features/auth/auth-routes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const debug = require("debug")("fictionbook:auth");
const authController = require("./auth-controller");
const { authenticate } = require("./auth-middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.put("/reset-password", authController.resetPassword);
router.delete("/account", authenticate, authController.deleteAccount);

// Google OAuth
router.get("/google", (req, res, next) => {
  const stateParam = req.query.state;
  const base64Pattern = /^[A-Za-z0-9+/=]+$/;
  const isMaybeBase64 =
    typeof stateParam === "string" &&
    base64Pattern.test(stateParam) &&
    stateParam.length % 4 === 0;
  const state = stateParam
    ? isMaybeBase64
      ? stateParam
      : Buffer.from(stateParam).toString("base64")
    : undefined;
  // Ask for offline access to receive a refresh_token
  const options = {
    scope: ['openid', 'profile', 'email'],
    accessType: 'offline',
    prompt: 'consent',
    state,
  };

  debug("/auth/google init", {
    stateRaw: req.query.state,
    state,
    scope: options.scope,
    accessType: options.accessType,
    prompt: options.prompt,
  });

  // Capture the redirect URL that Passport generates for debugging
  const originalRedirect = res.redirect.bind(res);
  res.redirect = function (...args) {
    try {
      const url = typeof args[0] === 'string' ? args[0] : args[1];
      debug("Google OAuth redirect URL:", url);
    } catch (e) {
      debug('Failed to log Google redirect URL:', e?.message || e)
    }
    return originalRedirect(...args);
  };

  passport.authenticate('google', options)(req, res, next);
});

router.get("/google/callback", authController.googleCallback);

module.exports = router;
