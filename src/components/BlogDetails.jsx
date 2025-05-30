// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/blogs"; // Adjust if needed
// const WEATHER_API_KEY = "3acf46f3b2b85194cc6fe10182fe807a";
// const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// const BlogDetails = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [weather, setWeather] = useState(null);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

//   useEffect(() => {
//     const fetchBlogDetails = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/${id}`);

//         if (!response.data.blog) {
//           throw new Error("Blog not found!");
//         }

//         setBlog(response.data.blog);

//         if (response.data.blog.location) {
//           fetchWeather(response.data.blog.location);
//         }
//       } catch (error) {
//         setError("Failed to load blog details. Please try again.");
//       } finally {
//         setLoading(false);
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
//     <div
//       className={`min-h-screen h-full p-6 transition-colors duration-300 ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-100 to-green-300 text-gray-900"
//       }`}
//     >
//       {/* Weather Info */}
//       {weather && (
//         <div className="absolute top-6 mt-2 right-6 p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-blue-300 ">Weather in {blog.location}</h2>
//           <p className="text-lg">Temperature: {weather.main.temp}°C</p>
//           <p className="text-lg">Condition: {weather.weather[0].description}</p>
//           <p className="text-lg">Humidity: {weather.main.humidity}%</p>
//         </div>
//       )}

//       {/* Blog Content */}
//       <div className="max-w-3xl mx-auto mt-6 mb-20 bg-gray-800 shadow-md rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//         <p className="text-gray-600 dark:text-gray-300">{blog.location || "No Location Provided"}</p>
//         <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(blog.dateOfTravel).toDateString()}</p>
//         <p className="mt-4">{blog.content}</p>

//         {/* Images */}
//         {blog.images && blog.images.length > 0 && (
//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {blog.images.map((image, index) => (
//               <img key={index} src={`http://localhost:5000/${image}`} alt={`Blog Image ${index + 1}`} className="rounded-lg shadow-md" />
//             ))}
//           </div>
//         )}

//         {/* Ratings */}
//         {blog.rating && <p className="mt-4 text-lg font-semibold">⭐ {blog.rating} / 5</p>}
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;



import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:5000/api/blogs";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = "3acf46f3b2b85194cc6fe10182fe807a";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        if (!response.data.blog) throw new Error("Blog not found!");
        
        setBlog(response.data.blog);
        if (response.data.blog.location) {
          const weatherRes = await axios.get(WEATHER_API_URL, {
            params: { q: response.data.blog.location, appid: WEATHER_API_KEY, units: "metric" }
          });
          setWeather(weatherRes.data);
        }
      } catch (error) {
        setError("Failed to load blog details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="ml-3">Loading adventure...</p>
    </div>
  );
  
  if (error || !blog) return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">{!blog ? "Blog not found" : "Error"}</h2>
        <p className="text-gray-600">{error || "The blog you're looking for doesn't exist or has been removed."}</p>
      </div>
    </div>
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", darkMode);
  };

  return (
    <div className={`min-h-screen pt-4 ${
      darkMode 
        ? "bg-gray-900 text-gray-100" 
        : "bg-gradient-to-b from-emerald-50 to-emerald-100 text-gray-800"
    }`}>
      
      <div className="flex justify-between mb-4">
        <button onClick={() =>window.location.href="/my-blogs"} className="px-4 mx-2 py-2 bg-emerald-600 text-white rounded-md">⬅ Back</button>
       
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg">
          <div className="w-full h-30 bg-gradient-to-r from-blue-400 to-purple-500"></div>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-5 w-full">
              <h1 className="text-3xl font-bold text-white mb-1">{blog.title}</h1>
              <div className="flex items-center text-white">
                <span className="mr-3">{new Date(blog.dateOfTravel).toDateString()}</span>
                {blog.location && <span>📍 {blog.location}</span>}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className={`p-5 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <p className="whitespace-pre-line">{blog.content}</p>
              
              {blog.images && blog.images.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {blog.images.slice(0,blog.images.length).map((image, index) => (
              
              <img key={index} src={`http://localhost:5000/${image}`} alt={`Blog Image ${index + 1}`} className="rounded-lg shadow-sm shadow-black" />
            ))}
          </div>
        )}
            </div>
          </div>
          
          <div className="md:w-1/3 space-y-4">
            {weather && (
              <div className={`p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h3 className="text-lg font-semibold mb-2">Weather in {blog.location}</h3>
                <div className="flex items-center">
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                       alt={weather.weather[0].description} className="w-14 h-14 mr-2" />
                  <div>
                    <p className="text-xl font-bold">{Math.round(weather.main.temp)}°C</p>
                    <p className="capitalize">{weather.weather[0].description}</p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1 text-sm">
                  <div>Humidity: {weather.main.humidity}%</div>
                  <div>Wind: {weather.wind.speed} m/s</div>
                </div>
              </div>
            )}
            
            {blog.rating && (
              <div className={`p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h3 className="text-lg font-semibold mb-2">Rating</h3>
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-2">{blog.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xl ${i < blog.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};