import prisma from "../database/prisma.js";

// create function to add new user
export const createUser = async (user) => {
  const { name, phone, address } = user;
  const newUser = await prisma.user.create({
    data: {
      name,
      phone,
      address,
    },
  });

  return newUser.id;
};

// create methos for get all users
export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

// get user by phone number
export const getUserByPhone = async (phone) => {
  const user = await prisma.user.findMany({
    where: {
      phone,
    },
  });
  if (user.length === 0) {
    throw new Error("User not found");
  }
  if (user.length > 1) {
    throw new Error("Multiple users found");
  }
  return user[0];
};

// get all bills from user id
export const getAllBillsByUserId = async (userId) => {
  const bills = await prisma.bill.findMany({
    where: {
      userId,
    },
  });
  return bills;
};
