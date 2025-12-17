import db from "../config/db.js";

// Create a new admin
export const createAdmin = async ({ name, email, password }) => {
  const [result] = await db.query(
    "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return result.insertId;
};

// Find admin by email
export const findAdminByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM admins WHERE email = ?",
    [email]
  );
  return rows[0]; // returns first row or undefined
};

// Find admin by id
export const findAdminById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM admins WHERE id = ?",
    [id]
  );
  return rows[0];
};
