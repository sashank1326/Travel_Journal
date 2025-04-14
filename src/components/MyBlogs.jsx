// // import React from "react";

// // const MyBlogs = () => {
// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
// //       <h1 className="text-3xl font-bold">My Blogs</h1>
// //     </div>
// //   );
// // };

// // export default MyBlogs;



// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserDetails } from "../api/authService";
// import { getUserBlogs } from "../api/userBlogsService";
// import { Menu, Sun, Moon } from "lucide-react";
// import image from "../../public/images/logo.jpg";
// import { motion, AnimatePresence } from "framer-motion";

// const MyBlogs = () => {
//   const [userName, setUserName] = useState("User");
//   const [bio, setBio] = useState("Traveler & Explorer");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
//   const [showProfile, setShowProfile] = useState(false);
//   const [blogs, setBlogs] = useState([]); // Store user blogs
//   const [loading, setLoading] = useState(true); // Loading state

//   const menuRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/signin");
//         return;
//       }

//       try {
//         const userData = await getUserDetails();
//         setUserName(userData.name);
//         setBio(userData.bio || "Traveler & Explorer");
//         setPhoneNumber(userData.phone || "Not Provided");
//         setEmail(userData.email || "Not Provided");

//         // Fetch user blogs
//         const userBlogs = await getUserBlogs();
//         setBlogs(Array.isArray(userBlogs) ? userBlogs : []); // Ensure it's an array
//       } catch (error) {
//         console.error("Error fetching user details or blogs:", error.message);
//         navigate("/signin");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("darkMode", newMode);
//     document.documentElement.classList.toggle("dark", newMode);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     setMenuOpen(false);
//     navigate("/");
//   };

//   const toggleProfile = () => {
//     setShowProfile(!showProfile);
//   };

//   return (
//     <div
//         className={`min-h-screen w-full flex flex-col p-6 relative transition-colors duration-300 ${
//             darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-100 to-green-300 text-gray-900"
//         }`}
//         >

//       {/* Top Left: Travel Journal (Logout on Click) */}
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="absolute top-4 left-4"
//       >
//         <button onClick={handleLogout} className="text-3xl font-extrabold flex gap-4 items-center cursor-pointer">
//           <img src={image} alt="Logo" className="w-16 h-16 object-contain rounded-md" />
//           Travel Journal
//         </button>
//       </motion.div>

//       {/* Top Right: Dark Mode & Menu */}
//       <div className="absolute top-4 right-4 flex items-center gap-4">
//         <motion.button
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           onClick={toggleDarkMode}
//           className="p-2 rounded-full transition"
//         >
//           {darkMode ? (
//             <Sun size={24} className="text-white-400" />
//           ) : (
//             <Moon size={24} className="text-gray-900" />
//           )}
//         </motion.button>

//         <motion.button
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="p-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition relative"
//         >
//           <Menu size={24} />
//         </motion.button>

//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               ref={menuRef}
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="absolute right-0 top-12 mt-2 w-52 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80"
//             >
//               <button onClick={toggleProfile} className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600">
//                 Profile
//               </button>

//               {showProfile && (
//                 <div className="mt-4">
//                   <p className="font-semibold text-gray-900 dark:text-white">{userName}</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">{bio}</p> 
//                   <p className="text-sm text-gray-600 dark:text-gray-300 truncate w-44 overflow-hidden whitespace-nowrap"
//                         title={email} >
//                             {email} </p>  {/*Show full email on hover*/}
//                   <p className="text-sm text-gray-600 dark:text-gray-300">{phoneNumber}</p>
//                 </div>
//               )}

//               <button onClick={toggleDarkMode} className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600">
//                 {darkMode ? <Sun size={18} className="text-white-400" /> : <Moon size={18} className="text-gray-900" />}
//                 <span className="ml-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
//               </button>

//               <button onClick={() => navigate("/my-blogs")} 
//                 className="mt-4 w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
//               >
//                 My Blogs
//               </button>

//               <button onClick={handleLogout} className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600 transition">
//                 Logout
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Content Section */}
//       <div className="flex flex-col items-center justify-center mt-10">
//         <h1 className="text-4xl font-bold">My Blogs</h1>

//         {/* Loading State */}
//         {loading && <p className="mt-4 text-lg">Loading your blogs...</p>}

//         {/* No Blogs Message */}
//         {!loading && blogs.length === 0 && <p className=" mt-4 text-lg">No Blogs Created</p>}

//         {/* Blog List */}
//         <div className="mt-6 w-full px-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {blogs.map((blog) => (
//               <motion.div
//                 key={blog._id}
//                 whileHover={{ scale: 1.03 }}
//                 className=" bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
//                 onClick={() => navigate(`/blog/${blog._id}`)}
//               >
//                 <h2 className="text-xl font-bold">{blog.title}</h2>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">{blog.location || "No Location Provided"}</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(blog.dateOfTravel).toDateString()}</p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">By {userName}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyBlogs;




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../api/authService";
import { getUserBlogs } from "../api/userBlogsService";
import { PenSquare, Calendar, MapPin, PlusCircle } from "lucide-react";
import Navbar from "./Navbar";

