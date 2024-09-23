import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Import the Navbar component

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
    images: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/add-new-bill", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      // Handle success notification here
    } catch (error) {
      console.error("There was an error!", error);
      // Handle error notification here
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar /> {/* Include Navbar here */}
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Add New Bill
          </h2>

          {/* Name */}
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-400 mb-2"
              htmlFor="amount"
            >
              Repair Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500"
              placeholder="500"
              required
            />
          </div>

          {/* Announce Date */}
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
            >
              Submit Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBillForm;
