import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Users,
  BarChart,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1️⃣ Remove admin data
    localStorage.removeItem("admin");

    // 2️⃣ Redirect to login
    navigate("/");

    // 3️⃣ Optional: force reload (not required)
    // window.location.reload();
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-blue-700 text-white h-screen transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-blue-500">
        <h1 className={`font-bold text-xl ${!isOpen && "hidden"}`}>
          Admin Panel
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded-lg"
        >
          <BarChart /> {isOpen && "Dashboard"}
        </Link>

        <Link
          to="/products"
          className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded-lg"
        >
          <ShoppingBag /> {isOpen && "Products"}
        </Link>

        <Link
          to="#"
          className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded-lg"
        >
          <Users /> {isOpen && "Customers"}
        </Link>

        <Link
          to="#"
          className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded-lg"
        >
          <Settings /> {isOpen && "Settings"}
        </Link>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded-lg w-full"
        >
          <LogOut /> {isOpen && "Logout"}
        </button>
      </div>
    </div>
  );
}
