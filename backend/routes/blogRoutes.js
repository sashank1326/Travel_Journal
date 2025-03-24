import express from "express";
import { createBlog } from "../controllers/blogController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 📌 Route to create a new blog (with image upload)
router.post("/create", authMiddleware, upload.array("images", 5), createBlog);

export default router;
