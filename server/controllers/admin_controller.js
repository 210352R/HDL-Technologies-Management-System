import express from "express";
import { createNewCompany } from "../services/adminService.js";

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
