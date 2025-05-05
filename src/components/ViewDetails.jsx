// import { useState, useEffect, useRef } from "react"; // Add useRef here
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import io from "socket.io-client";

// const API_URL = "http://localhost:5000/api/blogs";
// const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
// const WEATHER_API_KEY = "3acf46f3b2b85194cc6fe10182fe807a";

// export default function ViewDetails() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [weather, setWeather] = useState(null);
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
//   const [analysis, setAnalysis] = useState([]);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [showFullInsights, setShowFullInsights] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [socket, setSocket] = useState(null);
//   const messagesEndRef = useRef(null);
//   const SOCKET_URL = "http://localhost:5000";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/${id}`);
//         console.log("Blog data:", response.data.blog);
//         if (!response.data.blog) throw new Error("Blog not found!");

//         setBlog(response.data.blog);

//         if (response.data.blog.content) {
//           try {
//             const aiResponse = await axios.post("http://localhost:5000/api/gemini/analyze", {
//               blogContent: response.data.blog.content,
//             });
//             const result = await aiResponse.data;
//             setAnalysis([result]);
//           } catch (aiError) {
//             console.error("AI Analysis Error:", aiError.response?.data || aiError.message);
//           }
//         }

//         if (response.data.blog.location) {
//           const weatherRes = await axios.get(WEATHER_API_URL, {
//             params: { q: response.data.blog.location, appid: WEATHER_API_KEY, units: "metric" }
//           });
//           setWeather(weatherRes.data);
//         }

//       } catch (error) {
//         setError("Failed to load blog details. Please try again.");
//         console.error("Error fetching data:", error);
//       } finally {
//         setTimeout(() => {
//           setLoading(false);
//         }, 500);
//       }
//     };

//     fetchData();
//   }, [id]);

//   useEffect(() => {
//     const newSocket = io(SOCKET_URL);
//     setSocket(newSocket);

//     if (blog?.author?._id) {
//         newSocket.emit('join', {
//             userId: localStorage.getItem('userId'),
//             authorId: blog.author._id,
//             blogId: id
//         });
//     }

//     newSocket.on('receive_message', (message) => {
//         // Check if message is from blog author
//         const isFromAuthor = message.userId === blog.author._id || message.userId === blog._id;
        
//         setMessages(prev => [...prev, {
//             text: message.text,
//             sender: isFromAuthor ? 'author' : 'user'
//         }]);
//     });

//     return () => {
//         newSocket.disconnect();
//     };
//   }, [blog?.author?._id, id]);


//   useEffect(() => {
//     const fetchMessages = async () => {
//         if (blog?.author?._id && activeTab === "chat") {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/chat/blog-messages/${id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
                
//                 const formattedMessages = response.data.map(msg => {
//                     // Check if sender matches either blog ID or author ID
//                     const isAuthor = msg.sender === blog._id || msg.sender === blog.author._id;
                    
//                     console.log('Message details:', {
//                         msgSender: msg.sender,
//                         blogId: blog._id,
//                         authorId: blog.author._id,
//                         isAuthor: isAuthor
//                     });

//                     return {
//                         text: msg.content,
//                         sender: isAuthor ? 'author' : 'user'
//                     };
//                 });
                
//                 setMessages(formattedMessages);
//             } catch (error) {
//                 console.error('Error fetching messages:', error);
//             }
//         }
//     };

//     fetchMessages();
// }, [blog?.author?._id, id, activeTab]);

// // // Update socket message handler as well
// // useEffect(() => {
// //     const newSocket = io(SOCKET_URL);
// //     setSocket(newSocket);

// //     if (blog?.author?._id) {
// //         newSocket.emit('join', {
// //             userId: localStorage.getItem('userId'),
// //             authorId: blog.author._id,
// //             blogId: id
// //         });
// //     }

// //     newSocket.on('receive_message', (message) => {
// //         // Check if message is from blog author or matches blog ID
// //         const isFromAuthor = message.userId === blog.author._id || message.userId === blog._id;
        
// //         setMessages(prev => [...prev, {
// //             text: message.text,
// //             sender: isFromAuthor ? 'author' : 'user'
// //         }]);
// //     });

// //     return () => {
// //         newSocket.disconnect();
// //     };
// // }, [blog?.author?._id, id]);
                
               

