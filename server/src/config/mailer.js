// src/config/mailer.js
const nodemailer = require("nodemailer");
const debug = require("debug")("fictionbook:mailer");
const config = require("./index");

const hasSmtpConfig = Boolean(config.email.host);

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: Number(config.email.port) === 465,
      auth: config.email.user
        ? { user: config.email.user, pass: config.email.pass }
        : undefined,
    })
  : nodemailer.createTransport({
      streamTransport: true,
      newline: "unix",
      buffer: true,
    });

async function sendEmail({ to, subject, html }) {
  debug("Attempting to send email to:", to);
  const info = await transporter.sendMail({
    from: config.email.from,
    to,
    subject,
    html,
  });

  const summary = {
    messageId: info.messageId,
    transport: hasSmtpConfig ? "smtp" : "stub",
  };

  if (!hasSmtpConfig && info.message) {
    const preview = info.message.toString();
    debug("Email preview (stub transport):\n%s", preview);
    return { ...summary, preview };
  }

  debug("Email sent to:", to, "messageId:", info.messageId);
  return summary;
}

module.exports = { sendEmail, transporter, hasSmtpConfig };
