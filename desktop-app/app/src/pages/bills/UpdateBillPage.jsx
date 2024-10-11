import React, { useState } from "react";

const SubmitBillPage = () => {
  const [billId, setBillId] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (billId.trim() === "") {
      setMessage("Bill ID cannot be empty.");
    } else {
      // Submit the bill ID (you can replace this with your actual submit logic)
      setMessage(`Bill ID ${billId} submitted successfully!`);
      setBillId("");
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
      </div>
    </div>
  );
};

export default SubmitBillPage;
