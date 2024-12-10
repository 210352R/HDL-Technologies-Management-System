import express from "express";
import {
  createNewCompany,
  deleteCompanyById,
  getAllCompanies,
  getAllCompaniesPrefixes,
  getCompanyByName,
  getCompanyByPrefix,
  updateCompanyById,
} from "../services/adminService.js";

export const admin_router = express.Router();

// Make end points for create new company user
admin_router.post("/register-company", async (req, res) => {
  const company_user = req.body;
  try {
    const new_company_user = await createNewCompany(company_user);

    res.status(200).json({
      message: "Register Company Successfully",
      prefix: new_company_user.prefix,
    }); // Send the QR code as a JSON response
  } catch (err) {
    res.status(500).json({ error: "Failed to Register New Company -- " });
  }
});

// Make endpoint for get all companies
admin_router.get("/get-all-companies", async (req, res) => {
  try {
    const companies = await getAllCompanies();
    res.status(200).json({ companies: companies });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Companies could not be fetched" });
  }
});

// Make api end point for get all companies prefixes
admin_router.get("/get-all-companies-prefixes", async (req, res) => {
  try {
    const prefixes = await getAllCompaniesPrefixes();
    res.status(200).json({ prefixes: prefixes });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Companies prefixes could not be fetched" });
  }
});

// Get company by prefix
admin_router.get("/companies/prefix/:prefix", async (req, res) => {
  try {
    const { prefix } = req.params;
    const company = await getCompanyByPrefix(prefix);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Get company by name
admin_router.get("/companies/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const company = await getCompanyByName(name);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Update company by ID
admin_router.put("/companies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await updateCompanyById(id, req.body);
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete company by ID
admin_router.delete("/companies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await deleteCompanyById(id);
    res.status(200).json(deletedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
