import axios from "axios";

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

// Function to get Amadeus authentication token
const getAmadeusAuthToken = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Amadeus Auth Error:", error.response?.data || error.message);
    throw new Error("Failed to authenticate with Amadeus API");
  }
};

// Function to get flight prices
export const getFlightPrices = async (origin, destination, date) => {
  try {
    const token = await getAmadeusAuthToken();
    const response = await axios.get(
      `https://test.api.amadeus.com/v2/shopping/flight-offers`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: date,
          adults: 1,
          currencyCode: "USD",
          max: 5,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Amadeus Flights Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch flight prices");
  }
};

// Function to get hotel prices
export const getHotelPrices = async (cityCode) => {
  try {
    const token = await getAmadeusAuthToken();
    const response = await axios.get(
      `https://test.api.amadeus.com/v2/shopping/hotel-offers`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { cityCode, adults: 1, currency: "USD" },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Amadeus Hotels Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch hotel prices");
  }
};
