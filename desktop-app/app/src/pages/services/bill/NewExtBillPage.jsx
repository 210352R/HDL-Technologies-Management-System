import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import QRCodeDisplay from "../../../qr/QRCodeDisplay";
import { storage } from "../../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { url } from "../../../url";

const AddNewExtBillForm = () => {
  const { lapid } = useParams();
  const [uploadurl, setUploadUrl] = useState("");
  const [formData, setFormData] = useState({
    billId: "",
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
    images: [],
    ram: "",
    ssd: "",
    hard: "",
    customSsd: "",
    companyUser: false,
  });
  const [isSetQr, setIsSetQr] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const [statusOptions, setStatusOptions] = useState([
    "Pending",
    "In Progress",
    "Completed",
  ]);
  // use state for userId
  const [userId, setUserId] = useState("");
  const [isHandoverDateDisabled, setIsHandoverDateDisabled] = useState(false);
  const [isAnnounceDateDisabled, setIsAnnounceDateDisabled] = useState(false);

  const [phoneError, setPhoneError] = useState("");

  const [isUserDetected, setIsUserDetected] = useState(false);

  const [prefix, setPrefix] = useState("");
  const [prefixList, setPrefixList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d{10}$/.test(value) && value !== "") {
        setPhoneError("Phone number must be exactly 10 digits.");
      } else {
        setPhoneError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? value : value,
    }));

    if (name === "announce_date" && value) {
      setIsHandoverDateDisabled(true);
      setStatusOptions(["Pending"]);
    } else if (name === "handover_date" && value) {
      setIsAnnounceDateDisabled(true);
      setStatusOptions(["In Progress", "Completed"]);
    }
  };

  useEffect(() => {
    const fetchLapDetails = async () => {
      try {
        const response = await axios.get(`${url}/lap/get-lap/${lapid}`);
        console.log("LAP ::: ", response.data.lap);
        const { brand, model, lapId, ram, ssd, hard } = response.data.lap;
        setFormData((prev) => ({
          ...prev,
          brand: brand || "N/A",
          model: model || "N/A",
          lapId: lapId || "N/A",
          ram: ram || "N/A",
          ssd: ssd || "N/A",
          hard: hard || "N/A",
        }));
      } catch (error) {
        console.error("Error fetching laptop details:", error);
      }
    };

    fetchLapDetails();
  }, [lapId]);

  const handleCustomSsdChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      customSsd: e.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setUploadUrl(url);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithISODate = {
      ...formData,
      billId: prefix === "" ? formData.billId : `${prefix}-${formData.billId}`,
      announce_date: formData.announce_date
        ? new Date(formData.announce_date).toISOString()
        : null,
      handover_date: formData.handover_date
        ? new Date(formData.handover_date).toISOString()
        : null,
      amount: formData.amount ? parseFloat(formData.amount) : 0.0,
    };

    console.log("BillBody", formDataWithISODate);

    // try {
    //   if (!isUserDetected) {
    //     const response = await axios.post(
    //       `${url}/bill/add-new-bill`,
    //       formDataWithISODate,
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     setIsSetQr(true);
    //     setQrCode(response.data.qr_code);
    //   } else {
    //     const response = await axios.post(
    //       `${url}/bill/add-existing-user-bill`,
    //       {
    //         ...formDataWithISODate,
    //         userId: userId,
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     setIsSetQr(true);
    //     setQrCode(response.data.qr_code);
    //   }
    // } catch (error) {
    //   console.error("There was an error!", error);
    //   alert("There was an error! Please try again.");
    // }
  };

  const fetchUserByPhone = async (phone) => {
    try {
      const response = await axios.get(
        `${url}/users/get-user-by-phone/${phone}`
      );
      const { user } = response.data;
      if (user) {
        setFormData((prev) => ({
          ...prev,
          name: user.name,
          address: user.address,
        }));
        setIsUserDetected(true);
        setUserId(user.id);
      } else {
        setIsUserDetected(false);
      }
    } catch (error) {
      console.log("No user Found -------- ");
      setIsUserDetected(false);
    }
  };

  const fetchPrefixes = async () => {
    try {
      const response = await axios.get(
        `${url}/admin/get-all-companies-prefixes`
      );
      // Extract the prefixes from the response
      console.log(response.data.prefixes);
      setPrefixList(response.data.prefixes);
    } catch (err) {
      console.error("Error fetching prefixes:", err);
    }
  };

  useEffect(() => {
    if (formData.companyUser) {
      fetchPrefixes();
    }
    if (formData.phone.length === 10) {
      fetchUserByPhone(formData.phone);
    }
  }, [formData.phone, formData.companyUser]);

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, companyUser: e.target.checked }));
    if (!e.target.checked) {
      setPrefix(""); // Clear prefix if checkbox is unchecked
    }
  };

  const handlePrefixChange = (e) => {
    setPrefix(e.target.value);
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
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="billId"
                >
                  Bill ID
                </label>

                {formData.companyUser && (
                  <select
                    value={prefix}
                    onChange={handlePrefixChange}
                    className="select select-bordered bg-gray-700 text-white mb-2"
                  >
                    <option value="">Select Prefix</option>
                    {prefixList.map((prefixValue, index) => (
                      <option key={index} value={prefixValue.prefix}>
                        {prefixValue.prefix}
                      </option>
                    ))}
                  </select>
                )}

                <input
                  type="text"
                  id="billId"
                  name="billId"
                  value={formData.billId}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-500"
                  placeholder="Enter Bill ID"
                  required
                />

                <div className="mt-2">
                  <label className="flex items-center space-x-2 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      checked={formData.companyUser}
                      onChange={handleCheckboxChange}
                      className="checkbox checkbox-primary"
                    />
                    <span>Company User</span>
                  </label>
                </div>
              </div>

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
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                )}
              </div>

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
                  disabled={isUserDetected}
                />
              </div>

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
                  disabled={isUserDetected}
                />
              </div>

              {/* Other fields like brand, model, issue, etc. */}
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
                  disabled={isAnnounceDateDisabled}
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
                  disabled={isHandoverDateDisabled}
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
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* RAM Dropdown */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="ram"
                >
                  RAM
                </label>
                <select
                  id="ram"
                  name="ram"
                  value={formData.ram}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-gray-700 text-white"
                >
                  <option value="">Select RAM Size</option>
                  <option value="2GB">2GB</option>
                  <option value="4GB">4GB</option>
                  <option value="8GB">8GB</option>
                  <option value="16GB">16GB</option>
                  <option value="32GB">32GB</option>
                </select>
              </div>

              {/* SSD Dropdown */}
              <div>
                {/* SSD Dropdown */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-400 mb-2"
                    htmlFor="ssd"
                  >
                    SSD
                  </label>
                  <select
                    id="ssd"
                    name="ssd"
                    value={formData.ssd}
                    onChange={handleChange}
                    className="select select-bordered w-full bg-gray-700 text-white"
                  >
                    <option value="">Select SSD Size</option>
                    <option value="128GB">128GB</option>
                    <option value="256GB">256GB</option>
                    <option value="512GB">512GB</option>
                    <option value="1TB">1TB</option>
                    <option value="Custom">Custom</option> {/* Custom Option */}
                  </select>
                </div>

                {/* Conditionally render the custom SSD input field */}
                {formData.ssd === "Custom" && (
                  <div className="mt-4">
                    <label
                      className="block text-sm font-medium text-gray-400 mb-2"
                      htmlFor="customSsd"
                    >
                      Enter Custom SSD Size
                    </label>
                    <input
                      type="text"
                      id="customSsd"
                      name="customSsd"
                      value={formData.customSsd}
                      onChange={handleCustomSsdChange}
                      className="input input-bordered w-full bg-gray-700 text-white"
                      placeholder="Enter SSD Size (e.g., 2TB, 3TB)"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Hard Drive Dropdown */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="hard"
                >
                  Hard Drive
                </label>
                <select
                  id="hard"
                  name="hard"
                  value={formData.hard}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-gray-700 text-white"
                >
                  <option value="">Select Hard Drive Size</option>
                  <option value="500GB">500GB</option>
                  <option value="1TB">1TB</option>
                  <option value="2TB">2TB</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-400 mb-2"
                  htmlFor="images"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="images"
                  onChange={handleImageUpload}
                  className="file-input file-input-bordered w-full bg-gray-700 text-white"
                />
              </div>

              <div>
                {/* Submit button */}
                <button type="submit" className="mt-6 btn btn-primary w-full">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <QRCodeDisplay
          qrCodeUrl={qrCode}
          brand={formData.brand}
          model={formData.model}
        />
      )}
    </div>
  );
};

export default AddNewExtBillForm;
