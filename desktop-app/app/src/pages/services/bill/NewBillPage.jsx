import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../../components/navbar/Navbar"; // Import the Navbar component

const AddBillForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    brand: "",
    model: "",
    issue: "",
    amount: "",
    announce_date: "",
    handover_date: "",
    status: "",
    images: [""],
  });
  const [isSetQr, setIsSetQr] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? value : value, // Allowing float input for amount
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithISODate = {
      ...formData,
      announce_date: new Date(formData.announce_date).toISOString(),
      handover_date: new Date(formData.handover_date).toISOString(),
      amount: parseFloat(formData.amount), // Convert amount to float
    };
    console.log(formDataWithISODate); // Handle form submission here
    try {
      const response = await axios.post(
        "http://localhost:8000/bill/add-new-bill",
        formDataWithISODate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      // Handle success notification here
    } catch (error) {
      console.error("There was an error!", error);
      alert("There was an error! Please try again."); // Use a better alert method if desired
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar /> {/* Include Navbar here */}
      {!isSetQr ? (
        <div className="flex justify-center items-center mt-5">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Add New Bill
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="name"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500"
                  placeholder="(555) 555-5555"
                  required
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500"
                  placeholder="123 Main St."
                  required
                />
              </div>

              {/* Brand */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="brand"
                >
                  Laptop Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500"
                  placeholder="Dell, HP, etc."
                  required
                />
              </div>

              {/* Model */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="model"
                >
                  Laptop Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500"
                  placeholder="Inspiron 15, MacBook Pro"
                  required
                />
              </div>

              {/* Issue */}
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="issue"
                >
                  Issue Description
                </label>
                <textarea
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full bg-gray-700 text-white placeholder-gray-500"
                  placeholder="Laptop not turning on"
                  required
                />
              </div>

              {/* Amount */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="amount"
                >
                  Repair Price
                </label>
                <input
                  type="text" // Change to text to allow float input
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500"
                  placeholder="500.00" // Updated placeholder to indicate float input
                  required
                />
              </div>

              {/* Announce Date */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="announce_date"
                >
                  Announce Date
                </label>
                <input
                  type="date"
                  id="announce_date"
                  name="announce_date"
                  value={formData.announce_date}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white"
                  required
                />
              </div>

              {/* Handover Date */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="handover_date"
                >
                  Handover Date
                </label>
                <input
                  type="date"
                  id="handover_date"
                  name="handover_date"
                  value={formData.handover_date}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-gray-700 text-white"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Images */}
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="images"
                >
                  Image (Optional)
                </label>
                <input
                  type="text"
                  id="images"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500"
                  placeholder="URL or base64 image string"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="btn bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
              >
                Submit Bill
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-white">QR Code</h1>
          {/* Add QR code component or logic here */}
        </div>
      )}
    </div>
  );
};

export default AddBillForm;
