import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export async function getAccessToken() {
  try {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET,
      }),
    });

    const data = await response.json();

    // Log the raw response from the API to check what is being returned
    console.log("Raw response from Amadeus API:", data);

    if (!data.access_token) {
      throw new Error('No access token received');
    }

    return data.access_token;
  } catch (error) {
    console.error("Error retrieving access token:", error);
    throw new Error("Unable to retrieve access token");
  }
}
