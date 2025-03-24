// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api", // Make sure this is the correct URL for your backend
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default instance;
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ Make sure this is correct
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
