import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar"; // Import the Navbar component
import QRCodeDisplay from "../../../qr/QRCodeDisplay";
import { url } from "../../../url";

const AddExtBillForm = ({ lapId }) => {
  const { lapid } = useParams();
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
    lapId: "", // New field for lapId
  });
  const [isSetQr, setIsSetQr] = useState(false);
  const [qrCode, setQrCode] = useState("");

  // Fetch lap details on component mount using lapId
  useEffect(() => {
    const fetchLapDetails = async () => {
      try {
        const response = await axios.get(`${url}/lap/get-lap/${lapid}`);
        const { brand, model, lapId } = response.data.lap;
        setFormData((prev) => ({
          ...prev,
          brand: brand || "N/A",
          model: model || "N/A",
          lapId: lapId || "N/A",
        }));
      } catch (error) {
        console.error("Error fetching laptop details:", error);
      }
    };

    fetchLapDetails();
  }, [lapId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithISODate = {
      ...formData,
      announce_date: new Date(formData.announce_date).toISOString(),
      handover_date: new Date(formData.handover_date).toISOString(),
      amount: parseFloat(formData.amount),
    };

    console.log("Form Data:", formDataWithISODate);
    // try {
    //   const response = await axios.post(
    //     `${url}/bill/add-new-bill`,
    //     formDataWithISODate,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   if (response.data.qr_code) {
    //     setIsSetQr(true);
    //     setQrCode(response.data.qr_code);
    //   } else {
    //     alert("There was an error generating the QR Code!");
    //   }
    // } catch (error) {
    //   console.error("Error submitting bill:", error);
    //   alert("Error submitting bill! Please try again.");
    // }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
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

              {/* Brand (Read-Only) */}
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
                  readOnly
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Model (Read-Only) */}
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
                  readOnly
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Lap ID (Read-Only) */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="lapId"
                >
                  Laptop ID
                </label>
                <input
                  type="text"
                  id="lapId"
                  name="lapId"
                  value={formData.lapId}
                  readOnly
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Other fields remain the same */}
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
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500"
                  placeholder="500.00"
                  required
                />
              </div>

              {/* Other fields... */}

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="btn bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
                >
                  Submit Bill
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-white">QR Code</h1>
          <QRCodeDisplay
            qrCodeUrl={qrCode}
            brand={formData.brand}
            model={formData.model}
          />
        </div>
      )}
    </div>
  );
};

export default AddExtBillForm;
