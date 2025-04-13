
// import axios from 'axios';

// // Analyze blog content and extract details using Gemini API
// export const analyzeBlogContent = async (req, res) => {
//   try {
//     const { blogContent } = req.body;
//     if (!blogContent) {
//       return res.status(400).json({ error: "Blog content is required" });
//     }

//     // Updated prompt to guide the AI better
//     const prompt = `
//       I will provide a travel blog. Analyze it and extract the following key details:
//       1. **Destination** (City, Country) – If the destination is mentioned, extract it. If not, infer based on the context.
//       2. **Travel Mode** (Flight, Train, Road, or other types of transportation) – Extract this from the blog content, or infer from the context if not explicitly mentioned.
//       3. **Season** (Winter, Summer, etc.) – Extract this from the blog content, or infer from typical seasonal travel patterns for the destination.
//       4. **Travel Style** (Budget, Luxury, Backpacking, Mid-range) – Extract this from the blog content, or infer based on the tone or description of the trip.
//       5. **Nearby Attractions** (List 3-5 famous places to visit in the city) – Use your general knowledge to suggest popular attractions at the destination.
//       6. **Hotel Suggestions** (Provide at least 3 hotel options categorized by Budget, Mid-Range, and Luxury, along with their price ranges) – Suggest hotel options based on the destination’s general characteristics.
//       7. **Estimated Cost** (Estimate the total cost for a one-week trip, split by Budget, Mid-range, and Luxury categories, including transportation, accommodation, food, etc.) – Estimate costs based on common travel patterns for this destination.
//       Make sure to provide the cost values in **Indian Rupees (INR) if it is an Indian place**.

//       The response should return **only in JSON format**, without any extra text or markdown.

//       Blog Content:
//       """${blogContent}"""
//     `;

//     const response = await axios.post(
//       "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent",
//       {
//         contents: [{ parts: [{ text: prompt }] }],
//       },
//       {
//         headers: { "Content-Type": "application/json" },
//         params: { key: process.env.GEMINI_API_KEY },
//       }
//     );

//     // Extract the AI-generated response text
//     let aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

//     // Clean up response (remove any unwanted Markdown)
//     aiResponse = aiResponse.replace(/```json|```/g, "").trim();

//     // Convert the cleaned response to JSON format
//     const extractedData = JSON.parse(aiResponse);

//     // Send the extracted data back to the client
//     res.json(extractedData);
//   } catch (error) {
//     // Handle error in the process
//     res.status(500).json({ error: error.message });
//   }
// };





import axios from 'axios';

// Analyze blog content and extract details using Gemini API
export const analyzeBlogContent = async (req, res) => {
  try {
    const { blogContent } = req.body;
    if (!blogContent) {
      return res.status(400).json({ error: "Blog content is required" });
    }

    // Updated prompt to guide the AI better
    const prompt = `
  I will provide a travel blog. Analyze it and extract the following key details:
  1. **Destination** (City, State, Country) – If the destination is mentioned, extract it. If not, infer based on the context.
  2. **Travel Mode** (Flight, Train, Road, or other types of transportation) – Extract this from the blog content, or infer from the context if not explicitly mentioned.
  3. **Season** (Winter, Summer, etc.) – Extract this from the blog content, or infer from typical seasonal travel patterns for the destination.
  4. **Travel Style** (Budget, Luxury, Backpacking, Mid-range) – Extract this from the blog content, or infer based on the tone or description of the trip.
  5. **Nearby Attractions** (List 3-5 famous places to visit in the city with a one-line description about each place) – Use your general knowledge to suggest popular attractions at the destination and add a brief description for each.
  6. **Hotel Suggestions** (Provide at least 2 hotel options in **Budget**, **Mid-Range**, and **Luxury** categories, along with their price ranges) – Suggest hotel options based on the destination’s general characteristics.
  7. **Estimated Cost** (Estimate the total cost for a one-week trip, split by Budget, Mid-range, and Luxury categories, including transportation, accommodation, food, etc.) – Provide detailed breakdowns for each category (Transportation, Accommodation, Food, Activities), along with the total estimated cost for Budget, Mid-range, and Luxury categories. Make sure to provide the cost values in **Indian Rupees (₹) if it is an Indian place**.
  
  Ensure the **Estimated Cost** section provides **ranges** (low to high) for each cost category (e.g., ₹4000 - ₹6000 for transportation, ₹3000 - ₹5000 for accommodation) and a total cost range for each travel style.

  The response should return **only in JSON format**, without any extra text or markdown.

  Blog Content:
  """${blogContent}"""
`;



//     const prompt = `
//   I will provide a travel blog. Analyze it and extract the following key details:
//   1. **Destination** (City, State, Country) – If the destination is mentioned, extract it. If not, infer based on the context.
//   2. **Travel Mode** (Flight, Train, Road, or other types of transportation) – Extract this from the blog content, or infer from the context if not explicitly mentioned.
//   3. **Season** (Winter, Summer, etc.) – Extract this from the blog content, or infer from typical seasonal travel patterns for the destination.
//   4. **Travel Style** (Budget, Luxury, Backpacking, Mid-range) – Extract this from the blog content, or infer based on the tone or description of the trip.
//   5. **Nearby Attractions** (List 3-5 famous places to visit in the city with a one-line description about each place) – Use your general knowledge to suggest popular attractions at the destination and add a brief description for each.
//   6. **Hotel Suggestions** (Provide at least 3 hotel options categorized by Budget, Mid-Range, and Luxury, along with their price ranges) – Suggest hotel options based on the destination’s general characteristics.
//   7. **Estimated Cost** (Estimate the total cost for a one-week trip, split by Budget, Mid-range, and Luxury categories, including transportation, accommodation, food, etc.) – Provide detailed breakdowns for each category (Transportation, Accommodation, Food, Activities), along with the total estimated cost for Budget, Mid-range, and Luxury categories. Make sure to provide the cost values in **Indian Rupees (₹) if it is an Indian place**.
  
//   Ensure the **Estimated Cost** section provides **ranges** (low to high) for each cost category (e.g., ₹4000 - ₹6000 for transportation, ₹3000 - ₹5000 for accommodation) and a total cost range for each travel style.

//   The response should return **only in JSON format**, without any extra text or markdown.

//   Blog Content:
//   """${blogContent}"""
// `;



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

    // Extract the AI-generated response text
    let aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Clean up response (remove any unwanted Markdown)
    aiResponse = aiResponse.replace(/```json|```/g, "").trim();

    // Convert the cleaned response to JSON format
    const extractedData = JSON.parse(aiResponse);

    // Send the extracted data back to the client
    res.json(extractedData);
  } catch (error) {
    // Handle error in the process
    res.status(500).json({ error: error.message });
  }
};
