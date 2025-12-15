import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6">
          {/* Add Product Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/products/add")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Add Product
            </button>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <p className="text-gray-500">No products found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer"
                >
                  {/* Product Image */}
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded mb-2"
                      onClick={() => navigate(`/products/${product._id}`)}
                    />
                  )}

                  {/* Product Name */}
                  <h2
                    className="font-bold text-lg hover:text-blue-600"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    {product.name}
                  </h2>

                  <p className="text-gray-600 mt-1">₹ {product.price}</p>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
