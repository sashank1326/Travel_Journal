// // import React from "react";

// // const Dashboard = () => {
// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
// //       <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserDetails } from "../api/authService";
// import { Menu, Sun, Moon } from "lucide-react"; // Icons
// import image from "../../public/images/logo.jpg"; // Logo
// import { motion, AnimatePresence } from "framer-motion"; // Animation
// import { FiPlus, FiChevronLeft, FiChevronRight, FiMenu } from "react-icons/fi";

// const Dashboard = () => {
//   const [userName, setUserName] = useState("User");
//   const [bio, setBio] = useState("Traveler & Explorer");
//   const [phoneNumber, setPhoneNumber] = useState("");  // State for phone number
//   const [email, setEmail] = useState(""); // State for email
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("darkMode") === "true"
//   );
//   const [showProfile, setShowProfile] = useState(false); // State to toggle profile details
//   const menuRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/signin"); // Redirect if not logged in
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
//         navigate("/signin"); // Redirect if there's an issue
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   // Toggle Dark Mode
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("darkMode", newMode);
//     document.documentElement.classList.toggle("dark", newMode);
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove token from local storage
//     sessionStorage.clear(); // Clear session storage
//     setMenuOpen(false); // Close menu
//     navigate("/"); // Redirect to Welcome Page
//   };

//   // Toggle Profile Details
//   const toggleProfile = () => {
//     setShowProfile(!showProfile);
//   };

//   return (
//     <div
//       className={`h-screen w-full flex flex-col p-6 relative transition-colors duration-300 ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-100 to-green-300 text-gray-900"
//       }`}
//     >
//       {/* 🔹 Top Left: Travel Journal */}
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="absolute top-4 left-4"
//       >
//         <button onClick={handleLogout} className="text-3xl font-extrabold flex gap-4 items-center cursor-pointer">
//           <img src={image} alt="Logo" className="w-18 h-18 object-contain rounded-md" />
//           Travel Journal
//         </button>
//       </motion.div>

//       {/* 🔹 Top Center: Username */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold"
//       >
//         Welcome, {userName}
//       </motion.div>

//       {/* 🔹 Top Right: Dark Mode Toggle & Menu */}
//       <div className="absolute top-4 right-4 flex items-center gap-4">
//         {/* 🌙 Dark Mode Toggle (Outside Menu) */}
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

//         {/* ☰ Hamburger Menu */}
//         <motion.button
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="p-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition relative"
//         >
//           <Menu size={24} />
//         </motion.button>

//         {/* 🔹 Animated Dropdown Menu */}
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
//               <button
//                 onClick={toggleProfile}
//                 className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
//               >
//                 Profile
//               </button>

//               {/* Show User Details when Profile is clicked */}
//               {showProfile && (
//                 <div className="mt-4">
//                   <p className="font-semibold text-gray-900 dark:text-white">{userName}</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">{bio}</p> {/* Bio added here */}
//                   <p className="text-sm text-gray-600 dark:text-gray-300 truncate w-44 overflow-hidden whitespace-nowrap"
// title={email} >// Show full email on hover
// {email} </p>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">{phoneNumber}</p>
//                 </div>
//               )}

//               {/* 🌙 Dark Mode Toggle (Inside Menu) */}
//               <button
//                 onClick={toggleDarkMode}
//                 className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
//               >
//                 {darkMode ? <Sun size={18} className="text-white-400" /> : <Moon size={18} className="text-gray-900" />}
//                 <span className="ml-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
//               </button>

//               {/* 🔴 Logout Button */}
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
      
//       {/* 🔹 Travel Banner Section in Center */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="flex justify-between"
//       >

//           <div className={`relative left-4 top-[calc(7rem+4.5rem)] h-[71vh] transition-transform duration-300 w-56 p-5 rounded-lg shadow-md shadow-gray-600 bg-gray-800 flex flex-col gap-10`}>
          
//           {/* Month Selector */}
//           <div className="flex mb-6 justify-center">
//             <p className="text-lg font-semibold ">sashank</p>
//           </div>

//           <div className="flex flex-col gap-18">       {/* gap 12 or 20 ivvali*/}
//             <div className="flex items-center flex-col">
//               <div className="shadow-md shadow-gray-200 rounded-md ">
//                 <img src="../../public/images/bg1.jpg"/>
//               </div>
//               <button className="px-4 py-2 mt-5 rounded-md bg-gray-900 shadow-gray-200 shadow-xs hover:shadow-md hover:shadow-blue-500 duration-200">Create Blog</button>
//             </div>