//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("darkMode", newMode.toString());
//   };

//   if (loading) return (
//     <div className={`flex flex-col gap-6 items-center justify-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-emerald-50 to-teal-100"}`}>
//       <div className="w-16 h-16 relative">
//         <div className="w-full h-full rounded-full border-4 border-emerald-200 border-t-emerald-500 animate-spin"></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
//           </svg>
//         </div>
//       </div>
//       <p className="text-xl font-medium text-emerald-700 dark:text-emerald-300">Unpacking your adventure...</p>
//     </div>
//   );

//   if (error || !blog) return (
//     <div className={`flex items-center justify-center min-h-screen p-4 ${darkMode
//       ? "bg-gray-900 text-gray-100"
//       : "bg-gradient-to-t from-emerald-700 to-emerald-50 text-gray-800"
//       }`}>
//       <div className="text-center max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 transform transition-all">
//         <div className="text-red-500 text-6xl mb-6">⚠️</div>
//         <h2 className="text-2xl font-bold mb-3  ">{!blog ? "Journey Not Found" : "Error"}</h2>
//         <p className="text-gray-600 dark:text-gray-300">{error || "The adventure you're looking for doesn't exist or has been removed."}</p>
//         <button
//           onClick={() => window.location.href = "/view-blog"}
//           className="mt-6 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-md"
//         >
//           Return to Explorations
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className={`min-h-screen ${darkMode
//       ? "bg-gray-900 text-gray-100"
//       : "bg-gradient-to-t from-emerald-700 to-emerald-50 text-gray-800"
//       }`}>

//       <div className="relative h-92 w-full overflow-hidden">
//         {blog.images && blog.images.length > 0 ? (
//           <img
//             src={`http://localhost:5000/${blog.images[0]}`}
//             alt={blog.title}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
//         )}
//         <div className="absolute inset-0 bg-black/50 bg-opacity-20"></div>
//         <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
//           <button
//             onClick={() => window.location.href = "/view-blog"}
//             className="px-4 py-2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-lg flex items-center transition-all"
//           >
//             <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
//             </svg>
//             Back
//           </button>

//           <button
//             onClick={toggleDarkMode}
//             className="p-2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-lg transition-all"
//           >
//             {darkMode ? (
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
//               </svg>
//             ) : (
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
//               </svg>
//             )}
//           </button>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
//           <div className="max-w-5xl mx-auto">
//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">{blog.title}</h1>

//             <div className="flex flex-wrap items-center text-white text-sm md:text-base gap-4 mb-2">
//               <div className="flex items-center">
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                 </svg>
//                 <span>{new Date(blog.dateOfTravel).toDateString()}</span>
//               </div>

//               {blog.location && (
//                 <div className="flex items-center">
//                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                   </svg>
//                   <span>{blog.location}</span>
//                 </div>
//               )}

//               {blog.rating && (
//                 <div className="flex items-center">
//                   <span className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <svg
//                         key={i}
//                         className={`w-4 h-4 ${i < blog.rating ? "text-yellow-400" : "text-gray-400"}`}
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                       </svg>
//                     ))}
//                   </span>
//                   <span className="ml-1">{blog.rating}/5</span>
//                 </div>
//               )}
//             </div>

//             {blog.author && (
//               <div className="flex items-center mt-3">
//                 <div className="ml-2">
//                   <p className="text-white text-sm">
//                     By <span className="text-md md:text-lg">{blog.author.name}</span>
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex relative items-start  mx-auto px-4 py-6">

