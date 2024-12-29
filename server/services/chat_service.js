import prisma from "../database/prisma.js";

// create method for save given chat data to database
export const saveChat = async (chatRoomData) => {
  console.log(chatRoomData, "------------------");
  try {
    const chatRoom = await prisma.room.create({
      data: chatRoomData,
    });
    return chatRoom;
  } catch (error) {
    console.log("Error in saving chat room  data to database: ", error);
    throw error;
  }
};

// create method for get all chatsRooms
export const getAllChatRooms = async () => {
  try {
    const chatRooms = await prisma.room.findMany();
    return chatRooms;
  } catch (error) {
    console.log("Error in fetching chat rooms from database: ", error);
    return null;
  }
};
