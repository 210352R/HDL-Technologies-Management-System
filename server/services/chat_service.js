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

// create method for get chatRoom by company id
export const getChatRoomByCompanyId = async (companyId) => {
  try {
    const chatRoom = await prisma.room.findFirst({
      where: {
        company_id: companyId,
      },
    });
    return chatRoom;
  } catch (error) {
    console.log("Error in fetching chat room from database: ", error);
    return null;
  }
};

// Get all company_ids list
export const getAllCompanyIds = async () => {
  try {
    const companyIds = await prisma.company.findMany({
      select: {
        id: true,
      },
    });
    return companyIds;
  } catch (error) {
    console.log("Error in fetching company ids from database: ", error);
    return null;
  }
};
