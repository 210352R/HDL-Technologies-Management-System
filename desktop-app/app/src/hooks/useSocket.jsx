import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = (url, roomName, userName, onMessageReceived) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(url);

    // Join the room
    if (roomName && userName) {
      socketRef.current.emit("joinRoom", { roomName, userName });
    }

    // Listen for messages
    if (onMessageReceived) {
      socketRef.current.on("message", onMessageReceived);
    }

    // Cleanup on component unmount or room change
    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leaveRoom", roomName); // Notify server of room leave
        socketRef.current.disconnect();
      }
    };
  }, [url, roomName, userName, onMessageReceived]);

  // Function to send messages
  const sendMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", { roomName, message, userName });
    }
  };

  return { sendMessage };
};

export default useSocket;
