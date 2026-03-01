const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetEmail = async (email, token) => {
  const mailOptions = {
    from: `"NeuroQuiz Recovery" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "NeuroQuiz Password Reset Code",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
        <h2 style="color: #0f172a; text-align: center;">NeuroQuiz</h2>
        <p>Hello,</p>
        <p>You requested a password reset. Use the following 6-digit code to securely reset your password. This code will expire in 10 minutes.</p>
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-radius: 12px; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: 900; letter-spacing: 10px; color: #0f172a;">${token}</span>
        </div>
        <p style="color: #64748b; font-size: 12px; text-align: center;">If you didn't request this, you can safely ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="text-align: center; font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">© 2026 NeuroQuiz Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
};

module.exports = { sendResetEmail };