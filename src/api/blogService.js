// import axiosInstance from "./axios";

// export const createBlog = async (blogData, token) => {
//   try {
//     console.log("📤 Sending request:", blogData);
//     const response = await axiosInstance.post("/blogs/create", blogData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log("✅ Blog created:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error creating blog:", error);
//     console.error("👉 Response Data:", error.response?.data);
//     console.error("👉 Status Code:", error.response?.status);
//     console.error("👉 Full Error Object:", error);
//     throw error.response?.data || { message: "Something went wrong" };
//   }
// };


import axiosInstance from "./axios";

const createBlog = async (blogData, token) => {
  try {
    console.log("📤 Sending request:", blogData);
    const response = await axiosInstance.post("/blogs/create", blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("✅ Blog created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    console.error("👉 Response Data:", error.response?.data);
    console.error("👉 Status Code:", error.response?.status);
    console.error("👉 Full Error Object:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// 🆕 Public - fetch all blogs
const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get("/blogs");
    console.log("📥 All Blogs Fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching all blogs:", error);
    throw error.response?.data || { message: "Unable to fetch blogs" };
  }
};

const blogService = {
  createBlog,
  getAllBlogs,
};

export default blogService;
