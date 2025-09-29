import pool from "../config/db.js";

export const createPasswordReset = async ({ user_id, token_hash, expires_at }) => {
  return pool.query(
    `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
     VALUES ($1,$2,$3) RETURNING id, user_id, expires_at, created_at`,
    [user_id, token_hash, expires_at]
  );
};

export const findValidResetByHash = async (token_hash) => {
  return pool.query(
    `SELECT * FROM password_reset_tokens
     WHERE token_hash = $1 AND used = false AND expires_at > NOW()
     LIMIT 1`,
    [token_hash]
  );
};

export const markResetUsed = async (id) => {
  return pool.query(`UPDATE password_reset_tokens SET used = true WHERE id = $1 RETURNING id`, [id]);
};

export const invalidateAllUserResets = async (user_id) => {
  return pool.query(`UPDATE password_reset_tokens SET used = true WHERE user_id = $1`, [user_id]);
};
