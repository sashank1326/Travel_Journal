
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import image from "../../public/images/logo.jpg";
// import { signin } from "../api/authService"; // Import API function

// const SignIn = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const res = await signin(formData);
//       localStorage.setItem("token", res.data.token); // Store token
//       // alert("Sign In Successful!");
//       navigate("/dashboard"); // Redirect after login (change this route as needed)
//     } catch (err) {
//       setError(err.response?.data?.message || "Sign in failed");
//     } finally {
//       setTimeout(()=> {
//         setLoading(false);
//       }, 1000)
      
//     }
//   };

//   if (loading) return (
//     <div className={`flex flex-col gap-8 items-center justify-center min-h-screen`}>
//       <div className="animate-spin rounded-full h-16 w-16  border-b-3 border-t-3 border-emerald-500"></div>
//       <p className="ml-3 text-xl">Loading Travel <span className="text-emerald-500 ">Journey's</span></p>
//     </div>
//   );
 
//   return (
//     <div className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center backdrop-blur-lg"
//       style={{ backgroundImage: "url('../../public/images/bg2.jpg')" }}>
//       <div className="absolute top-4 left-4">
//         <Link to="/" className="text-3xl font-extrabold flex gap-4 items-center">
//           <img src={image} alt="Logo" className="w-18 h-18 object-contain mb rounded-md" />
//           Travel Journal
//         </Link>
//       </div>
//       <div className="backdrop-blur-3xl p-8 rounded-lg shadow-black shadow-2xl w-96">
//         <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Name" className="w-full p-2 mb-4 border rounded" value={formData.name} onChange={handleChange} required />

//           <div className="relative">
//             <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full p-2 mb-4 border rounded"
//               value={formData.password} onChange={handleChange} required />
//             <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? "🙈" : "👁️"}
//             </span>
//           </div>
//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center" disabled={loading}>
//             {loading ? "⏳ Signing In..." : "Submit"}
//           </button>

//           <p className="text-center mt-4 text-gray-600">
//           {/* <strong>Forgot Password?</strong>{" "} */}
//           <Link to="/forgot-password" className="text-white font-bold hover:underline">Forgot Password?</Link>
//         </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../public/images/logo.jpg";
import { signin } from "../api/authService";
import SignUp from "./SignUp";

export default function Login({ isPopup = false, onClose, setShowLoginPopup, setShowSignupPopup, setShowForgot }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signin(formData);
      localStorage.setItem("token", res.data.token);

      if (isPopup && onClose) {
        onClose();
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sign in failed");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  if (loading) return (
    <div className={`flex flex-col gap-8 items-center justify-center ${isPopup ? "py-8" : "min-h-screen bg-gray-100"}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-t-3 border-emerald-500"></div>
      <p className="ml-3 text-xl">Loading Travel <span className="text-emerald-500">Journey's</span></p>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-4xl text-center font-bold mb-6 merienda text-gray-800">Login</h2>
        <div className="border-b-4 w-1/3 mt-2 text-emerald-500" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">

        <div className="mb-4 w-5/6">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="w-full px-4 py-3 border-1 border-gray-400 rounded-full transition-all duration-300 focus:ring-emerald-800"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 w-5/6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-1 border-gray-400 rounded-full transition-all duration-300"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl p-2 text-gray-500 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 w-5/7 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm transition-opacity duration-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-5/6 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          disabled={loading}
        >
          Sign In
        </button>


      </form>
      <div className="mt-6 flex justify-center items-center text-sm">
        <button
          onClick={() => {
            setShowLoginPopup(false)
            setShowForgot(true)
          }}
          className="font-medium transition-colors duration-300 ">
          <span className="text-emerald-500">Forgot Password ?</span>
        </button>
      </div>
      <div className="mt-6 flex justify-center items-center text-sm">
        <button
          onClick={() => {
            setShowLoginPopup(false)
            setShowSignupPopup(true)
          }}
          className="font-medium transition-colors duration-300 ">
          Don't have an account? <span className="text-emerald-500">Sign Up</span>
        </button>
      </div>

    </div>
  );
};