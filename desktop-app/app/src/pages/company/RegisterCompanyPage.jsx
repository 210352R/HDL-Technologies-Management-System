import React, { useState } from "react";
import axios from "axios";
import { url } from "../../url";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";

const RegisterCompanyPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    prefix: "",
    password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validate passwords
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/admin/register-company`,
        formData
      );
      console.log("Add company successfully");
      await doCreateUserWithEmailAndPassword(formData.email, formData.password);
      console.log(
        "Registration successful ------------------------------------------------"
      );
      setMessage(response.data.message); // Success message
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        prefix: "",
        password: "",
        confirm_password: "",
      }); // Reset form
    } catch (err) {
      setError(err.response?.data?.error || "Failed to Register New Company.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Register New Company
        </h1>
        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
            {message}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-white font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Name"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Address"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Phone"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Email"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">
              Prefix
            </label>
            <input
              type="text"
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Prefix"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
            />
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-3/5 py-2 rounded bg-blue-600 text-white font-semibold text-lg hover:bg-blue-500 transition duration-300"
            >
              Register Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCompanyPage;
