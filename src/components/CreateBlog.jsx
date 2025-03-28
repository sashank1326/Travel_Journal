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
// import axios from "axios";

// const CreateBlog = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
//   const [userName, setUserName] = useState("User");
//   const [bio, setBio] = useState("Traveler & Explorer");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [showProfile, setShowProfile] = useState(false);
//   const [title, setTitle] = useState("");
//   const [location, setLocation] = useState("");
//   const [dateOfTravel, setDateOfTravel] = useState("");
//   const [tags, setTags] = useState("");
//   const [content, setContent] = useState("");
//   const [rating, setRating] = useState("");
//   const [files, setFiles] = useState([]);
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

//     // Toggle Profile Details
//     const toggleProfile = () => {
//       setShowProfile(!showProfile);
//     };
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     setMenuOpen(false);
//     navigate("/");
//   };

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("location", location);
//     formData.append("dateOfTravel", dateOfTravel);
//     formData.append("tags", tags);
//     formData.append("content", content);
//     formData.append("rating", rating);

//     if (files.length > 0) {
//       for (let i = 0; i < files.length; i++) {
//         formData.append("images", files[i]);
//       }
//     }

//     console.log("📤 Sending request to:", "/api/blogs/create"); // <-- Add this line


//     try {
//         const response = await axios.post(`${import.meta.env.VITE_API_URL}/blogs/create`, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (response.status === 201) {
//         console.log("Blog created successfully:", response.data);
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.error("Error creating blog:", error);
//     }
//   };

//   return (
//     <div
//       className={`h-screen w-full p-6 transition-colors duration-300 ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-100 to-green-300 text-gray-900"
//       }`}
//     >
//       {/* 🔹 Top Bar */}
//       <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="absolute top-4 left-4">
//         <button onClick={() => navigate("/dashboard")} className="text-3xl font-extrabold flex gap-4 items-center">
//           <img src={image} alt="Logo" className="w-16 h-16 object-contain rounded-md" /> Travel Journal
//         </button>
//       </motion.div>

//       {/* 🔹 Title */}
//       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
//         className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold">
//         Create Blog
//       </motion.div>

//       {/* 🔹 Menu & Dark Mode */}
//       <div className="absolute top-4 right-4 flex items-center gap-4">
//         <motion.button onClick={toggleDarkMode} className="p-2 rounded-full transition">
//           {darkMode ? <Sun size={24} className="text-white-400" /> : <Moon size={24} className="text-gray-900" />}
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
//                     title={email} >
//                       {email} </p>   {/*Show full email on hover*/} 
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

//       {/* 🔹 Create Blog Form */}
//       <div className="mt-24 ml-8 w-3/4">
//         <h2 className="text-2xl font-bold mb-4">Create Your Blog</h2>

        
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          
//           <input type="text" placeholder="Title *" required value={title} onChange={(e) => setTitle(e.target.value)}
//             className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
//           />

//           <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)}
//             className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
//           />

//           <input type="date" value={dateOfTravel} onChange={(e) => setDateOfTravel(e.target.value)}
//             className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
//           />

//           <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)}
//             className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
//           />

//           <textarea placeholder="Content *" required value={content} rows='4' onChange={(e) => setContent(e.target.value)}
//             className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
//           />

//           <input type="number" placeholder="Rating (1-5)" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)}
//             className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
//           />

//           <input type="file" multiple onChange={(e) => setFiles([...e.target.files])}
//             className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
//           />

//           <button type="submit" className="mt-4 bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition w-full">
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
import axios from "axios";

const CreateBlog = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [userName, setUserName] = useState("User");
  const [bio, setBio] = useState("Traveler & Explorer");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [dateOfTravel, setDateOfTravel] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Toggle Profile Details
    const toggleProfile = () => {
      setShowProfile(!showProfile);
    };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    setMenuOpen(false);
    navigate("/");
  };

  //Handle submitting
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show animation
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("dateOfTravel", dateOfTravel);
    formData.append("tags", tags);
    formData.append("content", content);
    formData.append("rating", rating);
  
    files.forEach((file) => {
      formData.append("images", file);
    });
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 201) {
        console.log("Blog created successfully:", response.data);
        
        // Add a 2-second delay before navigating
        setTimeout(() => {
          setIsSubmitting(false); // Hide animation after 2 sec
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setIsSubmitting(false);
    }
  };
  




  return (
    <div
      className={`min-h-screen h-full w-full p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-100 to-green-300 text-gray-900"
      }`}
    >
      {/* 🔹 Top Bar */}
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="absolute top-4 left-4">
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
        <motion.button onClick={toggleDarkMode} className="p-2 rounded-full transition">
          {darkMode ? <Sun size={24} className="text-white-400" /> : <Moon size={24} className="text-gray-900" />}
        </motion.button>

        {/* ☰ Hamburger Menu */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition relative"
        >
          <Menu size={24} />
        </motion.button>

        {/* 🔹 Animated Dropdown Menu */}
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
              {/* Profile Button */}
              <button
                onClick={toggleProfile}
                className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Profile
              </button>

              {/* Show User Details when Profile is clicked */}
              {showProfile && (
                <div className="mt-4">
                  <p className="font-semibold text-gray-900 dark:text-white">{userName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{bio}</p> {/* Bio added here */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate w-44 overflow-hidden whitespace-nowrap"
                    title={email} >
                      {email} </p>   {/*Show full email on hover*/} 
                  <p className="text-sm text-gray-600 dark:text-gray-300">{phoneNumber}</p>
                </div>
              )}

              {/* 🌙 Dark Mode Toggle (Inside Menu) */}
              <button
                onClick={toggleDarkMode}
                className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {darkMode ? <Sun size={18} className="text-white-400" /> : <Moon size={18} className="text-gray-900" />}
                <span className="ml-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>

              {/* 🔴 Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔹 Create Blog Form */}
      <div className="mt-24 ml-8 w-3/4">
        <h2 className="text-2xl font-bold mb-4">Create Your Blog</h2>

        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-18">
          
          <input type="text" placeholder="Title *" required value={title} onChange={(e) => setTitle(e.target.value)}
            className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
          />

          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)}
            className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
          />

          <input type="date" value={dateOfTravel} onChange={(e) => setDateOfTravel(e.target.value)}
            className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
          />

          <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)}
            className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
          />

          <textarea placeholder="Content *" required value={content} rows='6' onChange={(e) => setContent(e.target.value)}
            className={`p-3  border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
          />

          <input type="number" placeholder="Rating (1-5)" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)}
            className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
          />

          <div className="relative w-full">
            {/* Hidden file input */}
            <input
              type="file"
              multiple
              id="fileInput"
              onChange={(e) => setFiles([...files, ...e.target.files])} // Preserve previous files
              className="hidden"
            />

            {/* Custom button to trigger file input */}
            <label
              htmlFor="fileInput"
              className={`block cursor-pointer p-3 border rounded-md w-full text-center 
                ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
            >
              Choose Files
            </label>

            {/* Display selected file names with remove button */}
            {files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 text-gray-600 dark:text-gray-300">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded-md text-sm">
                    <span className="mr-2">{file.name}</span>
                    <button
                      onClick={() => {
                        setFiles(files.filter((_, i) => i !== index)); // Remove file
                      }}
                      className="text-red-500 hover:text-red-700 ml-1"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* submit button */}
          <button type="submit"
            className="w-full bg-green-500 mt-8 text-white py-2 px-4 rounded-md flex justify-center items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="animate-bounce">Submitting...</span>
            ) : (
              "Submit"
            )}
          </button>



        </form>
        
        
      </div>
    </div>
  );
};

export default CreateBlog;
