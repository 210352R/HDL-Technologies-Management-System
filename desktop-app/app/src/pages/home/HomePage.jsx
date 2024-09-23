// src/pages/Dashboard.js

import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";

const HomePage = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const logOutHandler = async () => {
    await doSignOut();
    console.log("User signed out ------------------ ");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white min-h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">HDL Admin</h1>
          <nav className="space-y-4">
            <Link
              to="/admin/dashboard"
              className="block hover:bg-blue-600 px-4 py-2 rounded"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/newbill"
              className="block hover:bg-blue-600 px-4 py-2 rounded"
            >
              New Bill
            </Link>
            <Link
              to="/admin/users"
              className="block hover:bg-blue-600 px-4 py-2 rounded"
            >
              Users
            </Link>
            <Link
              to="/admin/settings"
              className="block hover:bg-blue-600 px-4 py-2 rounded"
            >
              Settings
            </Link>
            <button
              onClick={logOutHandler}
              className="w-full text-left hover:bg-red-600 px-4 py-2 rounded"
            >
              Log Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4">
          <h2 className="text-3xl font-semibold text-gray-700">Dashboard</h2>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <Outlet /> {/* Placeholder for nested routes */}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
