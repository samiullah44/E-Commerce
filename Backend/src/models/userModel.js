import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  return pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

export const createUser = async (email, password_hash, name) => {
  return pool.query(
    `INSERT INTO users (email, password_hash, name, is_verified)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, name, role, created_at`,
    [email, password_hash, name, password_hash ? false : true]
  );
};

export const findUserById = async (id) => {
  return pool.query("SELECT id, email, name, role FROM users WHERE id = $1", [id]);
};
