import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import { url } from "../../url";

const DeleteBillPage = () => {
  const { billId } = useParams();
  const navigate = useNavigate(); // For navigation
  const [bill, setBill] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fetch bill details by billId
  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await axios.get(
          `${url}/bill/get-bill-by-bill-id/${billId}`
        );
        setBill(response.data.bill);
      } catch (err) {
        setError("Failed to fetch bill details.");
        console.error(err);
      }
    };

    fetchBillDetails();
  }, [billId]);

  // Handle confirming delete action
  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  // Handle cancel deletion
  const handleCancelDeletion = () => {
    setShowConfirmation(false);
  };

  // Handle delete bill
  const handleDeleteBill = async () => {
    try {
      await axios.delete(`${url}/bill/delete-bill/${billId}`);
      setMessage("Bill deleted successfully!");

      // Navigate to homepage after showing alert
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      setError("Failed to delete the bill.");
      console.error(err);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 text-white shadow-xl rounded-lg p-8 w-full max-w-lg transition-transform transform hover:scale-105">
          <h1 className="text-3xl font-bold text-center mb-6">Delete Bill</h1>
          {bill ? (
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Bill ID: {billId}</h2>
                <p>
                  <strong>Lap ID:</strong> {bill.lapId}
                </p>
                <p>
                  <strong>Status:</strong> {bill.status}
                </p>
                <p>
                  <strong>Brand:</strong> {bill.lap.brand}
                </p>
                <p>
                  <strong>Model:</strong> {bill.lap.model}
                </p>
                <p>
                  <strong>Issue:</strong> {bill.issue}
                </p>
                <p>
                  <strong>Amount:</strong> ${bill.amount.toFixed(2)}
                </p>
                <p>
                  <strong>Announce Date:</strong>{" "}
                  {bill.announce_date
                    ? new Date(bill.announce_date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Handover Date:</strong>{" "}
                  {bill.handover_date
                    ? new Date(bill.handover_date).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={handleDeleteConfirmation}
                className="w-full py-2 rounded-md text-lg font-semibold text-white transition duration-300 shadow-md bg-red-600 hover:bg-red-500"
              >
                Delete Bill
              </button>

              {/* Confirmation Popup */}
              {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                    <h2 className="text-lg font-bold mb-4 text-center">
                      Confirm Deletion
                    </h2>
                    <p className="mb-6 text-center">
                      Are you sure you want to delete this bill?
                    </p>
                    <div className="flex justify-around">
                      <button
                        onClick={handleDeleteBill}
                        className="px-4 py-2 rounded-md text-lg font-semibold text-white bg-red-600 hover:bg-red-500"
                      >
                        Yes
                      </button>
                      <button
                        onClick={handleCancelDeletion}
                        className="px-4 py-2 rounded-md text-lg font-semibold text-white bg-gray-600 hover:bg-gray-500"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {message && (
                <div className="mt-4 text-center text-green-400 font-semibold">
                  {message}
                </div>
              )}
            </div>
          ) : (
            <p className="text-center">Loading bill details...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteBillPage;
