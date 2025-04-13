
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { MapPin, PenSquare } from "lucide-react";
// import Navbar from "./Navbar";
// import blogService from "../api/blogService"; // ✅ Correct default import
// import { getUserDetails } from "../api/authService";
// import { Link } from "react-router-dom"; 

// export default function ViewBlogs() {
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
//   const [userName, setUserName] = useState("User");
//   const [bio, setBio] = useState("Traveler & Explorer");
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filter, setFilter] = useState("all");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlogsAndUser = async () => {
//       try {
//         const userData = await getUserDetails();
//         setUserName(userData.name || "User");
//         setBio(userData.bio || "Traveler & Explorer");

//         const allBlogs = await blogService.getAllBlogs(); // ✅ Uses correct function
//         console.log("📥 Blogs fetched:", allBlogs);
//         setBlogs(Array.isArray(allBlogs) ? allBlogs : []);
//       } catch (error) {
//         console.error("❌ Error fetching blogs or user details:", error.message);
//         navigate("/signin");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogsAndUser();
//   }, [navigate]);

//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("darkMode", newMode);
//   };

//   const filteredBlogs = blogs.filter((blog) => {
//     const matchesSearch =
//       blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       blog.content.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesFilter =
//       filter === "all" || blog.tags?.includes(filter);

//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className={darkMode ? "dark" : ""}>
//       <div className="min-h-screen bg-green-50 dark:bg-green-950 text-gray-800 dark:text-gray-100 transition-colors duration-300">
//         <Navbar
//           darkMode={darkMode}
//           toggleDarkMode={toggleDarkMode}
//           userName={userName}
//           bio={bio}
//         />

//         <div className="px-6 py-4">
//           <h1 className="text-3xl font-bold text-center mb-6">All Travel Blogs</h1>

//           <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
//             <input
//               type="text"
//               placeholder="Search blogs..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//             />

//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//             >
//               <option value="all">All Tags</option>
//               <option value="adventure">#adventure</option>
//               <option value="food">#food</option>
//               <option value="culture">#culture</option>
//               <option value="nature">#nature</option>
//               {/* Add more tags as needed */}
//             </select>
//           </div>

//           {loading ? (
//             <p className="text-center text-lg">Loading blogs...</p>
//           ) : filteredBlogs.length === 0 ? (
//             <p className="text-center text-lg text-gray-500 dark:text-gray-400">
//               No blogs found.
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredBlogs.map((blog) => (
//                 <div
//                   key={blog._id}
//                   className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 transition duration-200 hover:shadow-xl"
//                 >
//                   <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>

//                   <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
//                     <MapPin className="w-4 h-4" />
//                     {blog.location || "Unknown"} |{" "}
//                     {new Date(blog.dateOfTravel).toLocaleDateString()}
//                   </p>

//                   <div className="mt-4 text-right">
//                     <button
//                       className="flex items-center gap-1 text-green-700 dark:text-green-300 hover:underline"
//                       onClick={() => navigate(`/blog/${blog._id}`)}
//                     >
//                       <PenSquare className="w-4 h-4" />
//                       Read More
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect, useRef } from "react";
import { MapPin, PenSquare, Calendar, Search, Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import blogService from "../api/blogService";
import { getUserDetails } from "../api/authService";

export default function ViewBlogs() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [userName, setUserName] = useState("User");
  const [bio, setBio] = useState("Traveler & Explorer");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogsAndUser = async () => {
      try {
        const userData = await getUserDetails();
        setUserName(userData.name);
        setBio(userData.bio || "Traveler & Explorer");
        setPhoneNumber(userData.phone || "Not Provided");
        setEmail(userData.email || "Not Provided");
        setUserName(userData.name || "User");
        setBio(userData.bio || "Traveler & Explorer");

        const allBlogs = await blogService.getAllBlogs();
        const sortedBlogs = Array.isArray(allBlogs)
          ? [...allBlogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : [];

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs: ", error.message);
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsAndUser();
  }, [navigate]);

  const getFormattedDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredAndSortedBlogs = blogs
    .filter((blog) => {
      const matchesSearch = searchQuery === "" ||
        (blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.content?.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter = filter === "all" || blog.tags?.includes(filter);

      const matchesCategory = selectedCategory === "all" ||
        (blog.category === selectedCategory);

      return matchesSearch && matchesFilter && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || b.dateOfTravel) - new Date(a.createdAt || a.dateOfTravel);
        case "oldest":
          return new Date(a.createdAt || a.dateOfTravel) - new Date(b.createdAt || b.dateOfTravel);
      }
    });

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilter("all");
    setSelectedCategory("all");
    setSortBy("newest");
    setShowFilters(false);
  };


  return (
    <div
      className={`min-h-screen ${darkMode
        ? "bg-gray-900 text-gray-100"
        : "bg-gradient-to-b from-blue-50 via-white to-emerald-500 text-gray-800"
        }`}
    >
      <div className="transition-colors py-2 duration-300">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          userName={userName}
          bio={bio}
          phoneNumber={phoneNumber}
          email={email}
          pages={"View Blogs"}
        />
        <div className={`w-full py-17 mt-4 px-4 ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-emerald-500 to-emerald-600"}`}>
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover Amazing <span className="text-black">Travel Stories</span></h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Explore unique destinations, cultural experiences, and adventures from travelers around the world
            </p>

            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search destinations, experiences, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 rounded-full border-none shadow-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-20 top-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-300 overflow-hidden ${showFilters ? "max-h-72" : "max-h-0"}`}>
          <div className={`w-full px-4 py-6 ${darkMode ? "bg-gray-800/80" : "bg-white/90"} shadow-md`}>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium mb-1">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "adventure", "food", "culture", "nature"].map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category
                          ? "bg-emerald-600 text-white"
                          : `${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} hover:bg-gray-300`
                          }`}
                      >
                        {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium mb-1">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`px-3 py-1 rounded-md text-sm ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
                <div className="w-full md:w-auto">
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-1 rounded-md text-sm bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-6 py-8 max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">Loading amazing stories...</p>
            </div>
          ) : filteredAndSortedBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏝️</div>
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">
                No travel stories found for your search
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Try adjusting your filters or search for a different topic
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}>
                {filteredAndSortedBlogs.map((blog, index) => (
                  <div
                    key={blog._id}
                    className={`overflow-hidden rounded-2xl shadow-lg transition-all duration-500 cursor-pointer hover:shadow-2xl transform hover:-translate-y-3 ${darkMode ? "bg-gray-800" : "bg-white"
                      } `}
                    onClick={() => navigate(`/view/${blog._id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={`http://localhost:5000/${blog.images[0]}`}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                          {blog.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold mb-2 line-clamp-1">{blog.title}</h2>
                      </div>

                      <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {blog.content}
                      </p>

                      <div className="flex flex-wrap items-center justify-between mt-4 text-sm">
                        <div className={`flex items-center ${darkMode ? 'text-gray-300': 'text-gray-800'} mb-2`}>
                          <MapPin className="w-4 h-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                          <span className="truncate max-w-[140px]">{blog.location || "Unknown"}</span>
                        </div>

                        <div className={`flex items-center  ${darkMode ? 'text-gray-300': 'text-gray-800'} mb-2`}>
                          <Calendar className="w-4 h-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                          <span>{getFormattedDate(blog.dateOfTravel)}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t justify-center border-gray-200 dark:border-gray-700 flex  items-center">
                        <button
                          className="flex items-center  gap-1 text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-800 dark:hover:text-emerald-300"
                        >
                          Read Story
                          <PenSquare className="w-4 h-4" />
                        </button>


                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}