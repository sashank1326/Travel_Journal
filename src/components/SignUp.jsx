

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import image from "../../public/images/logo.jpg";
// import { signup } from "../api/authService"; // Import API function

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//     if (e.target.name === "password") {
//       const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
//       const numberRegex = /[0-9]/;

//       if (!specialCharRegex.test(e.target.value) || !numberRegex.test(e.target.value)) {
//         setPasswordError("Password must contain at least one special character and one number.");
//       } else {
//         setPasswordError("");
//       }
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }
//     setLoading(true);
    
//     try {
//       await signup({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//       });
//       // alert("Sign Up Successful!");
//       navigate("/signin"); // Redirect to Sign In page
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center backdrop-blur-lg"
//       style={{ backgroundImage: "url('../../public/images/bg2.jpg')" }}>
      
//       {/* 🔹 Fixed Logo Size & Position */}
//       <div className="absolute top-4 left-4">
//         <Link to="/" className="text-4xl font-extrabold flex gap-4 items-center">
//           <img src={image} alt="Logo" className="w-16 h-16 object-contain rounded-md" />
//           Travel Journal
//         </Link>
//       </div>

//       <div className="backdrop-blur-3xl p-8 rounded-xl shadow-black shadow-2xl w-96 ">
//         <h2 className="text-4xl font-bold text-center mb-6">Sign Up</h2>

//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Name" className="w-full p-2 mb-4 border rounded" value={formData.name} onChange={handleChange} required />
//           <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" value={formData.email} onChange={handleChange} required />
//           <input type="phone" name="phone" placeholder="Phone Number" className="w-full p-2 mb-4 border rounded" value={formData.phone} onChange={handleChange} required />

//           <div className="relative">
//             <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full p-2 mb-2 border rounded"
//               value={formData.password} onChange={handleChange} required />
//             <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? "🙈" : "👁️"}
//             </span>
//           </div>
//           {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}

//           <div className="relative">
//             <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 mb-2 border rounded"
//               value={formData.confirmPassword} onChange={handleChange} required />
//             <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//               {showConfirmPassword ? "🙈" : "👁️"}
//             </span>
//           </div>
//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center" disabled={loading}>
//             {loading ? "⏳ Signing Up..." : "Submit"}
//           </button>
//         </form>

//         <p className="text-center mt-4 text-gray-600">
//           <strong>Already have an account?</strong>{" "}
//           <Link to="/signin" className="text-white font-bold hover:underline">Sign In</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../public/images/logo.jpg";
import { signup } from "../api/authService";
import { FaMapMarkedAlt, FaPen, FaUser } from "react-icons/fa";


export default function SignUp({isPopup=false, setShowLoginPopup, onClose, setShowSignupPopup}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const numberRegex = /[0-9]/;

      if (!specialCharRegex.test(e.target.value) || !numberRegex.test(e.target.value)) {
        setPasswordError("Password must contain at least one special character and one number.");
      } else {
        setPasswordError("");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (isPopup && onClose) {
        setShowLoginPopup(true)
        setShowSignupPopup(false)
      }

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center o">

      <div className="bg-emerald-600 text-white p-8 rounded-xl flex flex-col justify-center">
        <h3 className="text-3xl font-bold mb-6">Start Your Journey Today!</h3>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-emerald-500 p-2 rounded-full mr-4">
              <FaPen />
            </div>
            <div>
              <h4 className="font-bold text-xl">Document Your Adventures</h4>
              <p className="text-emerald-100">Create beautiful travel journals to remember every moment of your journey.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-emerald-500 p-2 rounded-full mr-4">
              <FaUser />
            </div>
            <div>
              <h4 className="font-bold text-xl">Connect with Travelers</h4>
              <p className="text-emerald-100">Join a community of passionate travelers and share your experiences.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-emerald-500 p-2 text-xl rounded-full mr-4">
              <FaMapMarkedAlt />
            </div>
            <div>
              <h4 className="font-bold text-xl">Discover New Places</h4>
              <p className="text-emerald-100">Find hidden gems and travel inspiration from other adventurers.</p>
            </div>
          </div>
        </div>


      </div>

      <div className="flex mx-4 justify-center rounded-xl overflow-hidden ">
        <div className="p-2">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-4xl text-center font-bold mb-6 merienda text-gray-800">Sign Up</h2>
            <div className="border-b-4 w-1/2 text-emerald-500" />
          </div>
          <form onSubmit={handleSubmit} className="">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-4 py-3 border-1 mb-4 border-gray-400 rounded-full transition-all duration-300 focus:ring-emerald-800"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border-1 mb-4 border-gray-400 rounded-full transition-all duration-300 focus:ring-emerald-800"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="phone"
              name="phone"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border-1 mb-4 border-gray-400 rounded-full transition-all duration-300 focus:ring-emerald-800"
              value={formData.phone} onChange={handleChange}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border-1 mb-4 border-gray-400 rounded-full transition-all duration-300 focus:ring-emerald-800"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border-1 mb-4 border-gray-400 rounded-full transition-all duration-300 focus:ring-emerald-800"
                value={formData.confirmPassword}
                onChange={handleChange}
                required />
              <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {error && <p className="text-red-500 text-center text-md mb-4">{error}</p>}

            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105" disabled={loading}>
              {loading ? "⏳ Signing Up..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-4 text-black">
            Already have an account?{" "}
            <button
              onClick={() => {
                setShowLoginPopup(true)
                setShowSignupPopup(false)
              }}
              className="cursor-pointer text-emerald-500  hover:underline">Login</button>
          </p>
        </div>

      </div>

    </div>
  );
}