//         <div className={`sticky left-3 min-w-[15rem] top-5 px-1 py-2  justify-center overflow-x-auto mb-6 ${darkMode ? 'bg-gray-800 text-gray-600': 'bg-white text-gray-700'}  rounded-lg shadow-md shadow-gray-700`}>
//           <div className={`flex flex-col gap-2 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} m-2`}>
//             <button
//               onClick={() => setActiveTab("overview")}
//               className={`px-6 py-3  m-1 rounded-lg text-sm text-md  md:text-lg font-bold whitespace-nowrap transition-colors ${activeTab === "overview"
//                 ? "text-white bg-emerald-600 "
//                 : " hover:text-emerald-500 "
//                 }`}
//             >
//               Overview
//             </button>
//             <button
//               onClick={() => setActiveTab("insights")}
//               className={`px-6 py-3  m-1 rounded-lg text-sm text-md  md:text-lg font-bold whitespace-nowrap transition-colors ${activeTab === "insights"
//                 ? "text-white bg-emerald-600 "
//                 : " hover:text-emerald-500 "
//                 }`}
//             >
//               Travel Insights
//             </button>
//             <button
//               onClick={() => setActiveTab("gallery")}
//               className={`px-6 py-3  m-1 rounded-lg text-sm text-md  md:text-lg font-bold whitespace-nowrap transition-colors ${activeTab === "gallery"
//                 ? "text-white bg-emerald-600 "
//                 : " hover:text-emerald-500 "
//                 }`}
//             >
//               Gallery
//             </button>
//             {weather && (
//               <button
//                 onClick={() => setActiveTab("weather")}
//                 className={`px-6 py-3  m-1 rounded-lg text-sm text-md  md:text-lg font-bold whitespace-nowrap transition-colors ${activeTab === "weather"
//                   ? "text-white bg-emerald-600 "
//                   : " hover:text-emerald-500 "
//                   }`}
//               >
//                 Weather
//               </button>
//             )}
//             {blog.author && blog.author._id !== localStorage.getItem('userId') ? (
//                   <button
//                       onClick={() => setActiveTab("chat")}
//                       className={`px-6 py-3 m-1 rounded-lg text-sm text-md md:text-lg font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
//                           activeTab === "chat"
//                               ? "text-white bg-emerald-600"
//                               : "hover:text-emerald-500"
//                       }`}
//                   >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
//                               d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
//                           </path>
//                       </svg>
//                       Message Author
//                   </button>
//               ) : null}
//             </div>
//         </div>
//         {/* Tab Content */}
//         <div className="space-y-6 ml-6">
//           {/* Overview Tab */}
//           {activeTab === "overview" && (
//             <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//               <div className="prose max-w-none dark:prose-invert">
//                 <p className="whitespace-pre-line leading-relaxed">{blog.content}</p>
//               </div>
//             </div>
//           )}

//           {/* Insights Tab */}
//           {activeTab === "insights" && analysis.length > 0 && (
//             <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>


//               {/* Main Content */}
//               <div className="p-6">
//                 {/* Travel Summary Cards */}
//                 <div className="flex flex-wrap gap-4 mb-8">
//                   <div className={`flex-1 min-w-[180px] rounded-xl p-5 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border-l-4 border-emerald-500`}>
//                     <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Travel Style</p>
//                     <p className="text-xl font-medium   flex items-center gap-2">
//                       <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
//                       </svg>
//                       {analysis[0]["Travel Style"]}
//                     </p>
//                   </div>

//                   <div className={`flex-1 min-w-[180px] rounded-xl p-5 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border-l-4 border-emerald-500`}>
//                     <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Season</p>
//                     <p className="text-xl font-medium   flex items-center gap-2">
//                       <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
//                       </svg>
//                       {analysis[0].Season}
//                     </p>
//                   </div>

//                   <div className={`flex-1 min-w-[180px] rounded-xl p-5 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border-l-4 border-emerald-500`}>
//                     <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Travel Mode</p>
//                     <p className="text-xl font-medium   flex items-center gap-2">
//                       <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
//                       </svg>
//                       {analysis[0]["Travel Mode"]}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Attractions Section */}
//                 <div className="mb-8">
//                   <h3 className="flex items-center gap-2 text-xl font-semibold mb-5  ">
//                     <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                     </svg>
//                     <span>Must-Visit Attractions</span>
//                   </h3>

