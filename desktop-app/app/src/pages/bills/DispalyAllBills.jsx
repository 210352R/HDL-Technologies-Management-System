import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import { url } from "../../url";

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [pageSize] = useState(10); // Number of bills per page

  const navigate = useNavigate();

  const fetchBills = async (page = 1, pageSize = 10) => {
    try {
      const response = await axios.get(
        `${url}/bill/get-pagination-bills?limit=${pageSize}&page=${page}`
      );
      console.log(response.data);
      setBills(response.data.bills);
      console.log("Total_pages ", response.data.pagination.totalPages);
      setTotalPages(response.data.pagination.totalPages); // Update total pages
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  useEffect(() => {
    fetchBills(currentPage, pageSize);
  }, [currentPage]);

  const fetchBillDetails = async (billId) => {
    try {
      const response = await axios.get(`${url}/bill/get-bill-by-id/${billId}`);
      setSelectedBill(response.data.bill);
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error fetching bill details:", error);
    }
  };

  const filteredBills = bills.filter((bill) => {
    const matchesStatus =
      filter === "All" || bill.status.toLowerCase() === filter.toLowerCase();
    const matchesSearchTerm = bill.billId
      .toString()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearchTerm;
  });

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBill(null);
  };

  const handleEditBill = (billId) => {
    navigate(`/choose-option/${billId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

        <div className="flex justify-center mb-6">
          {[
            "All",
            "Completed",
            "Cancalled",
            "Pending",
            "In Progress",
            "Overdue",
            "Paid",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBills.length === 0 ? (
            <p className="text-center text-gray-100">No bills found.</p>
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
                <p className="text-gray-700 dark:text-gray-300">
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

        {/* Page Navigation Bar */}
        <div className="fixed bottom-10 left-10 right-10 bg-gray-700 text-white py-4">
          <div className="flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 m-2 rounded-md text-sm font-medium ${
                  currentPage === index + 1
                    ? "bg-blue-500"
                    : "bg-gray-800 hover:bg-blue-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BillList;
