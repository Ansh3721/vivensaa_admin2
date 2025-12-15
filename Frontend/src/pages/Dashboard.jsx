import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Dashboard() {
  const navigate = useNavigate();

  // 🔐 Protect dashboard
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/"); // Redirect to login
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 space-y-6 overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total Sales", value: "$25,000" },
              { title: "Total Orders", value: "1,240" },
              { title: "Customers", value: "580" },
              { title: "Products", value: "120" },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-sm text-gray-500">{card.title}</h2>
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Analytics Section */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Sales Analytics
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              📊 Chart placeholder (connect Recharts or Chart.js)
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
