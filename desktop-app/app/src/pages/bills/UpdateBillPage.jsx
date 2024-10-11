import React, { useState } from "react";
import axios from "axios";

const SubmitBillPage = () => {
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

    console.log("Bill ID:", billId);

    try {
      // Call the API to get bill details
      const response = await axios.get(
        `localhost:8000/bill/get-bill-by-bill-id/${billId}`
      );
      setBillDetails(response.data.bill);
      setMessage(`Bill ID ${billId} submitted successfully!`);
      setBillId(""); // Reset input field
    } catch (error) {
      console.log(error);
      setError("Bill could not be fetched. Please check the Bill ID.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 text-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Submit Bill ID</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="billId" className="block text-lg font-medium mb-2">
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

        {/* Bill Details Display */}
        {billDetails && (
          <div className="mt-6 p-4 bg-gray-700 rounded-md">
            <h2 className="text-xl font-bold mb-2">Bill Details:</h2>
            <pre className="text-gray-300">
              {JSON.stringify(billDetails, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitBillPage;
