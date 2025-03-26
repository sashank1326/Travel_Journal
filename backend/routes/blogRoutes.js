// import express from "express";
// import { createBlog } from "../controllers/blogController.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import upload from "../middleware/uploadMiddleware.js";

// const router = express.Router();

// // 📌 Route to create a new blog (with image upload)
// router.post("/create", authMiddleware, upload.array("images", 5), createBlog);

// export default router;

import express from "express";
import { createBlog, getUserBlogs, getBlogById } from "../controllers/blogController.js"; // ✅ Import getBlogById
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 📌 Route to create a new blog (with image upload)
router.post("/create", authMiddleware, upload.array("images", 5), createBlog);

// 📌 Route to get all blogs created by the authenticated user
router.get("/my-blogs", authMiddleware, getUserBlogs);

// 📌 Route to get a single blog by ID
router.get("/:id", getBlogById); 

export default router;

