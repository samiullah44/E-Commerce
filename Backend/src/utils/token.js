import jwt from "jsonwebtoken";
import { saveRefreshToken } from "../models/tokenModel.js";
import { signAccessToken,signRefreshToken } from "./jwt.js";


export const generateToken =async (id, role,req, res) => {
      const accessToken = signAccessToken({ id: id, role: role });
      const refreshToken = signRefreshToken({ id: id });
  
      const decodedRefresh = jwt.decode(refreshToken);
      const expiresAt = new Date(decodedRefresh.exp * 1000);
      await saveRefreshToken({ user_id: id, token: refreshToken, user_agent: req.get("User-Agent"), ip_address: req.ip, expires_at: expiresAt });
  
      const cookieOptions = {
        httpOnly: true,
        sameSite: "strict",
        path: "/api/auth/refresh",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.COOKIE_DOMAIN || undefined,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };
      res.cookie("refreshToken", refreshToken, cookieOptions);
  
  return accessToken;
};