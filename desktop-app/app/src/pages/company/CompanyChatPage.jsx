// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { ngrok_url, url } from "../../url";
import { useAuth } from "../../context/auth/index";

// Initialize the Socket.IO client
const socket = io(ngrok_url);

const ChatPage = () => {
  const { companyId } = useParams(); // Get the companyId from the URL
  const [roomName, setRoomName] = useState("");
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState("Guest");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  // Fetch chat room name based on companyId
  useEffect(() => {
    const fetchRoomName = async () => {
      console.log(currentUser);
      try {
        const response = await axios.get(
          `${url}/chat/get-chat-room-by-company-id/${companyId}`
        );
        console.log(response.data.chatRoom);
        setRoomName(response.data.chatRoom.name);
        const email = currentUser.email;
        const roomName = response.data.chatRoom.name;

        socket.emit("joinRoom", {
          roomName: roomName,
          userName: email,
        });

        // Set loading to false when all data is fetched and socket is connected
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch chat room.");
        setLoading(false); // Ensure loading state is false even on error
      }
    };

    fetchRoomName();
  }, [companyId, currentUser]);

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

  // Beautiful loading animation component
  const ProgressIndicator = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute w-24 h-24 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-24 h-24 bg-blue-600 rounded-full opacity-30 animate-pulse"></div>
      </div>
      <h2 className="text-2xl font-bold text-gray-100 animate-fadeIn">
        Chat is Loading...
      </h2>
    </div>
  );

  // Render progress indicator if loading
  if (loading) {
    return <ProgressIndicator />;
  }

  // Main chat page content
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
