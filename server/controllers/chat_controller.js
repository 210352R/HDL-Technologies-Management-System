import express from "express";
import { getAllChatRooms, saveChat } from "../services/chat_service.js";

export const chat_router = express.Router();

//create post method for add chatRoomData
chat_router.post("/add-chatroom", async (req, res) => {
  const chatRoomData = req.body;
  try {
    const chatRoom = await saveChat(chatRoomData);
    res
      .status(200)
      .json({ message: "Chat saved successfully", data: chatRoom });
  } catch (error) {
    console.log("Error in saving chat data to database: ", error);
    res.status(500).json({ message: "Failed to save chat data" });
  }
});

// create get method for get all chatRooms
chat_router.get("/get-all-chat-rooms", async (req, res) => {
  try {
    const chatRooms = await getAllChatRooms();
    res.status(200).json({ chatRooms: chatRooms });
  } catch (error) {
    console.log("Error in fetching chats from database: ", error);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
});
