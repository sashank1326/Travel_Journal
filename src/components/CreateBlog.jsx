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
//   const [isSubmitting, setIsSubmitting] = useState(false);

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

//   //Handle submitting
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true); // Show animation
  
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("location", location);
//     formData.append("dateOfTravel", dateOfTravel);
//     formData.append("tags", tags);
//     formData.append("content", content);
//     formData.append("rating", rating);
  
//     files.forEach((file) => {
//       formData.append("images", file);
//     });
  
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/blogs/create`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       if (response.status === 201) {
//         console.log("Blog created successfully:", response.data);
        
//         // Add a 2-second delay before navigating
//         setTimeout(() => {
//           setIsSubmitting(false); // Hide animation after 2 sec
//           navigate("/dashboard");
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Error creating blog:", error);
//       setIsSubmitting(false);
//     }
//   };
  




//   return (
//     <div
//       className={`min-h-screen h-full w-full p-6 transition-colors duration-300 ${
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

        
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-18">
          
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

//           <textarea placeholder="Content *" required value={content} rows='6' onChange={(e) => setContent(e.target.value)}
//             className={`p-3  border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
//           />

//           <input type="number" placeholder="Rating (1-5)" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)}
//             className={`p-3 border rounded-md w-full ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
//           />

//           <div className="relative w-full">
//             {/* Hidden file input */}
//             <input
//               type="file"
//               multiple
//               id="fileInput"
//               onChange={(e) => setFiles([...files, ...e.target.files])} // Preserve previous files
//               className="hidden"
//             />

//             {/* Custom button to trigger file input */}
//             <label
//               htmlFor="fileInput"
//               className={`block cursor-pointer p-3 border rounded-md w-full text-center 
//                 ${darkMode ? "bg-gray-700 text-white" : "bg-green-200 text-gray-900"}`}
//             >
//               Choose Files
//             </label>

//             {/* Display selected file names with remove button */}
//             {files.length > 0 && (
//               <div className="mt-2 flex flex-wrap gap-2 text-gray-600 dark:text-gray-300">
//                 {files.map((file, index) => (
//                   <div key={index} className="flex items-center bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded-md text-sm">
//                     <span className="mr-2">{file.name}</span>
//                     <button
//                       onClick={() => {
//                         setFiles(files.filter((_, i) => i !== index)); // Remove file
//                       }}
//                       className="text-red-500 hover:text-red-700 ml-1"
//                     >
//                       ✖
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           {/* submit button */}
//           <button type="submit"
//             className="w-full bg-green-500 mt-8 text-white py-2 px-4 rounded-md flex justify-center items-center"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <span className="animate-bounce">Submitting...</span>
//             ) : (
//               "Submit"
//             )}
//           </button>



//         </form>
        
        
//       </div>
//     </div>
//   );
// };

// export default CreateBlog;



import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Sun, Moon, MapPin, Calendar, Tag, Star, Upload, X, FileText, ArrowRight } from "lucide-react";
import image from "../../public/images/logo.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { getUserDetails } from "../api/authService";
import axios from "axios";
import Navbar from "./Navbar";

