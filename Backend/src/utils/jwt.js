import jwt from "jsonwebtoken";
import crypto from "crypto";

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

export function signAccessToken(payload) {
  return jwt.sign(payload, accessSecret, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m" });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, accessSecret);
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, refreshSecret, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d" });
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, refreshSecret);
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
