
// // routes/geoapifyRoutes.js
// import express from 'express';
// import { testGeoapify } from '../services/geoapifyService.js';  // Named import from the service

// const router = express.Router();

// // Geoapify Test Route
// router.get('/test', async (req, res) => {
//   try {
//     const lat = 40.730610; // Example latitude (New York City)
//     const lon = -73.935242; // Example longitude (New York City)
//     const data = await testGeoapify(lat, lon);
//     res.json({ message: 'Geoapify API test success', data });
//   } catch (error) {
//     res.status(500).json({ message: 'Error testing Geoapify API', error: error.message });
//   }
// });

// export default router;  // Default export


// routes/geoapifyRoutes.js
import express from 'express';
import { testGeoapify } from '../services/geoapifyService.js';  // Named import for Geoapify
import { analyzeBlogContent } from '../services/geminiService.js';  // Import Gemini service using ES module syntax

const router = express.Router();

// Geoapify Test Route
router.get('/test', async (req, res) => {
  try {
    const lat = 40.730610; // Example latitude (New York City)
    const lon = -73.935242; // Example longitude (New York City)
    const data = await testGeoapify(lat, lon);
    res.json({ message: 'Geoapify API test success', data });
  } catch (error) {
    res.status(500).json({ message: 'Error testing Geoapify API', error: error.message });
  }
});

// Route for combining Geoapify location and Gemini travel details
router.post('/analyze', async (req, res) => {
  try {
    const { lat, lon, blogContent } = req.body;  // Assuming you send lat, lon, and blog content

    // Step 1: Get location details from Geoapify
    const geoapifyData = await testGeoapify(lat, lon);

    // Step 2: Analyze travel details from blog content using Gemini
    const geminiData = await analyzeBlogContent(blogContent);

    // Combine the results from Geoapify and Gemini
    const combinedData = {
      location: geoapifyData,
      travelDetails: geminiData,
    };

    res.json({
      message: 'Geoapify and Gemini integration successful',
      data: combinedData,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error with Geoapify and Gemini integration', error: error.message });
  }
});

export default router;

