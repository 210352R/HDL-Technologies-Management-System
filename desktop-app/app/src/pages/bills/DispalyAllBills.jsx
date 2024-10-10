import React, { useEffect, useState } from "react";

const BillList = () => {
  const [bills, setBills] = useState([]);

  // Fetch bills from API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT"); // Replace with your API
        const data = await response.json();
        setBills(data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Bill Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <div key={bill.bill_Id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              Bill ID: {bill.bill_Id}
            </h2>
            <p className="text-gray-700">
              <strong>Lap Brand:</strong> {bill.lap_brand}
            </p>
            <p className="text-gray-700">
              <strong>Lap Model:</strong> {bill.lap_model}
            </p>
            <p className="text-gray-700">
              <strong>Issue:</strong> {bill.issue}
            </p>
            <p
              className={`text-gray-700 ${
                bill.status === "completed" ? "text-green-600" : "text-red-600"
              }`}
            >
              <strong>Status:</strong> {bill.status}
            </p>
            <p className="text-gray-700">
              <strong>Announce Date:</strong> {bill.announce_date}
            </p>
            <p className="text-gray-700">
              <strong>Handover Date:</strong> {bill.handover_date || "Pending"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillList;
