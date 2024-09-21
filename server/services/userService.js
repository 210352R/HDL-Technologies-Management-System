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
  console.log(newUser);
  return newUser.id;
};
