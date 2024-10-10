import express from "express";
import { getAllUsers } from "../services/userService.js";
export const user_router = express.Router();

// api end point for get all users
user_router.get("/get-all-users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users: users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Users could not be fetched" });
  }
});
