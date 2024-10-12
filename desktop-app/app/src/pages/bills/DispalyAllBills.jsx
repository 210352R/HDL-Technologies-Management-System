import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import { url } from "../../url";

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedBill, setSelectedBill] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch bills using Axios
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(`${url}/bill/get-all-bills`);
        console.log("Fetched bills:", response.data.bills);
        setBills(response.data.bills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  // Fetch bill details using Axios
  const fetchBillDetails = async (billId) => {
    try {
      const response = await axios.get(`${url}/bill/get-bill-by-id/${billId}`);
      console.log("Fetched bill details:", response.data.bill);
      setSelectedBill(response.data.bill);
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error fetching bill details:", error);
    }
  };

  // Filter bills based on status and search term
  const filteredBills = bills.filter((bill) => {
    const matchesStatus =
      filter === "All" || bill.status.toLowerCase() === filter.toLowerCase();
    const matchesSearchTerm = bill.billId
      .toString()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearchTerm;
  });

  // Close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBill(null);
  };

  // Handle edit button click and navigate to the edit page
  const handleEditBill = (billId) => {
    navigate(`/choose-option/${billId}`); // Route to the edit page with billId
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-600 dark:bg-gray-900 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Bill Details
        </h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by Bill ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md w-full md:w-1/2 text-white bg-gray-800"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex justify-center mb-6">
          {[
            "All",
            "Completed",
            "Cancalled",
            "Pending",
            "In Progress",
            "Overdue",
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
            <p className="text-center text-gray-100">
              No bills found for the selected status or search term.
            </p>
          ) : (
            filteredBills.map((bill) => (
              <div
                key={bill.billId}
                className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-lg p-6 cursor-pointer"
                onClick={() => fetchBillDetails(bill.id)}
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

        {/* Popup for bill details */}
        {isPopupOpen && selectedBill && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                Bill Details for ID: {selectedBill.billId}
              </h2>

              {/* Landscape grid structure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p>
                    <strong>Lap Brand:</strong> {selectedBill.lap.brand}
                  </p>
                  <p>
                    <strong>Lap Model:</strong> {selectedBill.lap.model}
                  </p>
                  <p>
                    <strong>RAM:</strong> {selectedBill.lap.ram}
                  </p>
                  <p>
                    <strong>SSD:</strong> {selectedBill.lap.ssd}
                  </p>
                  <p>
                    <strong>Hard Disk:</strong> {selectedBill.lap.hard}
                  </p>
                  <p>
                    <strong>Issue:</strong> {selectedBill.issue}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedBill.status}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${selectedBill.amount}
                  </p>
                  <p>
                    <strong>Announce Date:</strong> {selectedBill.announce_date}
                  </p>
                  <p>
                    <strong>Handover Date:</strong>{" "}
                    {selectedBill.handover_date || "Pending"}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">User Details:</h3>
                  <p>
                    <strong>Name:</strong> {selectedBill.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedBill.user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedBill.user.phone}
                  </p>

                  <h3 className="font-semibold mt-4">QR Code:</h3>
                  <img
                    src={selectedBill.lap.qrcode}
                    alt="QR Code"
                    className="mt-2 rounded"
                  />
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-semibold mt-4">Images:</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {selectedBill.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Bill Image ${index + 1}`}
                        className="rounded shadow"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEditBill(selectedBill.billId)}
                  className="bg-green-500 text-white rounded px-4 py-2"
                >
                  Edit Bill Details
                </button>

                <button
                  onClick={closePopup}
                  className="bg-blue-500 text-white rounded px-4 py-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BillList;
