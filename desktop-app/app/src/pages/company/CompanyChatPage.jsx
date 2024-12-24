import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up on component unmount
    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const messageData = {
        id: Date.now(),
        text: input,
      };

      // Send message to server
      socket.emit("send_message", messageData);

      // Clear input
      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Chat Application
        </h1>
        <div className="border border-gray-300 rounded-lg h-64 overflow-y-scroll p-2 mb-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className="p-2 mb-2 rounded-lg bg-blue-100 text-gray-800"
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
