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
