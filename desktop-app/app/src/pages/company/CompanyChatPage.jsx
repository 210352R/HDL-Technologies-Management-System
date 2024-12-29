// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { url } from "../../url";

// Initialize the Socket.IO client
const socket = io(url);

const ChatPage = () => {
  const { companyId } = useParams(); // Get the companyId from the URL
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("Guest");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  // Fetch chat room name based on companyId
  useEffect(() => {
    const fetchRoomName = async () => {
      try {
        const response = await axios.get(
          `${url}/chat/get-chat-room-by-company-id/${companyId}`
        );
        console.log(response.data);
        setRoomName(response.data.name);
        socket.emit("joinRoom", { roomName: response.data.name, userName });
      } catch (err) {
        setError("Failed to fetch chat room.");
      }
    };

    fetchRoomName();

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, [companyId, userName]);

  // Listen for messages from the server
  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", { roomName, message, userName });
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Chat Room</h1>
        <p className="text-gray-400">
          {roomName ? `Room: ${roomName}` : "Loading room..."}
        </p>
      </header>

      {error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col flex-grow">
          <div className="flex-grow bg-gray-800 rounded-lg p-4 overflow-y-auto mb-4">
            {messages.length === 0 ? (
              <p className="text-gray-400">No messages yet.</p>
            ) : (
              messages.map((msg, index) => (
                <p key={index} className="text-gray-300 mb-2">
                  {msg}
                </p>
              ))
            )}
          </div>

          <div className="flex">
            <input
              type="text"
              className="flex-grow bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
