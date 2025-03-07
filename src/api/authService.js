// import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth"; // Backend URL
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const signup = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData);
};

// export const signin = async (userData) => {
//   return await axios.post(`${API_URL}/signin`, userData);
// };
export const signin = async ({ name, password }) => {
  return await axios.post(`${API_URL}/signin`, { name, password });
};

// ✅ Real API call for verifying user
export const verifyUser = async (name, email) => {
  try {
    const response = await axios.post(`${API_URL}/verify-user`, { name, email });
    return response.data; // Should return { success: true } if user is found
  } catch (error) {
    throw error.response?.data || { message: "Verification failed" };
  }
};

// ✅ Real API call for resetting password
export const resetPassword = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { email, password });
    return response.data; // Should return { success: true } if password reset works
  } catch (error) {
    throw error.response?.data || { message: "Password reset failed" };
  }
};