//                   <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
//                     {analysis[0]["Nearby Attractions"].map((place, index) => (
//                       <div
//                         key={index}
//                         className={`group relative rounded-xl overflow-hidden transition-all ${darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"} shadow-md hover:shadow-lg`}
//                       >
//                         <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
//                         <div className="p-5">
//                           <div className="flex justify-between items-start mb-3">
//                             <h4 className={`font-medium text-lg ${darkMode ? 'text-gray-300': 'text-gray-800'}  mb-2`}>{place.Name}</h4>
//                             <span className={`flex items-center font-bold justify-center w-8 h-8 rounded-full ${darkMode ? 'bg-emerald-500': 'bg-emerald-700'} text-white`}>
//                               {index + 1}
//                             </span>
//                           </div>
//                           <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{place.Description}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Toggle Button - With Animation */}
//                 {analysis[0]["Hotel Suggestions"] && !showFullInsights && (
//                   <div className="flex justify-center my-6">
//                     <button
//                       onClick={() => setShowFullInsights(true)}
//                       className={`group relative overflow-hidden px-6 py-3 rounded-full font-medium ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} shadow-md hover:shadow-lg transition-all`}
//                     >
//                       <span className="absolute inset-0 w-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out group-hover:w-full"></span>
//                       <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
//                         </svg>
//                         Show Complete Travel Details
//                       </span>
//                     </button>
//                   </div>
//                 )}

//                 {/* Expanded Content */}
//                 {showFullInsights && analysis[0]["Hotel Suggestions"] && (
//                   <>
//                     {/* Accommodations Section */}
//                     <div className="mb-8">
//                       <h3 className="flex items-center gap-2 text-xl font-semibold mb-5  ">
//                         <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
//                         </svg>
//                         <span>Where To Stay</span>
//                       </h3>

//                       <div className="space-y-8">
//                         {/* Budget Hotels */}
//                         <div className="rounded-xl overflow-hidden">
//                           <div className={`px-5 py-3 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//                             <h4 className="flex items-center gap-2 font-medium text-gray-900  ">
//                               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs">$</span>
//                               Budget-Friendly Options
//                             </h4>
//                           </div>


//                         </div>

//                         {/* Mid-Range Hotels */}
//                         <div className="rounded-xl overflow-hidden">
//                           <div className={`px-5 py-3 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//                             <h4 className="flex items-center gap-2 font-medium text-gray-900  ">
//                               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs">$$</span>
//                               Mid-Range Comfort
//                             </h4>
//                           </div>


//                         </div>

//                         {/* Luxury Hotels */}
//                         <div className="rounded-xl overflow-hidden">
//                           <div className={`px-5 py-3 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//                             <h4 className="flex items-center gap-2 font-medium text-gray-900  ">
//                               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-xs">$$$</span>
//                               Luxury Experiences
//                             </h4>
//                           </div>

                          
//                         </div>
//                       </div>
//                     </div>

//                     {/* Budget Section */}
//                     <div>
//                       <h3 className="flex items-center gap-2 text-xl font-semibold mb-5  ">
//                         <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                         </svg>
//                         <span>Budget Planner</span>
//                       </h3>

//                       <div className={`rounded-xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
//                         <div className="overflow-x-auto">
//                           <table className="w-full">
//                             <thead>
//                               <tr className={`text-left ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
//                                 <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Expense Category</th>
//                                 <th className="px-6 py-4">
//                                   <div className="flex items-center gap-2">
//                                     <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs">$</span>
//                                     <span className="text-sm font-medium text-gray-900  ">Budget</span>
//                                   </div>
//                                 </th>
//                                 <th className="px-6 py-4">
//                                   <div className="flex items-center gap-2">
//                                     <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs">$$</span>
//                                     <span className="text-sm font-medium text-gray-900  ">Mid-range</span>
//                                   </div>
//                                 </th>
//                                 <th className="px-6 py-4">
//                                   <div className="flex items-center gap-2">
//                                     <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-xs">$$$</span>
//                                     <span className="text-sm font-medium text-gray-900  ">Luxury</span>
//                                   </div>
//                                 </th>
//                               </tr>
//                             </thead>

//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Gallery Tab */}
//           {activeTab === "gallery" && (
//             <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//               {blog.images && blog.images.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                   {blog.images.map((image, index) => (
//                     <div key={index} className="aspect-w-16 aspect-h-12 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
//                       <img
//                         src={`http://localhost:5000/${image}`}
//                         alt={`${blog.title} - Image ${index + 1}`}
//                         className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                   </svg>
//                   <p className="mt-4 text-gray-500 dark:text-gray-400">No images available for this adventure</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {activeTab === "weather" && weather && (
//             <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="col-span-1 md:col-span-2">
//                   <div className="flex items-center">
//                     <div className="mr-4">
//                       <img
//                         src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
//                         alt={weather.weather[0].description}
//                         className="w-24 h-24"
//                       />
//                     </div>
//                     <div>
//                       <h3 className="text-3xl font-bold  ">{Math.round(weather.main.temp)}°C</h3>
//                       <p className="text-xl capitalize text-gray-600 dark:text-gray-300">{weather.weather[0].description}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Current weather in {blog.location}</p>
//                     </div>
//                   </div>

