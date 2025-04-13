import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import logo from "../../public/images/logo.jpg";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


export default function Navbar({ darkMode, userName, bio, phoneNumber, email, setDarkMode, pages }) {
    const [showProfile, setShowProfile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();

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
      }
    
    let navLinks = [];
    if (pages === "Home") {
        navLinks = ["My Blogs"];
    } else if (pages === "My Blogs") {
        navLinks = ["Home", "Create Blog", "View Blogs"];
    } else if (pages === "Create Blog") {
        navLinks = ["Home", "View Blogs", "My Blogs"];
    } else if (pages === "View Blogs") {
        navLinks = ["Home", "Create Blog", "My Blogs"];
    }

    const links = {
        "Home": "/dashboard",
        "My Blogs": "/my-blogs",
        "Create Blog": "/create-blog",
        "View Blogs": "/view-blog"
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileRef]);

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="sticky top-0 left-0 right-0 flex justify-center z-50 px-0">
            <nav className={`w-full max-w-[89rem] hover:shadow-md flex justify-between items-center py-2 px-3 rounded- transition-all duration-100 ${
                darkMode 
                    ? "bg-gray-900 shadow-sm shadow-gray-300" 
                    : "bg-white shadow-sm  shadow-black"
            } backdrop-blur-md`}>
                <Link to="/dashboard" className={`flex items-center gap-3 text-xl md:text-2xl lg:text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-800"
                }`}>
                    <img src={logo} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-md" />
                    <span className="hidden sm:block">Travel Journal</span>
                </Link>
                
                <h1 className={`text-lg md:text-xl lg:text-2xl text-center font-bold hidden sm:block ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                }`}>
                    {pages === "Home" ? `Welcome ${userName}` : pages}
                </h1>
                
                <button 
                    className="block lg:hidden text-2xl p-2"
                    onClick={toggleMobileMenu}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                
                <div className={`hidden lg:flex gap-6 items-center duration-300 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                    {navLinks.map((link, index) => (
                        <Link 
                            key={index} 
                            to={links[link]} 
                            className={` hover:text-emerald-600 hover:underline transition-colors duration-200  font-medium`}
                        >
                            {link}
                            
                        </Link>
                    ))}
                    
                    <div className="relative" ref={profileRef}>
                        <button 
                            onClick={toggleProfile} 
                            className={`hover:text-emerald-600 cursor-pointer font-medium transition-colors duration-200`}
                        >
                            Profile
                        </button>
                        
                        {showProfile && (
                            <div className={`mt-4 absolute z-50 rounded-md right-0 p-4 w-64 shadow-lg ${
                                darkMode 
                                    ? "bg-gray-800 text-white border border-gray-700 shadow-gray-900/50" 
                                    : "bg-white text-gray-800 border border-gray-200 shadow-emerald-100/50"
                            }`}>
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-lg">{userName}</p>
                                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{bio}</p>
                                    <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} truncate overflow-hidden`} title={email}>
                                        {email}
                                    </div>
                                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{phoneNumber}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={toggleDarkMode} 
                        className={`p-2 rounded-full transition-colors ${
                            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                        }`}
                    >
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                    
                    <button 
                        onClick={handleLogout} 
                        className={`px-4 py-2 text-white rounded-md transition-colors ${
                            darkMode 
                                ? "bg-red-600 hover:bg-red-700" 
                                : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                        Logout
                    </button>
                </div>
                
                {mobileMenuOpen && (
                    <div className={`fixed inset-0 z-50 flex flex-col pt-20 px-6 pb-6 gap-4 lg:hidden ${
                        darkMode 
                            ? "bg-gray-900 text-white" 
                            : "bg-white text-gray-800"
                    }`}>
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">
                            {pages === "Home" ? `Welcome ${userName}` : pages}
                        </h2>
                         
                        {navLinks.map((link, index) => (
                            <Link 
                                key={index} 
                                to={links[link]} 
                                className={`py-3 px-4 rounded-md text-lg font-medium ${
                                    darkMode 
                                        ? "hover:bg-gray-800 active:bg-gray-700" 
                                        : "hover:bg-gray-100 active:bg-gray-200"
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link}
                            </Link>
                        ))}
                        
                        <button 
                            className={`py-3 px-4 rounded-md text-lg font-medium text-left ${
                                darkMode 
                                    ? "hover:bg-gray-800 active:bg-gray-700" 
                                    : "hover:bg-gray-100 active:bg-gray-200"
                            }`}
                            onClick={toggleProfile}
                        >
                            Profile
                        </button>
                        
                        {showProfile && (
                            <div className={`p-4 rounded-md mb-4 ${
                                darkMode 
                                    ? "bg-gray-800 border border-gray-700" 
                                    : "bg-gray-100 border border-gray-200"
                            }`}>
                                <p className="font-semibold">{userName}</p>
                                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{bio}</p>
                                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} break-words`}>{email}</p>
                                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{phoneNumber}</p>
                            </div>
                        )}
                        
                        <div className="flex gap-4 mt-2">
                            <button 
                                onClick={toggleDarkMode} 
                                className={`flex-1 py-3 px-4 rounded-md font-medium flex items-center justify-center gap-2 ${
                                    darkMode 
                                        ? "bg-gray-800 hover:bg-gray-700" 
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                {darkMode ? (
                                    <>
                                        <Sun size={20} /> 
                                        <span>Light Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon size={20} /> 
                                        <span>Dark Mode</span>
                                    </>
                                )}
                            </button>
                            
                            <button 
                                onClick={handleLogout} 
                                className={`flex-1 py-3 px-4 text-white rounded-md font-medium ${
                                    darkMode 
                                        ? "bg-red-600 hover:bg-red-700" 
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};