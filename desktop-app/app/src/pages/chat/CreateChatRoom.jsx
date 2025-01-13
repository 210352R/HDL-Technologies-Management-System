import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../url";

const AddChatRoom = () => {
  const [chatRoomName, setChatRoomName] = useState("");
  const [chatRoomDescription, setChatRoomDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);
  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch company details on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${url}/chat/get-unregistered-companies`
        );
        setCompanies(response.data.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setErrorMessage("Failed to fetch company details.");
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chatRoomData = {
      name: chatRoomName,
      description: chatRoomDescription,
      company_id: companyId,
    };

    try {
      const response = await axios.post(
        `${url}/chat/add-chatroom`,
        chatRoomData
      );
      setResponseMessage(response.data.message);
      setErrorMessage(null);
      setChatRoomName("");
      setChatRoomDescription("");
      setCompanyId("");
    } catch (error) {
      console.error("Error while adding chat room:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to save chat data. Please try again."
      );
      setResponseMessage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-400 mb-4 text-center">
          Add Chat Room
        </h1>

        {responseMessage && (
          <div className="bg-blue-600 text-white p-3 rounded mb-4">
            {responseMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="chatRoomName"
            >
              Chat Room Name
            </label>
            <input
              type="text"
              id="chatRoomName"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter chat room name"
              value={chatRoomName}
              onChange={(e) => setChatRoomName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="chatRoomDescription"
            >
              Chat Room Description
            </label>
            <textarea
              id="chatRoomDescription"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter chat room description"
              value={chatRoomDescription}
              onChange={(e) => setChatRoomDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="companyId"
            >
              Select Company
            </label>
            <select
              id="companyId"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a company
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Chat Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChatRoom;
