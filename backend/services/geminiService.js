// require("dotenv").config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function analyzeBlogContent(blogContent) {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//         const prompt = `
//         Extract travel details from the following blog content:
//         1. Destination(s) mentioned
//         2. Travel style (budget, mid-range, luxury)
//         3. Transportation details (flights, trains, etc.)
//         4. Season or time of year (if mentioned)

//         Blog Content: """${blogContent}"""
//         `;

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = response.text();

//         return text; // Extracted details
//     } catch (error) {
//         console.error("Error analyzing blog content:", error);
//         return null;
//     }
// }

// module.exports = { analyzeBlogContent };



// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function analyzeBlogContent(blogContent) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const prompt = `
//       Extract travel details from the following blog content:
//       1. Destination(s) mentioned
//       2. Travel style (budget, mid-range, luxury)
//       3. Transportation details (flights, trains, etc.)
//       4. Season or time of year (if mentioned)
//       5. Nearby attractions in the destination
//       6. Hotel recommendations in the destination
//       7. Estimated cost for low-budget, mid-range, and luxury travelers (travel, stay, food)

//       Blog Content: """${blogContent}"""
//     `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = await response.text();

//     console.log("Gemini response:", text);

//     // You can now parse the response to extract specific information, for example:
//     const destination = text.match(/Destination: (.*)/i);
//     const travelStyle = text.match(/Travel style: (.*)/i);
//     const transportation = text.match(/Transportation: (.*)/i);
//     const season = text.match(/Season: (.*)/i);
//     const nearbyAttractions = text.match(/Nearby attractions: (.*)/i);
//     const hotels = text.match(/Hotels: (.*)/i);
//     const costEstimate = text.match(/Cost estimate: (.*)/i);

//     return {
//       destination: destination ? destination[1] : null,
//       travelStyle: travelStyle ? travelStyle[1] : null,
//       transportation: transportation ? transportation[1] : null,
//       season: season ? season[1] : null,
//       nearbyAttractions: nearbyAttractions ? nearbyAttractions[1].split(",") : [],
//       hotels: hotels ? hotels[1].split(",") : [],
//       costEstimate: costEstimate ? JSON.parse(costEstimate[1]) : null,
//     };
//   } catch (error) {
//     console.error("Error analyzing blog content:", error);
//     return null;
//   }
// }

// export { analyzeBlogContent };


import axios from 'axios';

// Analyze blog content and extract details using Gemini API
export const analyzeBlogContent = async (req, res) => {
  try {
    const { blogContent } = req.body;
    if (!blogContent) {
      return res.status(400).json({ error: "Blog content is required" });
    }

    const prompt = `
      Analyze the following travel blog and extract key details:
      1. **Destination** (City, Country)
      2. **Travel Mode** (Flight, Train, Road)
      3. **Season** (Winter, Summer, etc.)
      4. **Travel Style** (Budget, Luxury, Backpacking)
      5. **Nearby Attractions** (List the top 3-5 must-see places in the destination)
      6. **Hotel Suggestions** (Provide a few hotel options in the destination, with their pricing categories)
      7. **Estimated Cost** (Provide an approximate cost breakdown for the destination based on a budget, mid-range, and luxury traveler, including transportation, accommodation, food, etc.)

      Ensure that the response provides detailed suggestions based on general knowledge of the destination. For example:
      - Nearby Attractions: A list of famous or popular spots in the city.
      - Hotel Suggestions: At least 3 options for hotels, categorized as Budget, Mid-Range, and Luxury, with estimated price ranges.
      - Estimated Cost: Approximate total travel cost for a one-week trip to the destination for a budget traveler, mid-range traveler, and luxury traveler.

      Return the result in **pure JSON format**, without any extra text or Markdown.
      
      Blog Content:
      """${blogContent}"""
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

    // ✅ Extract response text from AI
    let aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    // ✅ Remove unwanted Markdown (if any)
    aiResponse = aiResponse.replace(/```json|```/g, "").trim();

    // ✅ Convert the cleaned string to JSON
    const extractedData = JSON.parse(aiResponse);

    res.json(extractedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
