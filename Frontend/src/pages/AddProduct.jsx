import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  });

  const [uploading, setUploading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Upload image to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "product_pic"); // replace with your preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpynehrlz/image/upload", // replace
        { method: "POST", body: data }
      );

      const json = await res.json();
      setProduct({ ...product, image: json.secure_url });
      setUploading(false);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert("Image upload failed");
    }
  };

  // Submit new product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!product.name || !product.price || !product.image) {
      alert("Name, Price, and Image are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
          stock: Number(product.stock),
        }),
      });

      if (res.ok) {
        alert("Product added successfully!");
        navigate("/products"); // ✅ Redirect to products list
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 max-w-3xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow space-y-4">
            {/* Image Upload */}
            <div>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-64 h-64 object-cover rounded mb-2"
                />
              )}
              <input type="file" onChange={handleImageUpload} />
              {uploading && <p className="text-gray-500">Uploading...</p>}
            </div>

            {/* Product Details */}
            <input
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              name="category"
              placeholder="Category"
              value={product.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Add Product
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
