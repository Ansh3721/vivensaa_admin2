import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch product details
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p className="p-6">Loading product...</p>;

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
    data.append("upload_preset", "product_pic"); // replace

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpynehrlz/image/upload", // replace
        { method: "POST", body: data }
      );
      const json = await res.json();
      // ✅ Update image in state to show preview immediately
      setProduct(prev => ({ ...prev, image: json.secure_url }));
      setUploading(false);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert("Image upload failed");
    }
  };

  // Update product
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
          stock: Number(product.stock),
        }),
      });

      if (res.ok) {
        alert("Product updated successfully!");
        // ✅ Redirect to main products page
        navigate("/products");
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Product deleted successfully");
        navigate("/products");
      } else {
        alert("Failed to delete product");
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Product Details</h1>
            <button
              onClick={() => setEditing(!editing)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {editing ? "Cancel Edit" : "Edit Product"}
            </button>
          </div>

          <form className="bg-white p-6 rounded-2xl shadow space-y-4">
            {/* Product Image */}
            <div>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-64 h-64 object-cover rounded mb-2"
                />
              )}
              {editing && (
                <>
                  <input type="file" onChange={handleImageUpload} />
                  {uploading && <p className="text-gray-500">Uploading...</p>}
                </>
              )}
            </div>

            {/* Editable fields */}
            <input
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${editing ? "" : "bg-gray-100 cursor-not-allowed"}`}
              disabled={!editing}
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${editing ? "" : "bg-gray-100 cursor-not-allowed"}`}
              disabled={!editing}
            />

            <input
              name="category"
              placeholder="Category"
              value={product.category}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${editing ? "" : "bg-gray-100 cursor-not-allowed"}`}
              disabled={!editing}
            />

            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={product.stock}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${editing ? "" : "bg-gray-100 cursor-not-allowed"}`}
              disabled={!editing}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className={`w-full border p-2 rounded ${editing ? "" : "bg-gray-100 cursor-not-allowed"}`}
              disabled={!editing}
            />

            {editing && (
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg"
                >
                  Delete Product
                </button>
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
