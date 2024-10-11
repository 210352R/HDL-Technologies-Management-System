import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  FaChartBar,
  FaFileInvoice,
  FaUsers,
  FaCog,
  FaCloudUploadAlt,
  FaEdit,
} from "react-icons/fa";
import { io } from "socket.io-client";
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Required for react-chartjs-2 to work

const HomePage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notification, setNotification] = useState("");
  const [bills, setBills] = useState([]); // State for bills list
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalBills: 0,
    pendingBills: 0,
  }); // Dummy state for cards data

  const socket = io("http://localhost:8000");

  useEffect(() => {
    // Example to simulate metrics from API call
    setMetrics({
      totalRevenue: 50000,
      totalBills: 100,
      pendingBills: 5,
    });

    // Simulate bills data from API call
    setBills([
      { id: 1, customer: "John Doe", amount: 1500, status: "Paid" },
      { id: 2, customer: "Jane Smith", amount: 2000, status: "Pending" },
      { id: 3, customer: "Michael Lee", amount: 1800, status: "Paid" },
    ]);

    socket.on("message", (data) => {
      setNotification(data);
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          new Notification("Notification", { body: data });
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const logOutHandler = async () => {
    await doSignOut();
    navigate("/");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Chart data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [1200, 1900, 3000, 5000, 2000, 3000],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const billsData = {
    labels: ["Paid", "Pending", "Overdue"],
    datasets: [
      {
        label: "Bills Status",
        data: [60, 30, 10],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} flex min-h-screen`}>
      {isSidebarOpen && (
        <aside className="w-64 bg-gray-800 text-white min-h-screen transition-all duration-300">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">HDL Admin</h1>
            <nav className="space-y-4">
              <Link
                to=""
                className="flex items-center hover:bg-gray-700 px-4 py-2 rounded"
              >
                <FaChartBar size={24} className="mr-2" /> Dashboard
              </Link>
              <Link
                to="/admin/newbill"
                className="flex items-center hover:bg-gray-700 px-4 py-2 rounded"
              >
                <FaFileInvoice size={24} className="mr-2" /> New Bill
              </Link>
              <Link
                to="/admin/newbill"
                className="flex items-center hover:bg-gray-700 px-4 py-2 rounded"
              >
                <FaEdit size={24} className="mr-2" /> Update Bill
              </Link>
              <Link
                to="/all-bills"
                className="flex items-center hover:bg-gray-700 px-4 py-2 rounded"
              >
                <FaFileInvoice size={24} className="mr-2" /> Bills
              </Link>
              <Link
                to="/users"
                className="flex items-center hover:bg-gray-700 px-4 py-2 rounded"
              >
                <FaUsers size={24} className="mr-2" /> Users
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center hover:bg-gray-700 px-4 py-2 rounded"
              >
                <FaCog size={24} className="mr-2" /> Settings
              </Link>
              <Link
                to="/memory-backup"
                className="flex items-center hover:bg-gray-700 px-4 py-2 rounded"
              >
                <FaCloudUploadAlt size={24} className="mr-2" /> Backup
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
        <header className="bg-gray-800 dark:bg-gray-800 text-white shadow p-4 flex justify-between items-center">
          {isSidebarOpen ? (
            <IoIosArrowBack
              onClick={toggleSidebar}
              style={{ fontSize: "26px", cursor: "pointer" }}
            />
          ) : (
            <IoIosArrowForward
              onClick={toggleSidebar}
              style={{ fontSize: "26px", cursor: "pointer" }}
            />
          )}
          <h2 className="text-3xl font-semibold">Dashboard</h2>
          <div className="flex items-center space-x-4"></div>
        </header>

        <main className="p-6 text-white">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-lg">Total Revenue</h3>
              <p className="text-2xl font-bold">${metrics.totalRevenue}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-lg">Total Bills</h3>
              <p className="text-2xl font-bold">{metrics.totalBills}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-lg">Pending Bills</h3>
              <p className="text-2xl font-bold">{metrics.pendingBills}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-lg mb-2">Sales Overview</h3>
              <Line data={salesData} />
            </div>
            <div className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-lg mb-2">Bills Status</h3>
              <Bar data={billsData} />
            </div>
          </div>

          {/* Bill List */}
          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg mb-4">Recent Bills</h3>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-2">Bill ID</th>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id} className="border-t border-gray-700">
                    <td className="p-2">{bill.id}</td>
                    <td className="p-2">{bill.customer}</td>
                    <td className="p-2">${bill.amount}</td>
                    <td className="p-2">{bill.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
