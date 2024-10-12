import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import { FaPen } from "react-icons/fa"; // Importing an icon from react-icons
import Navbar from "../../components/navbar/Navbar";
import { url } from "../../url";

const SubmitBillPage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [billId, setBillId] = useState("");
  const [message, setMessage] = useState("");
  const [billDetails, setBillDetails] = useState(null);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setBillDetails(null); // Reset bill details on new submission
    setError(""); // Reset error message

    if (billId.trim() === "") {
      setMessage("Bill ID cannot be empty.");
      return;
    }

    try {
      // Call the API to get bill details
      const response = await axios.get(
        `${url}/bill/get-bill-by-bill-id/${billId}`
      );
      setBillDetails(response.data.bill);
      setMessage(`Bill ID ${billId} submitted successfully!`);
      setBillId(""); // Reset input field
    } catch (error) {
      console.log(error);
      setError("Bill could not be fetched. Please check the Bill ID.");
    }
  };

  // Handle updating the bill and navigating to the choose-option page
  const handleUpdateBill = () => {
    navigate(`/choose-option/${billDetails.billId}`); // Navigate to the /choose-option page
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 text-white shadow-xl rounded-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">
            Submit Bill ID
          </h1>

          {/* Hide the input fields and submit button if billDetails are found */}
          {!billDetails ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="billId"
                  className="block text-lg font-medium mb-2"
                >
                  Enter Bill ID:
                </label>
                <input
                  type="text"
                  id="billId"
                  value={billId}
                  onChange={(e) => setBillId(e.target.value)}
                  className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter your Bill ID"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-lg font-semibold text-white transition duration-300 shadow-md transform hover:scale-105"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="mt-6 p-4 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300 transform hover:scale-105 shadow-lg">
              {" "}
              {/* Added hover and scale effects */}
              <h2 className="text-xl font-bold mb-2">Bill Details:</h2>
              <p className="text-gray-300">
                <strong>Bill ID:</strong> {billDetails.billId}
              </p>
              <p className="text-gray-300">
                <strong>Lap Model:</strong> {billDetails.lap.model}
              </p>
              <p className="text-gray-300">
                <strong>Lap Brand:</strong> {billDetails.lap.brand}
              </p>
              <div className="mt-2">
                <strong>QR Code:</strong>
                <img
                  src={billDetails.lap.qrcode}
                  alt="QR Code"
                  className="mt-2 border border-gray-600 rounded-md"
                />
              </div>
              {/* Update Bill Button */}
              <button
                onClick={handleUpdateBill}
                className="mt-4 w-full py-2 bg-green-600 hover:bg-green-500 rounded-md text-lg font-semibold text-white transition duration-300 shadow-md transform hover:scale-105 flex items-center justify-center"
              >
                <FaPen className="mr-2" /> {/* Adding an icon */}
                Update Bill
              </button>
            </div>
          )}

          {/* Message Display */}
          {message && (
            <div className="mt-4 text-center text-green-400 font-semibold">
              {message}
            </div>
          )}

          {/* Error Message Display */}
          {error && (
            <div className="mt-4 text-center text-red-400 font-semibold">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SubmitBillPage;
