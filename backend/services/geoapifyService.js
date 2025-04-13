
// backend/services/geoapifyService.js

// services/geoapifyService.js
// services/geoapifyService.js
import axios from "axios";

export const testGeoapify = async (lat, lon) => {
  try {
    const apiKey = process.env.GEOAPIFY_API_KEY;
    // const url = `https://api.geoapify.com/v1/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`;
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`;


    const response = await axios.get(url);

    // Log the response status and data for debugging
    console.log("Geoapify response status:", response.status);
    console.log("Geoapify response data:", response.data);

    // You can return the response data if needed
    return response.data;
  } catch (error) {
    console.error("Error with Geoapify API:", error);
    throw error;  // Propagate error to be handled by the calling code
  }
};

//Changed
