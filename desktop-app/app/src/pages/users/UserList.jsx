import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa"; // Import user icon from react-icons
import Navbar from "../../components/navbar/Navbar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users using Axios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/users/get-all-users"
        ); // Replace with your API endpoint
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
          User Management
        </h1>

        {/* Search Box */}
        <div className="mb-6 flex justify-left ml-32">
          {/* Updated for centering */}
          <input
            type="text"
            placeholder="Search users by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white w-11/12 max-w-sm" // Added max-width and full width
          />
        </div>

        {/* Table for User List */}
        <div className="max-w-full mx-auto flex-grow w-11/12">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-700 dark:text-gray-300">
              No users found.
            </p>
          ) : (
            <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">
                    User
                  </th>
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">
                    Phone
                  </th>
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b dark:border-gray-600">
                    <td className="py-4 px-4 flex items-center space-x-2">
                      <div className="bg-blue-500 rounded-full p-2">
                        <FaUser className="text-white text-lg" />
                      </div>
                      <span className="dark:text-white">{user.name}</span>
                    </td>
                    <td className="py-4 px-4 dark:text-white">{user.phone}</td>
                    <td className="py-4 px-4 dark:text-white">
                      {user.address || "No address provided"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
