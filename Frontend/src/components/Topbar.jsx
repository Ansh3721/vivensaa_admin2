import React from "react";
import { Search, Bell } from "lucide-react";

export default function Topbar() {
    return (
        <div className="flex justify-between items-center bg-white shadow px-6 py-3">
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg w-1/3">
                <Search className="text-gray-500" size={18} />
                <input
                    type="text"
                    placeholder="Search products, users..."
                    className="bg-transparent focus:outline-none w-full"
                />
            </div>

            <div className="flex items-center gap-6">
                <Bell className="text-gray-600 cursor-pointer" size={22} />
                <div className="flex items-center gap-3">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Admin"
                        className="w-9 h-9 rounded-full border"
                    />
                    <span className="font-semibold text-gray-700">Admin</span>
                </div>
            </div>
        </div>
    );
}
