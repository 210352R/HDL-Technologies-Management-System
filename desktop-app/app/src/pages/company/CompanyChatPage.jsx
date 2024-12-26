import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

function CompanyChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up on component unmount
    return () => socket.off("receive_message");
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const messageData = {
        id: Date.now(),
        text: input,
        // Optionally, add a username or avatar here
        // username: "User",
        // avatar: "https://example.com/avatar.png",
      };

      // Send message to server
      socket.emit("send_message", messageData);

      // Optionally, add the message to local state immediately
      setMessages((prevMessages) => [...prevMessages, messageData]);

      // Clear input
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-900 text-white">
      <header className="flex items-center justify-center bg-gray-800 p-4 shadow-md">
        <h1 className="text-3xl font-bold">Company Chat</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 bg-gray-700">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3">
              {/* Optional: User Avatar */}
              {/* <img
                src={message.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              /> */}
              <div>
                {/* Optional: Username */}
                {/* <div className="text-sm font-semibold">{message.username}</div> */}
                <div className="max-w-xs md:max-w-md lg:max-w-lg p-3 bg-blue-600 rounded-lg shadow">
                  <p className="text-white">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="p-4 bg-gray-800">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-3 px-5 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 shadow-md"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}

export default CompanyChatPage;
