// src/pages/Dashboard.js

import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";

const HomePage = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar
  const [isDarkMode, setIsDarkMode] = useState(true); // State to toggle dark mode

  const logOutHandler = async () => {
    await doSignOut();
    console.log("User signed out ------------------ ");
    navigate("/"); // Redirect to login page
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Toggle Sidebar
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode); // Toggle Dark Mode

  return (
    <div className={`${isDarkMode ? "dark" : ""} flex min-h-screen`}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 bg-gray-800 text-white min-h-screen transition-all duration-300">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">HDL Admin</h1>
            <nav className="space-y-4">
              <Link
                to="/home"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/newbill"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                New Bill
              </Link>
              <Link
                to="/admin/users"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                Users
              </Link>
              <Link
                to="/admin/settings"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
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
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-900 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 dark:bg-gray-800 text-white shadow p-4 flex justify-between items-center">
          <h2 className="text-3xl font-semibold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            {/* Toggle Sidebar Button */}
            <button
              onClick={toggleSidebar}
              className="btn bg-gray-700 hover:bg-gray-600 text-white rounded px-4 py-2"
            >
              {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            </button>

            {/* Toggle Dark Mode Button */}
            <button
              onClick={toggleDarkMode}
              className="btn bg-gray-700 hover:bg-gray-600 text-white rounded px-4 py-2"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 text-white">
          <Outlet /> {/* Placeholder for nested routes */}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
