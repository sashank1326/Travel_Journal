import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/user.js";

const router = express.Router();

// Get user details for the dashboard
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password field
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
