import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState("All"); // State to manage the current filter

  // Fetch bills using Axios
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/bill/get-all-bills"
        ); // Replace with your API endpoint
        console.log("Fetched bills:", response.data.bills); // Debugging log
        setBills(response.data.bills); // Axios puts response data in 'data' field
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  // Filter bills based on selected status
  const filteredBills = bills.filter((bill) => {
    if (filter === "All") return true;

    if (filter === "Overdue") {
      const today = new Date();
      const handoverDate = new Date(bill.handover_date);
      return (
        bill.status.toLowerCase() === "in progress" && handoverDate < today
      );
    }

    // Normalize status comparison to be case-insensitive
    return bill.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Bill Management
      </h1>

      {/* Status Filter Buttons */}
      <div className="flex justify-center mb-6">
        {[
          "All",
          "Completed",
          "Overdue",
          "Cancelled",
          "Pending",
          "In Progress",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 m-2 rounded-md text-sm font-medium transition-colors ${
              filter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Render filtered bills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBills.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            No bills found for the selected status.
          </p>
        ) : (
          filteredBills.map((bill) => (
            <div
              key={bill.billId} // Use camelCase for key prop
              className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-2">
                Bill ID: {bill.billId}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Lap Brand:</strong> {bill.lap.lap_brand}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Lap Model:</strong> {bill.lap.lap_model}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Issue:</strong> {bill.issue}
              </p>
              <p
                className={`text-gray-700 dark:text-gray-300 ${
                  bill.status.toLowerCase() === "completed"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                <strong>Status:</strong> {bill.status}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Announce Date:</strong> {bill.announce_date}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Handover Date:</strong>{" "}
                {bill.handover_date || "Pending"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BillList;
