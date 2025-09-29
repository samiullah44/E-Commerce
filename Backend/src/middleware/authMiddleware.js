import { verifyAccessToken } from "../utils/jwt.js";
import { findUserById } from "../models/userModel.js";
export const ensureAuth = async(req, res, next) => {
  try {
    // look for Bearer token first
    const authHeader = req.headers.authorization;
  let token = null;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = verifyAccessToken(token);
    const userRes = await findUserById(payload.id);
    if (userRes.rowCount === 0) return res.status(401).json({ error: "User not found" });

    req.user = { id: userRes.rows[0].id, email: userRes.rows[0].email, role: userRes.rows[0].role };

    next();
  } catch (err) {
    console.error("Auth middleware:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ error: "Forbidden" });
    next();
  };
};
