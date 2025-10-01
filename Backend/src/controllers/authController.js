import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "../models/userModel.js";
import { findRefreshToken, revokeRefreshToken, deleteRefreshToken } from "../models/tokenModel.js";
import { generateToken } from "../utils/token.js";
import { verifyAccessToken } from "../utils/jwt.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { createPasswordReset, findValidResetByHash, markResetUsed, invalidateAllUserResets } from "../models/passwordResetModel.js";

const formatErrors = errs =>
  errs.map(e => ({ field: e.param, message: e.msg }));

export let signupUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: formatErrors(errors.array()),
    });
  }

  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

    const userExists = await findUserByEmail(email);
    if (userExists.rowCount > 0) return res.status(422).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(password, salt);

    const inserted = await createUser(email, password_hash, name);
    const user = inserted.rows[0];

    // create tokens
    const accessToken = await generateToken( user.id,user.role,req ,res);
    
    return res.status(201).json({
      message: "Account created successfully!",
      accessToken,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ message: "Server error! Try Again later." });
  }
};

export const loginUser = async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      errors: formatErrors(errors.array()),
    });
  }
  try {
    const { email, password } = req.body;
    const userRes = await findUserByEmail(email);
    if (userRes.rowCount === 0) return res.status(401).json({ message: "Invalid Email or Password" });
    const user = userRes.rows[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: "Invalid Email or Password" });

    const accessToken = await generateToken(user.id,user.role,req,res);

    return res.json({
      message: "Login successful",
      accessToken,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Server error! Try Again later" });
  }
};

export const refresh = async (req, res) => {
 try {
    // refresh token comes from httpOnly cookie
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    // check db
    const tokenRow = await findRefreshToken(token);
    if (tokenRow.rowCount === 0) return res.status(401).json({ message: "Invalid refresh token" });
    const stored = tokenRow.rows[0];
    if (stored.revoked) return res.status(401).json({ message: "Token revoked" });

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (e) {
      await revokeRefreshToken(token);
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    // issue new access token (and optionally new refresh token)
    const accessToken = await generateToken(payload.id,payload.role,req,res);
    await revokeRefreshToken(token);
    return res.json({ accessToken });
  } catch (err) {
    console.error("Refresh token error:", err.message);
    return res.status(500).json({ message: "Server error! Try Again later." });
  }
};

export const logoutUser = async(req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      // revoke in DB
      await revokeRefreshToken(token);
    }
    // clear cookie
    res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      errors: formatErrors(errors.array()),
    });
  }
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const userRes = await findUserByEmail(email);
    if (userRes.rowCount === 0) {
      // Do not reveal whether email exists — respond success to prevent enumeration
      return res.json({ message: "If the email exists, a reset link has been sent." });
    }
    const user = userRes.rows[0];

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await invalidateAllUserResets(user.id);
    await createPasswordReset({ user_id: user.id, token_hash: tokenHash, expires_at: expiresAt });

    // create reset link (frontend route)
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${rawToken}&email=${encodeURIComponent(user.email)}`;

    // send email
    const html = `
      <p>Hi ${user.name || ""},</p>
      <p>You requested a password reset. Click the link below to reset your password. This link expires in 10 min.</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you didn't request this, ignore this email.</p>
    `;

    await sendEmail({ to: user.email, subject: "Reset your password", html });

    return res.json({ message: "If the email exists, a reset link has been sent." });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password, email } = req.body;
    if (!token || !password || !email) return res.status(400).json({ message: "Token, email and new password are required" });

    // hash token to compare
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const resetRes = await findValidResetByHash(tokenHash);
    if (resetRes.rowCount === 0) return res.status(400).json({ message: "Invalid or expired reset token" });

    const resetRow = resetRes.rows[0];

    // optional: verify that email matches
    if (email) {
      const userRes = await findUserById(resetRow.user_id);
      if (userRes.rowCount === 0) return res.status(400).json({ message: "Invalid token" });
      if (userRes.rows[0].email !== email) return res.status(400).json({ message: "Invalid token" });
    }

    // update user's password
    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(password, salt);

    await pool.query("UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2", [password_hash, resetRow.user_id]);

    await markResetUsed(resetRow.id);

    // optional: revoke all refresh tokens for this user (force logout all sessions)
    await pool.query("UPDATE refresh_tokens SET revoked = true WHERE user_id = $1", [resetRow.user_id]);

    return res.json({ message: "Password has been reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const googleSignIn=async()=>{

}