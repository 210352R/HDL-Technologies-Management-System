import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for sidebar toggle

const HomePage = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar

  const logOutHandler = async () => {
    await doSignOut();
    console.log("User signed out ------------------ ");
    navigate("/"); // Redirect to login page
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Toggle Sidebar

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white min-h-screen transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex justify-between items-center">
          {/* Sidebar Toggle Button */}
          <button onClick={toggleSidebar} className="text-white">
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          {/* Only show title if sidebar is open */}
          {isSidebarOpen && (
            <h1 className="text-2xl font-bold ml-4">HDL Admin</h1>
          )}
        </div>
        <nav className="space-y-4 flex-1 p-4">
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
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 text-white shadow p-4 flex justify-between items-center">
          <h2 className="text-3xl font-semibold">Dashboard</h2>
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
