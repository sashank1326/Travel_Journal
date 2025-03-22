// // import axios from "axios";

// // const API_URL = "http://localhost:5000/api/auth"; // Backend URL
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth";

// export const signup = async (userData) => {
//   return await axios.post(`${API_URL}/signup`, userData);
// };

// // export const signin = async (userData) => {
// //   return await axios.post(`${API_URL}/signin`, userData);
// // };
// export const signin = async ({ name, password }) => {
//   return await axios.post(`${API_URL}/signin`, { name, password });
// };

// // ✅ Real API call for verifying user
// export const verifyUser = async (name, email) => {
//   try {
//     const response = await axios.post(`${API_URL}/verify-user`, { name, email });
//     return response.data; // Should return { success: true } if user is found
//   } catch (error) {
//     throw error.response?.data || { message: "Verification failed" };
//   }
// };

// // ✅ Real API call for resetting password
// export const resetPassword = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/reset-password`, { email, password });
//     return response.data; // Should return { success: true } if password reset works
//   } catch (error) {
//     throw error.response?.data || { message: "Password reset failed" };
//   }
// };







import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
const DASHBOARD_API_URL = "http://localhost:5000/api/dashboard"; // ✅ Add dashboard API URL

export const signup = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData);
};

export const signin = async ({ name, password }) => {
  return await axios.post(`${API_URL}/signin`, { name, password });
};

// ✅ Verify User API
export const verifyUser = async (name, email) => {
  try {
    const response = await axios.post(`${API_URL}/verify-user`, { name, email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Verification failed" };
  }
};

// ✅ Reset Password API
export const resetPassword = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Password reset failed" };
  }
};

// ✅ Fetch User Details API (For Dashboard)
export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${DASHBOARD_API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Expected response: { id, name }
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user details" };
  }
};
