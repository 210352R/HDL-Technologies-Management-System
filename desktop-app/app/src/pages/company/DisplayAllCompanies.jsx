// Import necessary dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../url";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const DisplayAllCompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router hook for navigation

  // Fetch companies from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${url}/admin/get-all-companies`);
        setCompanies(response.data.companies);
      } catch (err) {
        setError("Failed to fetch companies.");
      }
    };

    fetchCompanies();
  }, []);

  const handleChatNavigation = (companyId) => {
    navigate(`company/chat/${companyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-100">Companies</h1>
        <p className="text-gray-400">List of all registered companies</p>
      </header>

      {error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow relative"
            >
              <h2 className="text-2xl font-semibold text-gray-100 mb-2">
                {company.name}
              </h2>
              <p className="text-gray-400 mb-2">
                <strong>Address:</strong> {company.address}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Phone:</strong> {company.phone}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Email:</strong> {company.email}
              </p>
              <p className="text-gray-400">
                <strong>Prefix:</strong> {company.prefix}
              </p>
              <button
                onClick={() => handleChatNavigation(company.id)}
                className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg focus:outline-none transition-all"
                aria-label={`Chat with ${company.name}`}
              >
                <FaRobot size={24} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayAllCompaniesPage;
