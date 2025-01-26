import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../../url";

const QrCodeReader = () => {
  const [scannedData, setScannedData] = useState("");
  const [lapDetails, setLapDetails] = useState(null);
  const [lapId, setLapId] = useState("");
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      setScannedData((prev) => prev + event.key);

      if (event.key === "Enter") {
        const trimmedData = scannedData.trim();
        console.log("Scanned LapID:", trimmedData);
        fetchLapDetails(trimmedData);
        setLapId(trimmedData);
        setScannedData("");
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [scannedData]);

  const fetchLapDetails = async (lapId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${url}/lap/get-bill/${lapId}`);
      const { lap, bills } = response.data;
      setLapDetails(lap);
      setBills(bills);
    } catch (err) {
      console.error("Error fetching lap and bills:", err);
      setError("Could not fetch lap details or bills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to Add Bill page
  const navigateToAddBill = () => {
    navigate(`add-ext-bill/${lapId}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-400">
        SCAN QR-CODE
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-2">
          <span className="font-semibold">Scanned Data:</span>{" "}
          <span className="font-mono text-blue-300">
            {scannedData || "Waiting for input..."}
          </span>
        </p>

        {error && <p className="text-red-500 font-medium">{error}</p>}

        {/* Add Bill Button */}
        {bills.length > 0 && (
          <div className="absolute top-6 right-6">
            <button
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg space-x-2 transition"
              onClick={navigateToAddBill}
            >
              <span>Add Bill</span>
            </button>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3">Loading...</span>
          </div>
        )}

        {lapDetails && !loading && (
          <div className="my-6">
            <h2 className="text-2xl font-bold mb-3 text-blue-300">
              Laptop Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded shadow">
                <p>
                  <strong>Brand:</strong> {lapDetails.brand}
                </p>
                <p>
                  <strong>Model:</strong> {lapDetails.model}
                </p>
                <p>
                  <strong>RAM:</strong> {lapDetails.ram || "N/A"}
                </p>
                <p>
                  <strong>SSD:</strong> {lapDetails.ssd || "N/A"}
                </p>
                <p>
                  <strong>Hard Disk:</strong> {lapDetails.hard || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {bills.length > 0 && !loading && (
          <div className="my-6">
            <h2 className="text-2xl font-bold mb-3 text-blue-300">
              Related Bills
            </h2>
            <div className="space-y-4">
              {bills.map((bill) => (
                <div
                  key={bill.id}
                  className="bg-gray-700 p-4 rounded shadow border border-gray-600"
                >
                  <p>
                    <strong>Bill ID:</strong> {bill.billId}
                  </p>
                  <p>
                    <strong>Issue:</strong> {bill.issue}
                  </p>
                  <p>
                    <strong>Amount:</strong> {bill.amount.toFixed(2)}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(bill.date).toLocaleDateString()}
                  </p>
                  {bill.images.length > 0 && (
                    <div className="mt-2">
                      <strong>Images:</strong>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {bill.images.map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={`Bill ${bill.billId} Image ${idx + 1}`}
                            className="h-24 w-24 object-cover rounded-md border border-gray-600"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCodeReader;
