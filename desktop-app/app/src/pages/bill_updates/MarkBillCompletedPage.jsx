import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";

const MarkBillCompletedPage = () => {
  const { billId } = useParams();
  const navigate = useNavigate(); // For navigation
  const [bill, setBill] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch bill details by billId
  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/bill/get-bill-by-bill-id/${billId}`
        );
        setBill(response.data.bill);
      } catch (err) {
        setError("Failed to fetch bill details.");
        console.error(err);
      }
    };

    fetchBillDetails();
  }, [billId]);

  // Handle marking bill as complete
  const handleMarkComplete = async () => {
    if (!isPaid) return; // Do not proceed if the checkbox is not checked

    try {
      const response = await axios.put(
        "http://localhost:8000/bill/make-status-completed",
        {
          billId,
        }
      );
      setMessage("Bill marked as completed successfully!");

      // Navigate to new page after showing alert
      setTimeout(() => {
        navigate(`/choose-option/${billId}`);
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError("Failed to mark the bill as completed.");
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
          <h1 className="text-3xl font-bold text-center mb-6">
            Mark Bill as Completed
          </h1>
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

              {/* QR Code Display */}
              <div className="flex justify-center mt-4">
                <img src={bill.lap.qrcode} alt="QR Code" />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="markPaid"
                  checked={isPaid}
                  onChange={() => setIsPaid(!isPaid)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="markPaid"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Mark as Paid
                </label>
              </div>

              <button
                onClick={handleMarkComplete}
                className={`w-full py-2 rounded-md text-lg font-semibold text-white transition duration-300 shadow-md ${
                  isPaid
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
                disabled={!isPaid}
              >
                Mark As Complete
              </button>

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

export default MarkBillCompletedPage;