//             <div className="flex items-center flex-col">
//               <div className="shadow-xs shadow-gray-200 rounded-md">
//                 <img src="../../public/images/bg1.jpg"/>
//               </div>
//               <button className="px-4 py-2 mt-5 rounded-md bg-gray-900 shadow-gray-200 shadow-xs hover:shadow-md hover:shadow-green-500 duration-200">View Blog</button>
//             </div>
//           </div>

//         </div>
//           <div
//             className="relative w-full max-w-4xl mr-6 shadow-2xl h-[450px] p-10 text-white text-center bg-cover bg-center bg-no-repeat bg-white/10 rounded-xl mt-54"
//             style={{
//               backgroundImage: "url('../../public/images/DasboardImage.jpg')",filter: "brightness(0.8)", // Background Image URL
//             }}
//           >
//             <div className="absolute backdrop-blur-[1px] inset-0">
//             </div>
//             <div className="absolute z-10 top-2/3 right-4 bottom-3 text-right text-white">
//               <h1 className="text-4xl font-bold">Travel Journal: Ideas, Tips, and How To Preserve Your Travel Tales</h1>
//               <p className="mt-4 text-lg">
//                 Document your adventures, road trips, and places you’ve visited. Discover new experiences and create memories along the way.
//               </p>
//             </div>
//           </div>
//       </motion.div>
//     </div>

//   );
// };
// export default Dashboard;


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../api/authService";
import { Menu, Sun, Moon } from "lucide-react"; // Icons
import image from "../../public/images/logo.jpg"; // Logo
import { motion, AnimatePresence } from "framer-motion"; // Animation
import { FiPlus, FiChevronLeft, FiChevronRight, FiMenu } from "react-icons/fi";

const Dashboard = () => {
  const [userName, setUserName] = useState("User");
  const [bio, setBio] = useState("Traveler & Explorer");
  const [phoneNumber, setPhoneNumber] = useState("");  
  const [email, setEmail] = useState(""); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [showProfile, setShowProfile] = useState(false); 
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
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        navigate("/signin");
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
      className={`h-screen w-full flex flex-col p-6 relative transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-100 to-green-300 text-gray-900"
      }`}
    >
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

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold"
      >
        Welcome, {userName}
      </motion.div>

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

              <button onClick={handleLogout} className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600 transition">
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex justify-between">
        <div className="relative left-4 top-[calc(7rem+4.5rem)] h-[71vh] w-56 p-5 rounded-lg shadow-md shadow-gray-600 bg-gray-800 flex flex-col gap-10">
          <div className="flex mb-6 justify-center">
            <p className="text-lg font-semibold ">sashank</p>
          </div>

          <div className="flex flex-col gap-18">      
            <div className="flex items-center flex-col">
              <img src="../../public/images/bg1.jpg" className="shadow-md shadow-gray-200 rounded-md" />
              <button className="px-4 py-2 mt-5 rounded-md bg-gray-900 shadow-gray-200 shadow-xs hover:shadow-md hover:shadow-blue-500 duration-200" onClick={() => navigate("/create-blog")}>
                Create Blog
              </button>
            </div>

            <div className="flex items-center flex-col">
              <img src="../../public/images/bg1.jpg" className="shadow-md shadow-gray-200 rounded-md" />
              <button className="px-4 py-2 mt-5 rounded-md bg-gray-900 shadow-gray-200 shadow-xs hover:shadow-md hover:shadow-green-500 duration-200" onClick={() => navigate("/view-blog")}>
                View Blog
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-4xl mr-6 shadow-2xl h-[450px] p-10 text-white text-center bg-cover bg-center bg-no-repeat bg-white/10 rounded-xl mt-54" style={{ backgroundImage: "url('../../public/images/DasboardImage.jpg')", filter: "brightness(0.8)" }}>
          <div className="absolute backdrop-blur-[1px] inset-0"></div>
          <div className="absolute z-10 top-2/3 right-4 bottom-3 text-right text-white">
            <h1 className="text-4xl font-bold">Travel Journal: Ideas, Tips, and How To Preserve Your Travel Tales</h1>
            <p className="mt-4 text-lg">Document your adventures, road trips, and places you’ve visited.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

