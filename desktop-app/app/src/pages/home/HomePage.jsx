import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { url } from "../../url";

const HomePage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notification, setNotification] = useState("");
  const [bills, setBills] = useState([]);
  const [metrics, setMetrics] = useState({
    completedBills: 0,
    totalBills: 0,
    pendingBills: 0,
    overdueBills: 0,
    inProgressBills: 0,
  });

  useEffect(() => {
    const fetchRecentBills = async () => {
      try {
        const response = await axios.get(`${url}/bill/get-recent-bills`);
        setBills(response.data.bills);
      } catch (error) {
        console.error("Error fetching recent bills:", error);
      }
    };

    fetchRecentBills();

    const fetchTotalBills = async () => {
      try {
        const response = await axios.get(`${url}/bill/get-all-bills-count`);
        setMetrics((prevMetrics) => ({
          ...prevMetrics,
          totalBills: response.data.count,
        }));
      } catch (error) {
        console.error("Error fetching total bills:", error);
      }
    };

    fetchTotalBills();

    const fetchPendingBills = async () => {
      try {
        const response = await axios.get(`${url}/bill/get-pending-bills-count`);
        setMetrics((prevMetrics) => ({
          ...prevMetrics,
          pendingBills: response.data.count,
        }));
      } catch (error) {
        console.error("Error fetching pending bills:", error);
      }
    };

    fetchPendingBills();

    // Fetch overdue bills count
    const fetchOverdueBills = async () => {
      try {
        const response = await axios.get(`${url}/bill/get-overdue-bills-count`);
        setMetrics((prevMetrics) => ({
          ...prevMetrics,
          overdueBills: response.data.count,
        }));
      } catch (error) {
        console.error("Error fetching overdue bills:", error);
      }
    };

    fetchOverdueBills();

    // Fetch in-progress bills count
    const fetchInProgressBills = async () => {
      try {
        const response = await axios.get(
          `${url}/bill/get-in-progress-bills-count`
        );
        setMetrics((prevMetrics) => ({
          ...prevMetrics,
          inProgressBills: response.data.count,
        }));
      } catch (error) {
        console.error("Error fetching in-progress bills:", error);
      }
    };

    fetchInProgressBills();

    // Fetch completed bills count
    const fetchCompletedBills = async () => {
      try {
        const response = await axios.get(
          `${url}/bill/get-completed-bills-count`
        );
        setMetrics((prevMetrics) => ({
          ...prevMetrics,
          completedBills: response.data.count,
        }));
      } catch (error) {
        console.error("Error fetching completed bills:", error);
      }
    };

    fetchCompletedBills();

    // Example to simulate metrics from API call
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
    }));
  }, []);

  const logOutHandler = async () => {
    await doSignOut();
    navigate("/");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

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
    labels: ["Completed", "Pending", "In Progress", "Overdue"],
    datasets: [
      {
        label: "Bills Status",
        data: [
          metrics.completedBills,
          metrics.pendingBills,
          metrics.inProgressBills,
          metrics.overdueBills,
        ],
        backgroundColor: ["#4caf50", "#294190FF", "#ff9800", "#f44336"],
      },
    ],
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  const getStatusBorderClass = (status) => {
    if (status === "Overdue") return "border-red-500";
    if (status === "Pending") return "border-green-500";
    if (status === "In Progress") return "border-yellow-500";
    return "border-gray-700";
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
                to="/update-bills"
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
                to="/settings"
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
              <h3 className="text-2xl font-bold">Total Bills</h3>
              <p className="text-4xl">{metrics.totalBills}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
              <h3 className="text-2xl font-bold">Pending Bills</h3>
              <p className="text-4xl">{metrics.pendingBills}</p>
            </div>
            <div className="bg-gradient-to-r from-red-400 to-red-600 p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
              <h3 className="text-2xl font-bold">Overdue Bills</h3>
              <p className="text-4xl">{metrics.overdueBills}</p>
            </div>
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
              <h3 className="text-2xl font-bold">In Progress Bills</h3>
              <p className="text-4xl">{metrics.inProgressBills}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
              <h3 className="text-2xl font-bold">Completed Bills</h3>
              <p className="text-4xl">{metrics.completedBills}</p>
            </div>
          </div>
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Monthly Sales</h2>
              <Line data={salesData} />
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Bills Status</h2>
              <Bar data={billsData} />
            </div>
          </div>

          {/* Recent Bills */}
          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg mb-4">Recent Bills</h3>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-2">Bill ID</th>
                  <th className="p-2">Annonce Date</th>
                  <th className="p-2">Handover Date</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr
                    key={bill.billId}
                    className={`border-t ${getStatusBorderClass(bill.status)}`}
                  >
                    <td className="p-2">{bill.billId}</td>
                    <td className="p-2">{formatDate(bill.announce_date)}</td>
                    <td className="p-2">{formatDate(bill.handover_date)}</td>
                    <td className="p-2">{bill.amount}</td>
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
