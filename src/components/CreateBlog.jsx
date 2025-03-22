// // import React from "react";

// // const CreateBlog = () => {
// //   return (
// //     <div className="h-screen flex items-center justify-center bg-gray-100 text-gray-900">
// //       <h1 className="text-4xl font-bold">Create Your Blog</h1>
// //     </div>
// //   );
// // };

// // export default CreateBlog;


// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Menu, Sun, Moon } from "lucide-react";
// import image from "../../public/images/logo.jpg";
// import { motion, AnimatePresence } from "framer-motion";
// import { getUserDetails } from "../api/authService";

// const CreateBlog = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
//   const [userName, setUserName] = useState("User");
//   const [bio, setBio] = useState("Traveler & Explorer");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [showProfile, setShowProfile] = useState(false);
//   const menuRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//     const fetchUser = async () => {
//       try {
//         const userData = await getUserDetails();
//         setUserName(userData.name);
//         setBio(userData.bio || "Traveler & Explorer");
//         setEmail(userData.email || "Not Provided");
//         setPhoneNumber(userData.phone || "Not Provided");
//       } catch (error) {
//         console.error("Error fetching user:", error.message);
//       }
//     };
//     fetchUser();
//   }, [darkMode]);

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

//   return (
//     <div className={`h-screen w-full p-6 transition-colors duration-300 ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-100 to-green-300 text-gray-900"
//       }`}>
      
//       {/* 🔹 Top Bar */}
//       <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
//         className="absolute top-4 left-4">
//         <button onClick={() => navigate("/dashboard")} className="text-3xl font-extrabold flex gap-4 items-center">
//           <img src={image} alt="Logo" className="w-16 h-16 object-contain rounded-md" /> Travel Journal
//         </button>
//       </motion.div>

//       {/* 🔹 Title */}
//       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
//         className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl font-bold">
//         Create Blog
//       </motion.div>

//       {/* 🔹 Menu & Dark Mode */}
//       <div className="absolute top-4 right-4 flex items-center gap-4">
//         <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
//           onClick={toggleDarkMode} className="p-2 rounded-full transition">
//           {darkMode ? <Sun size={24} className="text-white-400" /> : <Moon size={24} className="text-gray-900" />}
//         </motion.button>

//         <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
//           onClick={() => setMenuOpen(!menuOpen)} className="p-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition relative">
//           <Menu size={24} />
//         </motion.button>

//         {/* 🔹 Dropdown Menu */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div ref={menuRef} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
//               className="absolute right-0 top-12 mt-2 w-52 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
              
//               {/* Profile Button */}
//               <button onClick={() => setShowProfile(!showProfile)}
//                 className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600">
//                 Profile
//               </button>

//               {/* Show Profile Info */}
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

//               {/* Logout */}
//               <button onClick={handleLogout}
//                 className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600 transition">
//                 Logout
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* 🔹 Create Blog Form (No Container) */}
//       <div className="mt-24 ml-8 w-3/4">
//         <h2 className="text-2xl font-bold mb-4 text-white">Create Your Blog</h2>

//         <form className="flex flex-col gap-4">
//           <input type="text" placeholder="Title *" required className="p-3 border rounded-md w-full" />
//           <input type="text" placeholder="Location" className="p-3 border rounded-md w-full" />
//           <input type="date" className="p-3 border rounded-md w-full" />

//           <input type="text" placeholder="Tags (comma separated)" className="p-3 border rounded-md w-full" />
//           <textarea placeholder="Content/Description *" required className="p-3 border rounded-md w-full h-32 resize-none"></textarea>
//           <input type="file" accept="image/*" className="p-3 border rounded-md w-full" />
//           <input type="number" placeholder="Ratings (1-5)" min="1" max="5" className="p-3 border rounded-md w-full" />

//           <button type="submit" className="mt-4 bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition">
//             Submit Blog
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateBlog;





import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Sun, Moon } from "lucide-react";
import image from "../../public/images/logo.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { getUserDetails } from "../api/authService";

const CreateBlog = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [userName, setUserName] = useState("User");
  const [bio, setBio] = useState("Traveler & Explorer");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [fileCount, setFileCount] = useState(1);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    const fetchUser = async () => {
      try {
        const userData = await getUserDetails();
        setUserName(userData.name);
        setBio(userData.bio || "Traveler & Explorer");
        setEmail(userData.email || "Not Provided");
        setPhoneNumber(userData.phone || "Not Provided");
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    fetchUser();
  }, [darkMode]);

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

  return (
    <div className={`h-screen w-full p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-100 to-green-300 text-gray-900"
      }`}>
      
      {/* 🔹 Top Bar */}
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
        className="absolute top-4 left-4">
        <button onClick={() => navigate("/dashboard")} className="text-3xl font-extrabold flex gap-4 items-center">
          <img src={image} alt="Logo" className="w-16 h-16 object-contain rounded-md" /> Travel Journal
        </button>
      </motion.div>

      {/* 🔹 Title */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold">
        Create Blog
      </motion.div>

      {/* 🔹 Menu & Dark Mode */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          onClick={toggleDarkMode} className="p-2 rounded-full transition">
          {darkMode ? <Sun size={24} className="text-white-400" /> : <Moon size={24} className="text-gray-900" />}
        </motion.button>

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          onClick={() => setMenuOpen(!menuOpen)} className="p-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition relative">
          <Menu size={24} />
        </motion.button>

        {/* 🔹 Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div ref={menuRef} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
              className="absolute right-0 top-12 mt-2 w-52 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
              
              {/* Profile Button */}
              <button onClick={() => setShowProfile(!showProfile)}
                className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600">
                Profile
              </button>

              {/* Show Profile Info */}
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

              {/* Logout */}
              <button onClick={handleLogout}
                className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600 transition">
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔹 Create Blog Form */}
      <div className="mt-24 ml-8 w-3/4">
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Create Your Blog</h2>


        <form className="flex flex-col gap-3">
          <input type="text" placeholder="Title *" required 
            className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-800 text-white" : "bg-green-200 text-gray-900"}`}
          />
          <input type="text" placeholder="Location" 
            className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-800 text-white" : "bg-green-200 text-gray-900"}`}
          />
          <input type="date" 
            className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-800 text-white" : "bg-green-200 text-gray-900"}`}
          />
          <input type="text" placeholder="Tags (comma separated)" 
            className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-800 text-white" : "bg-green-200 text-gray-900"}`}
          />
          <textarea placeholder="Content/Description *" required 
            className={`p-3 border rounded-md w-full h-32 resize-none ${darkMode ? "bg-gray-800 text-white" : "bg-green-200 text-gray-900"}`}
          />

          {/* Number of Files & File Upload */}
          <div className="flex items-center gap-4">
            <input type="number" min="1" max="10" value={fileCount} onChange={(e) => setFileCount(e.target.value)} 
              className={`p-3 border rounded-md w-24 ${darkMode ? "bg-gray-800 text-white" : "bg-green-200 text-gray-900"}`}
            />
            <input type="file" accept="image/*" multiple 
              className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-800 text-white" : "bg-green-200 text-gray-900"}`}
            />
          </div>

          <input type="number" placeholder="Ratings (1-5)" min="1" max="5" 
            className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-800 text-white" : "bg-green-200 text-gray-900"}`}
          />

          <button type="submit" className="mt-4 bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition w-full">
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

