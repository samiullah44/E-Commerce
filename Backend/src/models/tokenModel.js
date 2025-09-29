import pool from "../config/db.js";

export const saveRefreshToken = async ({ user_id, token, user_agent = null, ip_address = null, expires_at = null }) => {
  return pool.query(
    `INSERT INTO refresh_tokens (user_id, token, user_agent, ip_address, expires_at)
     VALUES ($1,$2,$3,$4,$5) RETURNING id, user_id, token, created_at, expires_at`,
    [user_id, token, user_agent, ip_address, expires_at]
  );
};

export const findRefreshToken = async (token) => {
  return pool.query("SELECT * FROM refresh_tokens WHERE token = $1", [token]);
};

export const revokeRefreshToken = async (token) => {
  return pool.query("UPDATE refresh_tokens SET revoked = true WHERE token = $1 RETURNING id", [token]);
};

export const deleteRefreshToken = async (token) => {
  return pool.query("DELETE FROM refresh_tokens WHERE token = $1", [token]);
};
