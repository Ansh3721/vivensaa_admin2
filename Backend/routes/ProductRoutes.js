import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../models/productModel.js";

const router = express.Router();

/* ADD PRODUCT */
router.post("/", async (req, res) => {
  try {
    const id = await createProduct(req.body);
    res.status(201).json({ message: "Product Added", id });
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

/* GET ALL PRODUCTS */
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    console.error("Get Products Error:", err);
    res.status(500).json({ message: "Failed to get products" });
  }
});

/* GET SINGLE PRODUCT */
router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Get Product Error:", err);
    res.status(500).json({ message: "Failed to get product" });
  }
});

/* UPDATE PRODUCT */
router.put("/:id", async (req, res) => {
  try {
    const affectedRows = await updateProduct(req.params.id, req.body);
    if (!affectedRows) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated" });
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
});

/* DELETE PRODUCT */
router.delete("/:id", async (req, res) => {
  try {
    const affectedRows = await deleteProduct(req.params.id);
    if (!affectedRows) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
