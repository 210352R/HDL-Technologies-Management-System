import { io } from "socket.io-client";

let socket;

export const connectSocket = (url) => {
  if (!socket) {
    socket = io(url, {
      autoConnect: false,
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket is not initialized. Call connectSocket first.");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
