import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

// Importing icons from react-icons
import {
  FaBullhorn,
  FaCalendarAlt,
  FaWrench,
  FaDollarSign,
  FaCheckCircle,
  FaBan,
  FaLaptop,
} from "react-icons/fa";

const UpdateOptionsPage = () => {
  const navigate = useNavigate();

  // Get billId from URL parameters
  const { billId } = useParams();

  // Function to handle option click
  const handleOptionClick = (option) => {
    switch (option) {
      case "Announce Bill":
        navigate(`/update-announce-date/${billId}`);
        break;
      case "Add Handover Date":
        navigate(`/update-handover-date/${billId}`);
        break;
      case "Add / Update Issue":
        navigate("/add-update-issue");
        break;
      case "Change Amount":
        navigate("/change-amount");
        break;
      case "Complete Bill":
        navigate("/complete-bill");
        break;
      case "Cancel Bill":
        navigate("/cancel-bill");
        break;
      case "Change Lap Details":
        navigate("/change-lap-details");
        break;
      default:
        break;
    }
  };

  const options = [
    { name: "Announce Bill", icon: FaBullhorn },
    { name: "Add Handover Date", icon: FaCalendarAlt },
    { name: "Add / Update Issue", icon: FaWrench },
    { name: "Change Amount", icon: FaDollarSign },
    { name: "Complete Bill", icon: FaCheckCircle },
    { name: "Cancel Bill", icon: FaBan },
    { name: "Change Lap Details", icon: FaLaptop },
  ];

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        {/* Display Bill ID in the top-left corner */}
        <div className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          <span className="text-sm font-semibold">Bill ID:</span>{" "}
          <span className="text-lg font-bold">{billId}</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8">Update Options</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {options.map(({ name, icon: Icon }) => (
            <div
              key={name}
              onClick={() => handleOptionClick(name)}
              className="bg-gray-800 text-white rounded-lg shadow-lg p-6 cursor-pointer transition-transform transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-4">
                <Icon className="text-4xl" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{name}</h2>
              <p className="text-gray-300">
                Click to {name.toLowerCase()} for the selected bill.
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpdateOptionsPage;
