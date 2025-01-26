import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { url } from "../../url";
import QRCodeDisplay from "../../qr/QRCodeDisplay";

const AddExtBillForm = ({ route }) => {
  const { lapId } = route.params; // lapId passed as a param from navigation
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
  const [showHandoverDatePicker, setShowHandoverDatePicker] = useState(false);
  const [showAnnounceDatePicker, setShowAnnounceDatePicker] = useState(false);

  // Fetch lap details on component mount using lapId
  useEffect(() => {
    const fetchLapDetails = async (lapid) => {
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
        alert("Error fetching laptop details!");
      }
    };

    if (lapId) {
      fetchLapDetails(lapId); // Call the function if lapId is available
    }
  }, [lapId]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formDataWithISODate = {
      ...formData,
      announce_date: formData.announce_date
        ? new Date(formData.announce_date).toISOString()
        : null,
      handover_date: formData.handover_date
        ? new Date(formData.handover_date).toISOString()
        : null,
      amount: parseFloat(formData.amount),
    };

    try {
      const response = await axios.post(
        `${url}/bill/add-existing-bill`,
        formDataWithISODate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.qr_code) {
        setIsSetQr(true);
        setQrCode(response.data.qr_code);
      } else {
        alert("There was an error generating the QR Code!");
      }
    } catch (error) {
      console.error("Error submitting bill:", error);
      alert("Error submitting bill! Please try again.");
    }
  };

  const downloadQRCode = () => {
    console.log("Downloading QR Code");
  };

  if (isSetQr) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <QRCodeDisplay
          qrCodeUrl={qrCode}
          brand={formData.brand}
          model={formData.model}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-black mb-6">Add New Bill</h1>
      <div className="w-full max-w-md">
        <input
          className="w-full p-3 mb-4 bg-gray-200 text-black rounded border border-black"
          placeholder="Customer Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          className="w-full p-3 mb-4 bg-gray-200 text-black rounded border border-black"
          placeholder="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <input
          className="w-full p-3 mb-4 bg-gray-200 text-black rounded border border-black"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <input
          className="w-full p-3 mb-4 bg-gray-300 text-black rounded border border-black"
          placeholder="Laptop Brand"
          value={formData.brand}
          readOnly
        />
        <input
          className="w-full p-3 mb-4 bg-gray-300 text-black rounded border border-black"
          placeholder="Laptop Model"
          value={formData.model}
          readOnly
        />
        <input
          className="w-full p-3 mb-4 bg-gray-300 text-black rounded border border-black"
          placeholder="Laptop ID"
          value={formData.lapId}
          readOnly
        />
        <textarea
          className="w-full p-3 mb-4 bg-gray-200 text-black rounded border border-black"
          placeholder="Issue Description"
          rows="4"
          value={formData.issue}
          onChange={(e) => handleChange("issue", e.target.value)}
        />
        <input
          className="w-full p-3 mb-4 bg-gray-200 text-black rounded border border-black"
          placeholder="Repair Price"
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
        />
        <div className="mb-4">
          <button
            className="w-full p-3 mb-4 bg-gray-200 text-black rounded border border-black"
            onClick={() => setShowHandoverDatePicker(true)}
          >
            {formData.handover_date || "Select Handover Date"}
          </button>
          {showHandoverDatePicker && (
            <DateTimePicker
              value={new Date()}
              onChange={(date) => {
                setShowHandoverDatePicker(false);
                handleChange("handover_date", date.toISOString().split("T")[0]);
              }}
            />
          )}
        </div>
        <div className="mb-4">
          <button
            className="w-full p-3 mb-4 bg-gray-200 text-black rounded border border-black"
            onClick={() => setShowAnnounceDatePicker(true)}
          >
            {formData.announce_date || "Select Announce Date"}
          </button>
          {showAnnounceDatePicker && (
            <DateTimePicker
              value={new Date()}
              onChange={(date) => {
                setShowAnnounceDatePicker(false);
                handleChange("announce_date", date.toISOString().split("T")[0]);
              }}
            />
          )}
        </div>
        <select
          className="w-full p-3 mb-4 bg-gray-200 text-black rounded border border-black"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Announced">Announced</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          className="w-full p-3 mb-4 bg-gray-200 text-black rounded border border-black"
          placeholder="Image URL or Base64 String (Optional)"
          value={formData.images}
          onChange={(e) => handleChange("images", e.target.value)}
        />
        <button
          className="w-full p-3 bg-blue-800 text-white rounded"
          onClick={handleSubmit}
        >
          Submit Bill
        </button>
      </div>
    </div>
  );
};

export default AddExtBillForm;
