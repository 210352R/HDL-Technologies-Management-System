import { useNavigate } from "react-router-dom"; // Import useNavigate

const UpdateBillList = () => {
  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedBill, setSelectedBill] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate(); // React Router's navigation hook

  // Fetch bills using Axios
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/bill/get-all-bills"
        );
        setBills(response.data.bills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  // Fetch bill details using Axios
  const fetchBillDetails = async (billId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/bill/get-bill-by-id/${billId}`
      );
      setSelectedBill(response.data.bill);
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error fetching bill details:", error);
    }
  };

  // Close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBill(null);
  };

  // Handle edit button click and navigate to the edit page
  const handleEditBill = (billId) => {
    navigate(`/admin/edit-bill/${billId}`); // Route to the edit page with billId
  };

  return (
    <>
      {/* ... your existing code for Navbar, filters, and displaying bills ... */}

      {/* Popup for bill details */}
      {isPopupOpen && selectedBill && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              Bill Details for ID: {selectedBill.billId}
            </h2>

            {/* Landscape grid structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>{/* Bill details content */}</div>

              <div>{/* User details and images */}</div>

              <div className="md:col-span-2">
                {/* Additional bill images */}
              </div>
            </div>

            {/* Edit Bill Details Button */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEditBill(selectedBill.billId)}
                className="bg-green-500 text-white rounded px-4 py-2"
              >
                Edit Bill Details
              </button>

              <button
                onClick={closePopup}
                className="bg-blue-500 text-white rounded px-4 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateBillList;
