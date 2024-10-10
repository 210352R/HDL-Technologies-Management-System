import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa"; // Import user icon from react-icons

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Fetch users using Axios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/users/all-users"
        ); // Replace with your API endpoint
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        User Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            No users found.
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-lg p-6 flex items-start space-x-4"
            >
              {/* Person Icon */}
              <div className="bg-blue-500 rounded-full p-3">
                <FaUser className="text-white text-xl" />
              </div>

              {/* User Details */}
              <div>
                <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Address:</strong>{" "}
                  {user.address || "No address provided"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