export default function MyBlogs() {
  const [userName, setUserName] = useState("User");
  const [bio, setBio] = useState("Traveler & Explorer");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const userData = await getUserDetails();
        if (!userData) {
          throw new Error("User data not available");
        }

        setUserName(userData.name);
        setBio(userData.bio || "Traveler & Explorer");
        setPhoneNumber(userData.phone || "Not Provided");
        setEmail(userData.email || "Not Provided");
        const userId = userData._id;
        if (!userId) {
          throw new Error("User ID not available");
        }
        const userBlogs = await getUserBlogs(userId);
        setBlogs(Array.isArray(userBlogs) ? userBlogs : []);
      } catch (error) {
        console.error("Error fetching user details or blogs:", error.message);

        if (error.message.includes("authentication") || error.message.includes("token")) {
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);


  const filteredBlogs = blogs
    .filter(blog =>
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.location?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "recent") {
        return new Date(b.dateOfTravel) - new Date(a.dateOfTravel);
      } else if (filter === "oldest") {
        return new Date(a.dateOfTravel) - new Date(b.dateOfTravel);
      }
      return 0;
    });

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className={`min-h-screen pt-3 w-full flex flex-col transition-colors duration-300 ${darkMode
      ? "bg-gray-900 text-gray-100"
      : "bg-gradient-to-t from-emerald-700 to-emerald-50 text-gray-800"
      }`}>


      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        userName={userName}
        bio={bio}
        phoneNumber={phoneNumber}
        email={email}
        pages={"My Blogs"}
      />


      <div className={`w-full mt-4 px-6 pt-10 pb-6 ${darkMode
          ? "bg-gradient-to-r from-gray-800 to-gray-900"
          : "bg-gradient-to-r from-emerald-600 to-teal-700"
        }`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">My Travel Journal</h1>
          <p className="text-lg text-gray-200 mb-6">Relive your adventures and plan new journeys</p>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full p-3 pl-4 rounded-lg focus:outline-none focus:ring-2 ${darkMode
                    ? "bg-gray-700 text-white focus:ring-teal-400 placeholder-gray-400"
                    : "bg-white text-gray-800 focus:ring-emerald-500"
                  }`}
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`px-2 rounded-xl  focus:ring-2 ${darkMode
                  ? "bg-gray-700 text-white focus:ring-teal-400"
                  : "bg-white text-gray-800 focus:ring-emerald-500"
                }`}
            >
              <option value="all">All Entries</option>
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
            </select>

            <button
              onClick={() => navigate("/create-blog")}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg text-white font-medium transition-all ${darkMode
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
                }`}
            >
              <PlusCircle size={20} />
              <span>New Entry</span>
            </button>
          </div>
        </div>
      </div>


      <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className={`w-16 h-16 border-4 rounded-full animate-spin ${darkMode ? "border-teal-400 border-t-transparent" : "border-emerald-600 border-t-transparent"
              }`}></div>
            <p className="mt-4 text-lg">Loading your travel memories...</p>
          </div>
        )}

        {!loading && filteredBlogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className={`p-6 rounded-full mb-4 ${darkMode ? "bg-gray-800" : "bg-emerald-200"
              }`}>
              <PenSquare size={48} className={darkMode ? "text-teal-400" : "text-emerald-700"} />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Travel Memories Yet</h2>
            <p className="text-lg mb-6 max-w-md">
              {searchQuery
                ? "No entries match your search. Try different keywords."
                : "Start documenting your adventures by creating your first travel entry."}
            </p>
            <button
              onClick={() => navigate("/create-blog")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all ${darkMode ? "bg-teal-600 hover:bg-teal-700" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
            >
              <PlusCircle size={20} />
              <span>Create First Entry</span>
            </button>
          </div>
        )}

        {!loading && filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => (
              <div
                key={blog._id}
                onClick={() => navigate(`/blog/${blog._id}`)}
                className={`group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 ${darkMode ? "bg-gray-800 hover:shadow-teal-900/30" : "bg-white hover:shadow-emerald-900/20"
                  }`}
              >
                <div className="h-14 bg-gradient-to-r bg-gray-500"></div>
                <div className="p-6 pt-8 relative">
                  <div className={`absolute -top-6 left-6 px-4 py-2 rounded-lg shadow ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
                    }`}>
                    <time className="text-md font-medium">
                      {new Date(blog.dateOfTravel).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>

                  <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {truncateText(blog.title, 60)}
                  </h2>

                  {blog.location && (
                    <div className="flex items-center mb-3 text-sm">
                      <MapPin size={16} className={darkMode ? "text-teal-400" : "text-emerald-600"} />
                      <span className="ml-1 text-gray-400">{blog.location}</span>
                    </div>
                  )}

                  {blog.description && (
                    <p className={`mb-4 line-clamp-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
                      {truncateText(blog.description, 150)}
                    </p>
                  )}

                  <div className="flex justify-end">
                    <span className={`inline-flex items-center text-sm font-medium ${darkMode ? "text-teal-400" : "text-emerald-600"
                      } group-hover:underline`}>
                      Read more
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBlogs.length > 0 && (
          <div className="mt-8 text-center">
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? "entry" : "entries"}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};