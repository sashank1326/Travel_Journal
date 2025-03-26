
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/blogs"; // Make sure this matches your backend

// export const getUserBlogs = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("User not authenticated");

//     const response = await axios.get(`${API_URL}/my-blogs`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     console.log("📩 API Response:", response.data);
//     return response.data.blogs || []; // Ensure an array is returned
//   } catch (error) {
//     console.error("❌ Error fetching user blogs:", error);
//     return [];
//   }
// };

import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs"; // Make sure this matches your backend

export const getUserBlogs = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");

    const response = await axios.get(`${API_URL}/my-blogs`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("📩 API Response:", response.data);
    return response.data.blogs || []; // Ensure an array is returned
  } catch (error) {
    console.error("❌ Error fetching user blogs:", error);
    return [];
  }
};

// ✅ Function to fetch a specific blog's details by ID
export const getBlogDetails = async (blogId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");

    const response = await axios.get(`${API_URL}/${blogId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("📩 Blog Details API Response:", response.data);
    return response.data; // Return the blog details
  } catch (error) {
    console.error("❌ Error fetching blog details:", error);
    throw error;
  }
};
