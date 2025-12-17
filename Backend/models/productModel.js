// productModel.js
import db from "../config/db.js";

/* ===== Create Product ===== */
export const createProduct = async ({ name, price, description, category, stock, image }) => {
  const [result] = await db.query(
    `INSERT INTO products (name, price, description, category, stock, image) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, price, description, category, stock, image]
  );
  return result.insertId; // returns the new product's ID
};

/* ===== Get All Products ===== */
export const getAllProducts = async () => {
  const [rows] = await db.query(
    `SELECT * FROM products ORDER BY created_at DESC`
  );
  return rows;
};

/* ===== Get Product by ID ===== */
export const getProductById = async (id) => {
  const [rows] = await db.query(
    `SELECT * FROM products WHERE id = ?`,
    [id]
  );
  return rows[0]; // return single product object
};

/* ===== Update Product ===== */
export const updateProduct = async (id, data) => {
  const { name, price, description, category, stock, image } = data;
  const [result] = await db.query(
    `UPDATE products 
     SET name=?, price=?, description=?, category=?, stock=?, image=? 
     WHERE id=?`,
    [name, price, description, category, stock, image, id]
  );
  return result.affectedRows; // number of rows updated
};

/* ===== Delete Product ===== */
export const deleteProduct = async (id) => {
  const [result] = await db.query(
    `DELETE FROM products WHERE id=?`,
    [id]
  );
  return result.affectedRows; // number of rows deleted
};