//                   <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
//                     <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
//                       <div className="flex items-center">
//                         <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
//                         </svg>
//                         <h4 className="font-medium text-gray-700 dark:text-gray-200">Humidity</h4>
//                       </div>
//                       <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-300">{weather.main.humidity}%</p>
//                     </div>

//                     <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
//                       <div className="flex items-center">
//                         <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
//                         </svg>
//                         <h4 className="font-medium text-gray-700 dark:text-gray-200">Wind Speed</h4>
//                       </div>
//                       <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-300">{weather.wind.speed} m/s</p>
//                     </div>

//                     <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
//                       <div className="flex items-center">
//                         <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
//                         </svg>
//                         <h4 className="font-medium text-gray-700 dark:text-gray-200">Pressure</h4>
//                       </div>
//                       <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-300">{weather.main.pressure} hPa</p>
//                     </div>

//                     <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
//                       <div className="flex items-center">
//                         <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
//                         </svg>
//                         <h4 className="font-medium text-gray-700 dark:text-gray-200">Visibility</h4>
//                       </div>
//                       <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-300">{(weather.visibility / 1000).toFixed(1)} km</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white p-6 rounded-lg shadow-md">
//                   <h3 className="text-xl font-bold mb-4">Travel Tip</h3>
//                   <p className="mb-4">
//                     {weather.main.temp > 25
//                       ? "It's quite hot! Stay hydrated and consider indoor activities during peak sun hours."
//                       : weather.main.temp < 15
//                         ? "It's a bit cool. Pack a light jacket for your adventures."
//                         : "The temperature is pleasant. Perfect weather for exploring!"
//                     }
//                   </p>
//                   <p>
//                     {weather.weather[0].main === "Rain"
//                       ? "Don't forget your umbrella and waterproof gear!"
//                       : weather.weather[0].main === "Clear"
//                         ? "It's a clear day - great for photography and outdoor activities!"
//                         : weather.weather[0].main === "Clouds"
//                           ? "It's a cloudy day - perfect for sightseeing without harsh sun."
//                           : "Check local weather reports for any advisories before heading out."
//                     }
//                   </p>
//                 </div>
//               </div>
              