export default function CreateBlog() {
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
  const [rating, setRating] = useState(0);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState("");

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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

    const newPreviewUrls = [];
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });

    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [darkMode, files]);

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);

    droppedFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

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

  const nextStep = () => {
    if (currentStep === 1 && !title) {
      setError("Please provide a title for your blog");
      return;
    }
    if (currentStep === 2 && !content) {
      setError("Please write your story");
      return;
    }
    setError(""); 
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError(""); 
    setCurrentStep(prev => prev - 1);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => setRating(i)}
          className={`text-2xl transition-colors ${i <= rating
              ? 'text-yellow-400'
              : darkMode ? 'text-gray-600' : 'text-gray-300'
            }`}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  return (
    <div
      className={`min-h-screen h-full w-full pt-4 transition-colors duration-500 ${darkMode
        ? "bg-gray-900 text-gray-100"
        : "bg-gradient-to-t from-emerald-700 to-emerald-50 text-gray-800"
        }`}
    >
      <Navbar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              userName={userName}
              bio={bio}
              phoneNumber={phoneNumber}
              email={email}
              pages={"Create Blog"}
            />

      <div className="mx-auto pt-5 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl ${darkMode ? "bg-gray-800" : "bg-white"
            }`}
        >
          <div className={`p-6 ${darkMode ? "bg-gray-700" : "bg-emerald-600"}`}>
            <h2 className="text-2xl font-bold text-white flex items-center">
              <FileText className="mr-2" size={24} />
              Share Your Travel Story
            </h2>
            <p className="text-white/80 mt-1">Document your adventures and inspire fellow travelers</p>
          </div>

          {error && (
            <div className="mx-8 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p>{error}</p>
            </div>
          )}

          <div className="px-8 pt-6">
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium transition-colors ${step < currentStep
                        ? 'bg-emerald-600'
                        : step === currentStep
                          ? 'bg-teal-600'
                          : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                  >
                    {step < currentStep ? '✓' : step}
                  </div>
                  <span className={`mt-2 text-sm ${step === currentStep
                      ? darkMode ? 'text-white' : 'text-emerald-700 font-medium'
                      : darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                    {step === 1 ? 'Basic Info' : step === 2 ? 'Your Story' : 'Images & Submit'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      Title <span className="text-red-500">*</span>
                    </label>
                    <div className={`relative rounded-lg overflow-hidden ${darkMode ? "bg-gray-700 focus-within:ring-2 ring-emerald-500" : "bg-emerald-50 focus-within:ring-2 ring-emerald-500"
                      }`}>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give your travel story a captivating title"
                        className={`p-4 pl-12 w-full outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-emerald-50 text-gray-900"
                          }`}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText size={20} className={darkMode ? "text-gray-400" : "text-emerald-600"} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      Location
                    </label>
                    <div className={`relative rounded-lg overflow-hidden ${darkMode ? "bg-gray-700 focus-within:ring-2 ring-emerald-500" : "bg-emerald-50 focus-within:ring-2 ring-emerald-500"
                      }`}>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Where did you travel to?"
                        className={`p-4 pl-12 w-full outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-emerald-50 text-gray-900"
                          }`}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={20} className={darkMode ? "text-gray-400" : "text-emerald-600"} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      Date of Travel
                    </label>
                    <div className={`relative rounded-lg overflow-hidden ${darkMode ? "bg-gray-700 focus-within:ring-2 ring-emerald-500" : "bg-emerald-50 focus-within:ring-2 ring-emerald-500"
                      }`}>
                      <input
                        type="date"
                        value={dateOfTravel}
                        onChange={(e) => setDateOfTravel(e.target.value)}
                        className={`p-4 pl-12 w-full outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-emerald-50 text-gray-900"
                          }`}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={20} className={darkMode ? "text-gray-400" : "text-emerald-600"} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      Tags
                    </label>
                    <div className={`relative rounded-lg overflow-hidden ${darkMode ? "bg-gray-700 focus-within:ring-2 ring-emerald-500" : "bg-emerald-50 focus-within:ring-2 ring-emerald-500"
                      }`}>
                      <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="e.g. beach, hiking, food (comma-separated)"
                        className={`p-4 pl-12 w-full outline-none ${darkMode ? "bg-gray-700 text-white" : "bg-emerald-50 text-gray-900"
                          }`}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag size={20} className={darkMode ? "text-gray-400" : "text-emerald-600"} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={nextStep}
                      className={`flex items-center px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-emerald-600 to-teal-500 text-white
                      `}
                    >
                      Next Step
                      <ArrowRight className="ml-2" size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      Your Story <span className="text-red-500">*</span>
                    </label>
                    <div className={`rounded-lg overflow-hidden ${darkMode ? "bg-gray-700 focus-within:ring-2 ring-emerald-500" : "bg-emerald-50 focus-within:ring-2 ring-emerald-500"
                      }`}>
                      <textarea
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        placeholder="Share your travel experience, adventures, tips and highlights..."
                        className={`p-4 w-full outline-none resize-none ${darkMode ? "bg-gray-700 text-white" : "bg-emerald-50 text-gray-900"
                          }`}
                      ></textarea>
                    </div>
                    <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {content.length} characters • {content.split(/\s+/).filter(Boolean).length} words
                    </p>
                  </div>

                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      Rating (How would you rate this experience?)
                    </label>
                    <div className="flex space-x-2">
                      {renderStars()}
                      {rating > 0 && (
                        <span className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          ({rating}/5)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={prevStep}
                      className={`px-6 py-3 rounded-lg font-medium ${darkMode
                          ? "bg-gray-600 text-white"
                          : "bg-gray-300 text-gray-700"
                        }`}
                    >
                      Back
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={nextStep}
                      className={`flex items-center px-6 py-3 rounded-lg font-medium 
                         bg-gradient-to-r from-emerald-600 to-teal-500 text-white
                      `}
                    >
                      Next Step
                      <ArrowRight className="ml-2" size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      Add Images
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors  border-emerald-700 hover:border-emerald-600 
                      `}
                      onClick={() => fileInputRef.current.click()}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        multiple
                        accept="image/*"
                        onChange={(e) => setFiles([...files, ...e.target.files])}
                        className="hidden"
                      />
                      <Upload className={`mx-auto mb-2 ${darkMode ? "text-gray-400" : "text-emerald-600"}`} size={32} />
                      <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                        Click to browse or drag and drop your images here
                      </p>
                      <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        JPG, PNG or GIF files
                      </p>
                    </div>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 text-gray-600 dark:text-gray-300">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded-md text-sm">
                          <span className="mr-2">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 ml-1"
                          >
                            ✖
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-6 flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={prevStep}
                      className={`px-6 py-3 rounded-lg font-medium ${darkMode
                          ? "bg-gray-600 text-white"
                          : "bg-gray-300 text-gray-700"
                        }`}
                    >
                      Back
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center px-8 py-3 rounded-lg font-medium ${isSubmitting
                          ? darkMode ? "bg-gray-600" : "bg-gray-400"
                          : "bg-gradient-to-r from-emerald-600 to-teal-500"
                        } text-white`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Publishing...
                        </div>
                      ) : (
                        <>
                          Publish Blog
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  );
};