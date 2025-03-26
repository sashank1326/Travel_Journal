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
//       } catch (error) {
//         console.error("Error fetching user details:", error.message);
//         navigate("/signin");
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
//       className={`h-screen w-full flex flex-col p-6 relative transition-colors duration-300 ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-100 to-green-300 text-gray-900"
//       }`}
//     >
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
//         {/* Dark Mode Toggle */}
//         <button onClick={toggleDarkMode} className="p-2 rounded-full transition">
//           {darkMode ? <Sun size={24} className="text-white-400" /> : <Moon size={24} className="text-gray-900" />}
//         </button>

//         {/* Hamburger Menu */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="p-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition relative"
//         >
//           <Menu size={24} />
//         </button>

//         {/* Animated Dropdown Menu */}
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
//               {/* Profile Button */}
//               <button onClick={toggleProfile} className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600">
//                 Profile
//               </button>

//               {/* Profile Details */}
//               {showProfile && (
//                 <div className="mt-4">
//                   <p className="font-semibold text-gray-900 dark:text-white">{userName}</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">{bio}</p>
//                   <p
//                     className="text-sm text-gray-600 dark:text-gray-300 truncate w-44 overflow-hidden whitespace-nowrap"
//                     title={email}
//                   >
//                     {email}
//                   </p>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">{phoneNumber}</p>
//                 </div>
//               )}

//               {/* Dark Mode Toggle Inside Menu */}
//               <button
//                 onClick={toggleDarkMode}
//                 className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
//               >
//                 {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-900" />}
//                 <span className="ml-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
//               </button>

//               {/* My Blogs Button */}
//               <button
//                 onClick={() => navigate("/my-blogs")}
//                 className="mt-4 w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
//               >
//                 My Blogs
//               </button>

//               {/* Logout Button */}
//               <button
//                 onClick={handleLogout}
//                 className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Content Section */}
//       <div className="flex flex-col items-center justify-center h-full">
//         <h1 className="text-4xl font-bold">My Blogs</h1>
//       </div>
//     </div>
//   );
// };

// export default MyBlogs;




import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../api/authService";
import { getUserBlogs } from "../api/userBlogsService";
import { Menu, Sun, Moon } from "lucide-react";
import image from "../../public/images/logo.jpg";
import { motion, AnimatePresence } from "framer-motion";

const MyBlogs = () => {
  const [userName, setUserName] = useState("User");
  const [bio, setBio] = useState("Traveler & Explorer");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [showProfile, setShowProfile] = useState(false);
  const [blogs, setBlogs] = useState([]); // Store user blogs
  const [loading, setLoading] = useState(true); // Loading state

  const menuRef = useRef(null);
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
        setUserName(userData.name);
        setBio(userData.bio || "Traveler & Explorer");
        setPhoneNumber(userData.phone || "Not Provided");
        setEmail(userData.email || "Not Provided");

        // Fetch user blogs
        const userBlogs = await getUserBlogs();
        setBlogs(Array.isArray(userBlogs) ? userBlogs : []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching user details or blogs:", error.message);
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    setMenuOpen(false);
    navigate("/");
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div
        className={`min-h-screen w-full flex flex-col p-6 relative transition-colors duration-300 ${
            darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-100 to-green-300 text-gray-900"
        }`}
        >

      {/* Top Left: Travel Journal (Logout on Click) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4"
      >
        <button onClick={handleLogout} className="text-3xl font-extrabold flex gap-4 items-center cursor-pointer">
          <img src={image} alt="Logo" className="w-16 h-16 object-contain rounded-md" />
          Travel Journal
        </button>
      </motion.div>

      {/* Top Right: Dark Mode & Menu */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          onClick={toggleDarkMode}
          className="p-2 rounded-full transition"
        >
          {darkMode ? (
            <Sun size={24} className="text-white-400" />
          ) : (
            <Moon size={24} className="text-gray-900" />
          )}
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition relative"
        >
          <Menu size={24} />
        </motion.button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 top-12 mt-2 w-52 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80"
            >
              <button onClick={toggleProfile} className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600">
                Profile
              </button>

              {showProfile && (
                <div className="mt-4">
                  <p className="font-semibold text-gray-900 dark:text-white">{userName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{bio}</p> 
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate w-44 overflow-hidden whitespace-nowrap"
                        title={email} >
                            {email} </p>  {/*Show full email on hover*/}
                  <p className="text-sm text-gray-600 dark:text-gray-300">{phoneNumber}</p>
                </div>
              )}

              <button onClick={toggleDarkMode} className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600">
                {darkMode ? <Sun size={18} className="text-white-400" /> : <Moon size={18} className="text-gray-900" />}
                <span className="ml-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <button onClick={() => navigate("/my-blogs")} 
                className="mt-4 w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                My Blogs
              </button>

              <button onClick={handleLogout} className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600 transition">
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold">My Blogs</h1>

        {/* Loading State */}
        {loading && <p className="mt-4 text-lg">Loading your blogs...</p>}

        {/* No Blogs Message */}
        {!loading && blogs.length === 0 && <p className=" mt-4 text-lg">No Blogs Created</p>}

        {/* Blog List */}
        <div className="mt-6 w-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                whileHover={{ scale: 1.03 }}
                className=" bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{blog.location || "No Location Provided"}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(blog.dateOfTravel).toDateString()}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">By {userName}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;