//             </div> 
//           )}
//           {activeTab === "chat" && blog?.author?._id && blog.author._id !== localStorage.getItem('userId') && (
//               <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//                 <div className="max-w-2xl mx-auto">
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
//                       <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold">Chat with {blog.author.name}</h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Ask about their travel experience
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 h-96 overflow-y-auto p-4">
//                     {messages.length === 0 ? (
//                       <div className="h-full flex items-center justify-center">
//                         <p className="text-center text-gray-600 dark:text-gray-400">
//                           Start a conversation with {blog.author.name}
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         {messages.map((msg, index) => (
//                           <div
//                             key={index}
//                             className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                           >
//                             <div className="flex flex-col">
//                               <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
//                                 msg.sender === 'user' 
//                                   ? 'bg-emerald-500 text-white' 
//                                   : 'bg-gray-200 dark:bg-gray-500'
//                               }`}>
//                                 <p>{msg.text}</p>
//                               </div>
//                               <span className={`text-xs mt-1 ${
//                                 msg.sender === 'user' 
//                                   ? 'text-right text-gray-500 dark:text-gray-400' 
//                                   : 'text-left text-gray-500 dark:text-gray-400'
//                               }`}>
//                                 {msg.sender === 'user' ? 'You' : `${blog.author.name} (Author)`}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       placeholder="Type your message..."
//                       className={`flex-1 px-4 py-2 rounded-lg ${
//                         darkMode 
//                           ? 'bg-gray-700 text-gray-100' 
//                           : 'bg-gray-100 text-gray-900'
//                       } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
//                       onKeyPress={(e) => {
//                         if (e.key === 'Enter' && newMessage.trim() && socket) {
//                           const messageData = {
//                             text: newMessage,
//                             userId: localStorage.getItem('userId'),
//                             authorId: blog.author._id,
//                             blogId: id
//                           };
//                           socket.emit('send_message', messageData);
//                           // setMessages(prev => [...prev, { text: newMessage, sender: 'user' }]);
//                           setNewMessage('');
//                         }
//                       }}
//                     />
//                     <button
//                       onClick={() => {
//                         if (newMessage.trim() && socket) {
//                           const messageData = {
//                             text: newMessage,
//                             userId: localStorage.getItem('userId'),
//                             authorId: blog.author._id,
//                             blogId: id
//                           };
//                           socket.emit('send_message', messageData);
//                           // setMessages(prev => [...prev, { text: newMessage, sender: 'user' }]);
//                           setNewMessage('');
//                         }
//                       }}
//                       className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//         </div>

//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react"; // Add useRef here
import { useParams } from "react-router-dom";
import { FiMoon, FiSun, FiArrowLeft, FiMapPin, FiUser } from "react-icons/fi";

import axios from "axios";
import io from "socket.io-client";
import ChatBox from "./ViewDetailsComponents/ChatBox";
import WeatherBox from "./ViewDetailsComponents/WeatherBox";
import GalleryBox from "./ViewDetailsComponents/GalleryBox";
import InsightsTab from "./ViewDetailsComponents/InsightsTab";
import BlogSlideShow from "./ViewDetailsComponents/BlogSlideshow";
import SideBar from "./ViewDetailsComponents/SideBar";
import Overview from "./ViewDetailsComponents/Overview";

const API_URL = "http://localhost:5000/api/blogs";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = "3acf46f3b2b85194cc6fe10182fe807a";

export default function ViewDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [analysis, setAnalysis] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  const messagesEndRef = useRef(null);
  const SOCKET_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        console.log("Blog data:", response.data.blog);
        if (!response.data.blog) throw new Error("Blog not found!");

        setBlog(response.data.blog);

        if (response.data.blog.content) {
          try {
            const aiResponse = await axios.post("http://localhost:5000/api/gemini/analyze", {
              blogContent: response.data.blog.content,
            });
            const result = await aiResponse.data;
            setAnalysis([result]);
          } catch (aiError) {
            console.error("AI Analysis Error:", aiError.response?.data || aiError.message);
          }
        }

        if (response.data.blog.location) {
          const weatherRes = await axios.get(WEATHER_API_URL, {
            params: { q: response.data.blog.location, appid: WEATHER_API_KEY, units: "metric" }
          });
          setWeather(weatherRes.data);
        }

      } catch (error) {
        setError("Failed to load blog details. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    if (blog?.author?._id) {
      newSocket.emit('join', {
        userId: localStorage.getItem('userId'),
        authorId: blog.author._id,
        blogId: id
      });
    }

    newSocket.on('receive_message', (message) => {
      // Check if message is from blog author
      const isFromAuthor = message.userId === blog.author._id || message.userId === blog._id;

      setMessages(prev => [...prev, {
        text: message.text,
        sender: isFromAuthor ? 'author' : 'user'
      }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [blog?.author?._id, id]);


  useEffect(() => {
    const fetchMessages = async () => {
      if (blog?.author?._id && activeTab === "chat") {
        try {
          const response = await axios.get(`http://localhost:5000/api/chat/blog-messages/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          const formattedMessages = response.data.map(msg => {
            // Check if sender matches either blog ID or author ID
            const isAuthor = msg.sender === blog._id || msg.sender === blog.author._id;

            console.log('Message details:', {
              msgSender: msg.sender,
              blogId: blog._id,
              authorId: blog.author._id,
              isAuthor: isAuthor
            });

            return {
              text: msg.content,
              sender: isAuthor ? 'author' : 'user'
            };
          });

          setMessages(formattedMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [blog?.author?._id, id, activeTab]);




  // // Update socket message handler as well
  // useEffect(() => {
  //     const newSocket = io(SOCKET_URL);
  //     setSocket(newSocket);

  //     if (blog?.author?._id) {
  //         newSocket.emit('join', {
  //             userId: localStorage.getItem('userId'),
  //             authorId: blog.author._id,
  //             blogId: id
  //         });
  //     }

  //     newSocket.on('receive_message', (message) => {
  //         // Check if message is from blog author or matches blog ID
  //         const isFromAuthor = message.userId === blog.author._id || message.userId === blog._id;

  //         setMessages(prev => [...prev, {
  //             text: message.text,
  //             sender: isFromAuthor ? 'author' : 'user'
  //         }]);
  //     });

  //     return () => {
  //         newSocket.disconnect();
  //     };
  // }, [blog?.author?._id, id]);



  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  if (loading) return (
    <div className={`flex flex-col gap-6 items-center justify-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-emerald-50 to-teal-100"}`}>
      <div className="w-16 h-16 relative">
        <div className="w-full h-full rounded-full border-4 border-emerald-200 border-t-emerald-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
      </div>
      <p className="text-xl font-medium text-emerald-700 dark:text-emerald-300">Unpacking your adventure...</p>
    </div>
  );

  if (error || !blog) return (
    <div className={`flex items-center justify-center min-h-screen p-4 ${darkMode
      ? "bg-gray-900 text-gray-100"
      : "bg-gradient-to-t from-emerald-700 to-emerald-50 text-gray-800"
      }`}>
      <div className="text-center max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 transform transition-all">
        <div className="text-red-500 text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold mb-3  ">{!blog ? "Journey Not Found" : "Error"}</h2>
        <p className="text-gray-600 dark:text-gray-300">{error || "The adventure you're looking for doesn't exist or has been removed."}</p>
        <button
          onClick={() => window.location.href = "/view-blog"}
          className="mt-6 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-md"
        >
          Return to Explorations
        </button>
      </div>
    </div>
  );

  console.log(analysis)

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-t from-emerald-700 to-emerald-50 text-gray-800"}`}>

      <div className="relative h-92 w-full overflow-hidden">

        {blog.images && blog.images.length > 0 ? (
          <BlogSlideShow blog={blog} />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-400"></div>
        )}

        <div className="absolute inset-0 bg-black/30 bg-opacity-20" />

        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <button
            onClick={() => window.location.href = "/view-blog"}
            className={`px-4 py-2 ${darkMode ? 'text-black' : 'text-white'} bg-opacity-40 hover:bg-opacity-60 rounded-lg bg-emerald-500 flex items-center transition-all font-bold`}
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <button
            onClick={toggleDarkMode}
            className={`p-2 ${darkMode ? 'bg-gray-300 text-black' : 'bg-gray-900 text-white'} bg-opacity-40 hover:bg-opacity-60 rounded-xl transition-all`}
          >
            {darkMode ? (
              <FiSun className="w-6 h-6" />
            ) : (
              <FiMoon className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-xl">{blog.title}</h1>

            <div className="flex flex-col  shadow-xs w-2/9 px-5 py-4 rounded-xl  text-white text-sm md:text-base  gap-2 mb-2">


              {blog.location && (
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-emerald-500" />
                  <span className="text-lg">{blog.location}</span>
                </div>
              )}
              {blog.author && (
                <div className="flex text-white text-md items-center ">
                    <FiUser className="text-xl text-emerald-500"/>
                    <span className="text-md md:text-lg ml-2 ">{blog.author.name}</span>
                </div>
              )}
            </div>


          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex relative items-start mx-auto px-4 py-6">

        <SideBar
          blog={blog}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          weather={weather}
        />

        <div className="space-y-6 ml-6">
          {activeTab === "overview" && (
            <Overview
              darkMode={darkMode}
              blog={blog}
            />
          )}

          {activeTab === "insights" && analysis.length > 0 && (
            <InsightsTab
              darkMode={darkMode}
              analysis={analysis}
            />
          )}

          {activeTab === "gallery" && (
            <GalleryBox
              blog={blog}
              darkMode={darkMode}
            />
          )}

          {activeTab === "weather" && weather && (
            <WeatherBox
              darkMode={darkMode}
              weather={weather}
              blog={blog}
            />
          )}

          {activeTab === "chat" && blog?.author?._id && blog.author._id !== localStorage.getItem('userId') && (
            <ChatBox
              blog={blog}
              darkMode={darkMode}
              messages={messages}
              setMessages={setMessages}
              setNewMessage={setNewMessage}
              newMessage={newMessage}
              socket={socket}
            />
          )}
        </div>
      </div>
    </div>
  );
}
