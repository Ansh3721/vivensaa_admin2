import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js"; // import the connection

import adminRoutes from "./routes/Adminauth.js";
import productRoutes from "./routes/ProductRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
