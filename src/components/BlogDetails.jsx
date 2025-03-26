// // import { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";

// // const API_URL = "http://localhost:5000/api/blogs"; // Adjust if needed

// // const BlogDetails = () => {
// //   const { id } = useParams(); // Get the blog ID from URL
// //   const [blog, setBlog] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchBlogDetails = async () => {
// //       try {
// //         const response = await axios.get(`${API_URL}/${id}`);
// //         console.log("📩 Full API Response:", response.data);
// //         console.log("📜 Blog Details:", response.data.blog);
// //         console.log("🖼️ Image Paths:", response.data.blog.images);


// //         if (!response.data.blog) {
// //           throw new Error("Blog not found!");
// //         }

// //         setBlog(response.data.blog);
// //       } catch (error) {
// //         console.error("❌ Error fetching blog details:", error);
// //         setError("Failed to load blog details. Please try again.");
// //       } finally {
// //         setLoading(false); // ✅ Ensure loading stops
// //       }
// //     };

// //     fetchBlogDetails();
// //   }, [id]);

// //   if (loading) return <p className="text-center mt-10 text-xl">⏳ Loading...</p>;
// //   if (error) return <p className="text-center text-red-500 mt-10 text-xl">{error}</p>;
// //   if (!blog) return <p className="text-center mt-10 text-xl">🚫 Blog not found.</p>;

// //   return (
// //     <div className="min-h-screen h-full  p-6  bg-gray-900 text-gray-900 ">
// //       <div className="max-w-3xl mx-auto mt-6 mb-20 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
// //         <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
// //         <p className="text-gray-600 dark:text-gray-300">{blog.location || "No Location Provided"}</p>
// //         <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(blog.dateOfTravel).toDateString()}</p>
// //         <p className="mt-4">{blog.content}</p>
        
// //         {/* Display Images */}
// //         {blog.images && blog.images.length > 0 && (
// //           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
// //             {blog.images.map((image, index) => (
// //               <img key={index} src={`http://localhost:5000/${image}`} alt={`Blog Image ${index + 1}`} className="rounded-lg shadow-md" />
// //             ))}
// //           </div>
// //         )}

// //         {/* Ratings */}
// //         {blog.rating && (
// //           <p className="mt-4 text-lg font-semibold">⭐ {blog.rating} / 5</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default BlogDetails;



 
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/blogs"; // Adjust if needed
// const WEATHER_API_KEY = "3acf46f3b2b85194cc6fe10182fe807a";
// const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// const BlogDetails = () => {
//   const { id } = useParams(); // Get the blog ID from URL
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [weather, setWeather] = useState(null);

//   useEffect(() => {
//     const fetchBlogDetails = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/${id}`);
//         console.log("📩 Full API Response:", response.data);
//         console.log("📜 Blog Details:", response.data.blog);
//         console.log("🖼️ Image Paths:", response.data.blog.images);

//         if (!response.data.blog) {
//           throw new Error("Blog not found!");
//         }

//         setBlog(response.data.blog);

//         if (response.data.blog.location) {
//           fetchWeather(response.data.blog.location);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching blog details:", error);
//         setError("Failed to load blog details. Please try again.");
//       } finally {
//         setLoading(false); // ✅ Ensure loading stops
//       }
//     };

//     fetchBlogDetails();
//   }, [id]);

//   const fetchWeather = async (location) => {
//     try {
//       const response = await axios.get(WEATHER_API_URL, {
//         params: {
//           q: location,
//           appid: WEATHER_API_KEY,
//           units: "metric",
//         },
//       });
//       setWeather(response.data);
//     } catch (error) {
//       setWeather(null);
//     }
//   };

//   if (loading) return <p className="text-center mt-10 text-xl">⏳ Loading...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10 text-xl">{error}</p>;
//   if (!blog) return <p className="text-center mt-10 text-xl">🚫 Blog not found.</p>;

//   return (
//     <div className="min-h-screen h-full p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
//       {/* Weather Container Outside the Blog Box */}
//       {weather && (
//         <div className="absolute top-6 mt-2 right-6 p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200">Weather in {blog.location}</h2>
//           <p className="text-lg">Temperature: {weather.main.temp}°C</p>
//           <p className="text-lg">Condition: {weather.weather[0].description}</p>
//           <p className="text-lg">Humidity: {weather.main.humidity}%</p>
//         </div>
//       )}

//       {/* Main Blog Container */}
//       <div className="max-w-3xl mx-auto mt-6 mb-20 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//         <p className="text-gray-600 dark:text-gray-300">{blog.location || "No Location Provided"}</p>
//         <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(blog.dateOfTravel).toDateString()}</p>
//         <p className="mt-4">{blog.content}</p>

//         {/* Display Images */}
//         {blog.images && blog.images.length > 0 && (
//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {blog.images.map((image, index) => (
//               <img key={index} src={`http://localhost:5000/${image}`} alt={`Blog Image ${index + 1}`} className="rounded-lg shadow-md" />
//             ))}
//           </div>
//         )}

//         {/* Ratings */}
//         {blog.rating && (
//           <p className="mt-4 text-lg font-semibold">⭐ {blog.rating} / 5</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;



import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs"; // Adjust if needed
const WEATHER_API_KEY = "3acf46f3b2b85194cc6fe10182fe807a";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);

        if (!response.data.blog) {
          throw new Error("Blog not found!");
        }

        setBlog(response.data.blog);

        if (response.data.blog.location) {
          fetchWeather(response.data.blog.location);
        }
      } catch (error) {
        setError("Failed to load blog details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(WEATHER_API_URL, {
        params: {
          q: location,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      });
      setWeather(response.data);
    } catch (error) {
      setWeather(null);
    }
  };

  if (loading) return <p className="text-center mt-10 text-xl">⏳ Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10 text-xl">{error}</p>;
  if (!blog) return <p className="text-center mt-10 text-xl">🚫 Blog not found.</p>;

  return (
    <div
      className={`min-h-screen h-full p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-100 to-green-300 text-gray-900"
      }`}
    >
      {/* Weather Info */}
      {weather && (
        <div className="absolute top-6 mt-2 right-6 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-300 ">Weather in {blog.location}</h2>
          <p className="text-lg">Temperature: {weather.main.temp}°C</p>
          <p className="text-lg">Condition: {weather.weather[0].description}</p>
          <p className="text-lg">Humidity: {weather.main.humidity}%</p>
        </div>
      )}

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto mt-6 mb-20 bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{blog.location || "No Location Provided"}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(blog.dateOfTravel).toDateString()}</p>
        <p className="mt-4">{blog.content}</p>

        {/* Images */}
        {blog.images && blog.images.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blog.images.map((image, index) => (
              <img key={index} src={`http://localhost:5000/${image}`} alt={`Blog Image ${index + 1}`} className="rounded-lg shadow-md" />
            ))}
          </div>
        )}

        {/* Ratings */}
        {blog.rating && <p className="mt-4 text-lg font-semibold">⭐ {blog.rating} / 5</p>}
      </div>
    </div>
  );
};

export default BlogDetails;
