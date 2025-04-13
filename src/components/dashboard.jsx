// // // import React from "react";

// // // const Dashboard = () => {
// // //   return (
// // //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // //       <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;


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
//   const [phoneNumber, setPhoneNumber] = useState("");  
//   const [email, setEmail] = useState(""); 
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("darkMode") === "true"
//   );
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

//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold"
//       >
//         Welcome, {userName}
//       </motion.div>
      
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

//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex justify-between">
//         <div className="relative left-4 top-[calc(7rem+4.5rem)] h-[71vh] w-56 p-5 rounded-lg shadow-md shadow-gray-600 bg-gray-800 flex flex-col gap-10">
//           <div className="flex mb-6 justify-center">
//             <p className="text-lg font-semibold ">sashank</p>
//           </div>

//           <div className="flex flex-col gap-18">      
//             <div className="flex items-center flex-col">
//               <img src="../../public/images/bg1.jpg" className="shadow-md shadow-gray-200 rounded-md" />
//               <button className="px-4 py-2 mt-5 rounded-md bg-gray-900 shadow-gray-200 shadow-xs hover:shadow-md hover:shadow-blue-500 duration-200" onClick={() => navigate("/create-blog")}>
//                 Create Blog
//               </button>
//             </div>

//             <div className="flex items-center flex-col">
//               <img src="../../public/images/bg2.jpg" className="shadow-md shadow-gray-200 rounded-md" />
//               <button className="px-4 py-2 mt-5 rounded-md bg-gray-900 shadow-gray-200 shadow-xs hover:shadow-md hover:shadow-green-500 duration-200" onClick={() => navigate("/view-blog")}>
//                 View Blog
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="relative w-full max-w-4xl mr-6 shadow-2xl h-[450px] p-10 text-white text-center bg-cover bg-center bg-no-repeat bg-white/10 rounded-xl mt-54" style={{ backgroundImage: "url('../../public/images/DasboardImage.jpg')", filter: "brightness(0.8)" }}>
//           <div className="absolute backdrop-blur-[1px] inset-0"></div>
//           <div className="absolute z-10 top-2/3 right-4 bottom-3 text-right text-white">
//             <h1 className="text-4xl font-bold">Travel Journal: Ideas, Tips, and How To Preserve Your Travel Tales</h1>
//             <p className="mt-4 text-lg">Document your adventures, road trips, and places you’ve visited.</p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Dashboard;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../api/authService";
import { Sun, Moon, Edit, Search, Clock } from "lucide-react";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [userName, setUserName] = useState("User");
  const [bio, setBio] = useState("Traveler & Explorer");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const navigate = useNavigate();
  const recentBlogs = [
    { id: 1, title: "My Trip to Paris", date: "March 25, 2025" },
    { id: 2, title: "Hiking in the Alps", date: "March 18, 2025" }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col pt-4 md:p-6 md:pt-3  relative transition-colors duration-500 ${darkMode
        ? "bg-gray-900 text-gray-100"
        : "bg-gradient-to-t from-emerald-700 to-emerald-50 text-gray-800"
        }`}
    >
      <Navbar
        pages={"Home"}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        handleLogout={handleLogout}
        userName={userName}
        bio={bio}
        phoneNumber={phoneNumber}
        email={email}
      />

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col-reverse md:flex-row gap-8 w-full"
          >
            <div className="w-full md:w-64 h-96 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="w-full md:flex-1 h-96 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 mt-4 w-full"
          >
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
              className={`w-full md:w-64 p-5 rounded-xl shadow-lg mt-7 flex flex-col   ${darkMode
                ? "bg-gray-800 shadow-gray-950/50"
                : "bg-gray-100 shadow-emerald-900"
                } transition-colors duration-300`}
            >


              <div className="flex flex-col gap-20">
                <div className="flex flex-col w-full ">
                  <div
                    className={`w-full h-40 rounded-xl  overflow-hidden relative shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${darkMode ? "bg-gray-700" : "bg-emerald-100"
                      }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

                    <img
                      src="/images/create-blog.png"
                      alt="Create Blog"
                      className="w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />

                    <button
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px- py-2 w-4/5 rounded-full font-bold cursor-pointer transition-all duration-300 
        bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-teal-400
        text-white shadow-lg shadow-emerald-700/50 z-20
        border-2 border-white/20 backdrop-blur-sm
        group-hover:scale-105 group-hover:shadow-emerald-400/50"
                      onClick={() => navigate("/create-blog")}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-sm">Create Blog</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>

                    <div className="absolute top-3 right-3 text-xs font-bold px-2 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm z-20 border border-white/20">NEW</div>
                  </div>
                </div>

                <div className="flex items-center flex-col w-full ">
                  <div
                    className={`w-full h-40 rounded-xl  overflow-hidden relative shadow-md  transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${darkMode ? "bg-gray-700" : "bg-emerald-100"
                      }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

                    <img
                      src="/images/view-blog.png"
                      alt="View Blog"
                      className="w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />

                    <button
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-2 py-2 w-4/5 rounded-full font-bold transition-all duration-300 
        bg-gradient-to-r from-sky-600 to-blue-500 hover:from-sky-500 hover:to-indigo-400
        text-white shadow-lg shadow-blue-700/50 z-20
        border-2 border-white/20 backdrop-blur-sm
        group-hover:scale-105 group-hover:shadow-blue-400/50"
                      onClick={() => navigate("/view-blog")}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-sm">View Blog</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </span>
                    </button>

                    <div className="absolute top-3 right-3 text-xs font-bold px-2 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm z-20 border border-white/20">EXPLORE</div>
                  </div>
                </div>
              </div>


            </motion.div>
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div
                className={`relative w-full h-110 mt-8 overflow-hidden rounded-2xl group ${darkMode
                  ? "shadow-xl shadow-gray-950/50"
                  : "shadow-xl shadow-emerald-300/30"
                  }`}
              >
                <motion.div
                  className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: "url('/images/DasboardImage.jpg')" }}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                />

                <div
                  className={`absolute inset-0 ${darkMode
                    ? "bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/20"
                    : "bg-gradient-to-t from-black/80 via-black/40 to-black/10"
                    } backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-90`}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-6 right-6 flex space-x-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, type: "spring" }}
                      className="w-3 h-3 rounded-full bg-emerald-500/70 backdrop-blur-sm border border-white/30"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.3, type: "spring" }}
                      className="w-3 h-3 rounded-full bg-blue-500/70 backdrop-blur-sm border border-white/30"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.4, type: "spring" }}
                      className="w-3 h-3 rounded-full bg-purple-500/70 backdrop-blur-sm border border-white/30"
                    />
                  </div>


                </div>
                <div className="absolute z-10 bottom-10 left-10 right-10 text-left max-w-xl">
                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 50 }}
                    className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
                  >
                    <span className="inline-block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      Travel Journal: Ideas, Tips, and How To Preserve Your Travel Tales
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 50 }}
                    className="mt-4 text-lg text-white  rounded-lg"
                  >
                    Document your adventures, road trips, and places you've visited.
                  </motion.p>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 flex items-center gap-3"
                  >
                    <button
                      className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transform transition-all duration-300 group-hover:translate-y-1 shadow-lg 
                         bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-emerald-700/40
                        `}
                      onClick={() => navigate("/create-blog")}
                    >
                      <span>Start Writing</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </motion.div>
                </div>
                <motion.div
                  className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-indigo-500/10 backdrop-blur-md opacity-0 md:opacity-30 pointer-events-none"
                  animate={{
                    y: [0, 15, 0],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    },
                    opacity: {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                />

                <motion.div
                  className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-emerald-500/10 backdrop-blur-md opacity-0 md:opacity-30 pointer-events-none"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{
                    y: {
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse"
                    },
                    opacity: {
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                />
              </div>
            </motion.div>

          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-8 mt-12 rounded-xl view-shadow  ${darkMode ? "bg-gray-800 shadow-emerald-500" : "bg-white/90 shadow-black"
            }`}
        >
          <h2 className={`text-3xl text-center font-bold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            What are <span className=" text-emerald-500 "><span className="text-4xl">T</span>ravel <span className="text-4xl">J</span>ournals</span> ?
          </h2>

          <div className={` grid grid-cols-3  justify-center gap-5 mt-6  ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
            <div className="shadow-gray-700 rounded-xl shadow-sm hover:shadow-lg duration-200">
              <p className="leading-relaxed p-5">
                A <span className="text-lg text-emerald-500">Travel Journal</span> is a personal space where travelers can document their journeys, memories, and experiences from different places they've visited.
                It typically includes details like destinations, dates, highlights of the trip, photos, and personal reflections.
                
              </p>
            </div>
            <div className="shadow-gray-700 rounded-xl shadow-sm hover:shadow-lg duration-200">
              <p className="leading-relaxed p-5">
                <span className="text-lg text-emerald-500">Travel Journals</span> help you document and reflect on your travel experiences in a personal and creative way.
                They allow you to write about the places you've visited, share detailed descriptions, list your itineraries,
                and include photos or even voice recordings from your journey.
              </p>
            </div>
            <div className="shadow-gray-700 p-5 rounded-xl shadow-sm hover:shadow-lg duration-200">
              <p className="leading-relaxed ">
                <span className="text-lg text-emerald-500">Travel Journal</span> captures the essence of your adventures, turning moments into lasting memories.
                Among the many types of journals, travel journals remain one of the most popular for their ability to tell stories beyond just words.
              </p>
            </div>

          </div>
          <div className="flex justify-center mt-4 p-4">
            <button
              className={`px-5 py-2 rounded-lg font-medium transform transition-all duration-300 hover:scale-105 flex items-center gap-2
                        ${darkMode
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-700/30"
                  : "bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-md shadow-emerald-500/30"
                }`}
              onClick={() => navigate("/create-blog")}
            >
              <span>Start Your Travel Journal</span>
              <Edit className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

      </AnimatePresence>
    </div>
  );
};