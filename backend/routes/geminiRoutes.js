// const express = require("express");
// const { analyzeBlogContent } = require("../services/geminiService");
// const router = express.Router();

// router.post("/analyze-blog", async (req, res) => {
//     try {
//         const { blogContent } = req.body;

//         if (!blogContent) {
//             return res.status(400).json({ error: "Blog content is required" });
//         }

//         const extractedData = await analyzeBlogContent(blogContent);

//         if (!extractedData) {
//             return res.status(500).json({ error: "Failed to analyze blog content" });
//         }

//         res.json({ extractedData });
//     } catch (error) {
//         console.error("Error in /analyze-blog:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;



import express from "express";
import { analyzeBlogContent } from "../controllers/geminiController.js";

const router = express.Router();

// ✅ Test Route
router.get("/test", (req, res) => {
  res.json({ message: "Gemini API route working!" });
});

// ✅ AI Analysis Route
router.post("/analyze", analyzeBlogContent);

export default router;

