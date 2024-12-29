import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatRoomForm = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    companyId: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch company options
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/api/companies"); // Update API endpoint as needed
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies: ", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/add-chatroom", formData); // Update API endpoint as needed
      setMessage(response.data.message);
      setFormData({ name: "", description: "", companyId: "" }); // Reset form
    } catch (error) {
      console.error("Error saving chatroom: ", error);
      setMessage("Failed to save chatroom.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Chatroom</h2>
        {message && (
          <div
            className={`mb-4 p-3 text-center rounded ${
              message.includes("successfully") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Chatroom Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter chatroom name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter chatroom description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="companyId"
              className="block text-sm font-medium mb-1"
            >
              Select Company
            </label>
            <select
              id="companyId"
              name="companyId"
              value={formData.companyId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Choose a company
              </option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded font-medium text-white"
          >
            Save Chatroom
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoomForm;
