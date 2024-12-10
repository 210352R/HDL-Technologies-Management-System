import prisma from "../database/prisma.js";
import { v4 as uuidv4 } from "uuid";

// create a new lap with uniqe prefix

export const createNewCompany = async (company) => {
  const { name, address, phone, email, prefix } = company;
  console.log("Incoming company data:", company);

  try {
    const company_id = uuidv4(); // Generate a unique ID

    const newCompany = await prisma.company.create({
      data: {
        name,
        address,
        phone,
        email,
        prefix,
      },
    });

    console.log("Company created successfully:", newCompany);
    return newCompany;
  } catch (error) {
    console.error("Error creating company:", error);

    // Handle specific Prisma errors (e.g., unique constraint violations)
    if (error.code === "P2002") {
      throw new Error(
        `A company with the same unique field already exists: ${error.meta.target}`
      );
    }

    // Throw a generic error for other cases
    throw new Error("An error occurred while creating the company.");
  } finally {
    // Ensure proper resource cleanup
    await prisma.$disconnect();
  }
};

// create method for get all companies
export const getAllCompanies = async () => {
  try {
    const companies = await prisma.company.findMany();
    return companies;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw new Error("An error occurred while fetching companies.");
  } finally {
    await prisma.$disconnect();
  }
};

// Create method for get all companies prefixes
export const getAllCompaniesPrefixes = async () => {
  try {
    const companies = await prisma.company.findMany({
      select: {
        prefix: true,
      },
    });
    return companies;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw new Error("An error occurred while fetching companies.");
  } finally {
    await prisma.$disconnect();
  }
};

// Create method for get company by email
export const getCompanyByEmail = async (email) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        email,
      },
    });
    return company;
  } catch (error) {
    console.error("Error fetching company:", error);
    throw new Error("An error occurred while fetching company.");
  } finally {
    await prisma.$disconnect();
  }
};

//creare method that given email is in db return true else return false
export const isCompanyEmailExist = async (email) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        email,
      },
    });
    return company ? true : false;
  } catch (error) {
    console.error("Error fetching company:", error);
    throw new Error("An error occurred while fetching company.");
  } finally {
    await prisma.$disconnect();
  }
};

// Create method for get company by prefix
export const getCompanyByPrefix = async (prefix) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        prefix,
      },
    });
    return company;
  } catch (error) {
    console.error("Error fetching company:", error);
    throw new Error("An error occurred while fetching company.");
  } finally {
    await prisma.$disconnect();
  }
};

// Create method for get company by name
export const getCompanyByName = async (name) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        name,
      },
    });
    return company;
  } catch (error) {
    console.error("Error fetching company:", error);
    throw new Error("An error occurred while fetching company.");
  } finally {
    await prisma.$disconnect();
  }
};

// create method for update company by id
export const updateCompanyById = async (id, company) => {
  try {
    const updatedCompany = await prisma.company.update({
      where: {
        id,
      },
      data: {
        ...company,
      },
    });
    return updatedCompany;
  } catch (error) {
    console.error("Error updating company:", error);
    throw new Error("An error occurred while updating company.");
  } finally {
    await prisma.$disconnect();
  }
};

// create method for delete company by id
export const deleteCompanyById = async (id) => {
  try {
    const deletedCompany = await prisma.company.delete({
      where: {
        id,
      },
    });
    return deletedCompany;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw new Error("An error occurred while deleting company.");
  } finally {
    await prisma.$disconnect();
  }
};
