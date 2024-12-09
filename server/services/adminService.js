import prisma from "../database/prisma.js";
import { v4 as uuidv4 } from "uuid";

// create a new lap with uniqe prefix
export const createNewCompany = async (company) => {
  const { name, address, phone, email, prefix } = laptop;
  const company_id = uuidv4(); // Generate a unique ID
  const newCompany = await prisma.company.create({
    data: {
      id: company_id,
      name,
      address,
      phone,
      email,
      prefix,
    },
  });
  return newCompany;
};
