
// import express from "express";
// import fetch from "node-fetch";
// import dotenv from "dotenv";
// import { getAccessToken } from "../tokenService.js"; // Import the token service

// dotenv.config();
// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const { origin, destination, date, adults } = req.query;

//     // Get access token
//     const accessToken = await getAccessToken();

//     const response = await fetch(
//       `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=${adults}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     const data = await response.json();
//     // console.log("API Response:", data);  // Log the raw response

//     if (!data.data) {
//       return res.status(400).json({ error: "No flights found" });
//     }

//     // ✅ Extract flights and sort by price
//     let flights = data.data
//       .map((flight) => ({
//         id: flight.id,
//         price: parseFloat(flight.price.total),
//         duration: flight.itineraries[0].duration,
//         departure: flight.itineraries[0].segments[0].departure,
//         arrival: flight.itineraries[0].segments.slice(-1)[0].arrival,
//         airline: flight.itineraries[0].segments[0].carrierCode,
//       }))
//       .sort((a, b) => a.price - b.price); // Sort by ascending price

//     // ✅ Limit each category to a maximum of 10 flights
//     const maxResults = 10;

//     // ✅ Categorize into luxury, mid-range, and economical
//     const luxury = flights.slice(-maxResults).reverse(); // 10 highest prices
//     const midRange = flights.slice(Math.floor(flights.length / 2) - 1, Math.floor(flights.length / 2) + 1); // 2 mid-range
//     const economical = flights.slice(0, maxResults); // 10 lowest prices

//     res.json({ luxury, midRange, economical });
//   } catch (error) {
//     console.error("Flight API Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;


import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { getAccessToken } from "../tokenService.js"; // Import the token service
import axios from "axios"; // Import axios for Gemini API request

dotenv.config();
const router = express.Router();

// Utility function to call Gemini API and analyze flight data
async function analyzeFlightDataWithGemini(flights) {
  try {
    const prompt = `
      Analyze the following flight offers and provide a detailed summary, including:
      1. **Flight Offers** - Include destination, airline, price, and duration.
      2. **Travel Style** - Classify the offers as budget, mid-range, or luxury based on price.
      3. **Recommendations** - Provide recommendations on the best options based on travel preferences.

      Flight Details:
      """${JSON.stringify(flights)}"""
    `;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    // Return Gemini's analysis text
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No AI response";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error while analyzing with Gemini API.";
  }
}

router.get("/", async (req, res) => {
  try {
    const { origin, destination, date, adults } = req.query;

    // Get access token
    const accessToken = await getAccessToken();

    const response = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=${adults}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    if (!data.data) {
      return res.status(400).json({ error: "No flights found" });
    }

    // ✅ Extract flight details and sort by price
    let flights = data.data
      .map((flight) => ({
        id: flight.id,
        price: parseFloat(flight.price.total),
        duration: flight.itineraries[0].duration,
        departure: flight.itineraries[0].segments[0].departure,
        arrival: flight.itineraries[0].segments.slice(-1)[0].arrival,
        airline: flight.itineraries[0].segments[0].carrierCode,
      }))
      .sort((a, b) => a.price - b.price); // Sort by ascending price

    // ✅ Limit to a maximum of 10 flights per category
    const maxResults = 10;

    // ✅ Categorize flights into luxury, mid-range, and economical
    const luxury = flights.slice(-maxResults).reverse(); // 10 highest prices
    const midRange = flights.slice(Math.floor(flights.length / 2) - 1, Math.floor(flights.length / 2) + 1); // 2 mid-range
    const economical = flights.slice(0, maxResults); // 10 lowest prices

    // Call Gemini API to analyze the flight data
    const aiAnalysis = await analyzeFlightDataWithGemini(flights);

    // Return the flight data along with Gemini analysis
    res.json({
      luxury,
      midRange,
      economical,
      aiAnalysis, // Include the analysis result from Gemini
    });
  } catch (error) {
    console.error("Flight API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

