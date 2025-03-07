// // import React from "react";
// // import { Link } from "react-router-dom";

// // const SignIn = () => {
// //   return (
// //     <div className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center backdrop-blur-lg"
// //       style={{ backgroundImage: "url('../../public/images/bg2.jpg')" }}
// //     >
// //       {/* App Name in Top Left */}
// //       <div className="absolute top-4 left-4">
// //         <Link to="/" 
// //           className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-red-400  hover:scale-105 transition-all duration-300"
// //         >Travel Journal</Link>
// //       </div>

// //       <div className="bg-white-0 p-8 rounded-lg shadow-lg w-96">
// //         <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
        
// //         <form>
// //           <input type="text" placeholder="Name" className="w-full p-2 mb-4 border rounded" />
// //           <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" />

// //           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
// //         </form>

// //         {/* Redirect to Sign Up Page */}
// //         <p className="text-center mt-4 text-gray-600">
// //           <strong>Don't have an account?</strong>{" "}
// //           <Link to="/signup" className="text-white font-bold hover:underline">Create one</Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignIn;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import image from '../../public/images/logo.jpg';

// const SignIn = () => {
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       alert("Sign In Successful!");
//     }, 2000);
//   };

//   return (
//     <div className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center backdrop-blur-lg"
//       style={{ backgroundImage: "url('../../public/images/bg2.jpg')" }}
//     >
//       {/* App Name in Top Left */}
//       <div className="absolute top-4 left-4">
//       <Link to="/" 
//            className="text-3xl font-extrabold flex gap-4 items-center"
//          > <img src={image} alt="Logo" className="w-18 h-18 object-contain mb rounded-md"
//          />Travel Journal</Link>
//        </div>

//       <div className="backdrop-blur-3xl p-8 rounded-lg shadow-black shadow-2xl w-96">
//         <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="Name" className="w-full p-2 mb-4 border rounded" required />

//           <div className="relative">
//             <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full p-2 mb-4 border rounded"
//               value={password} onChange={(e) => setPassword(e.target.value)} required />
//             <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? "🙈" : "👁️"}
//             </span>
//           </div>

//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center"
//             disabled={loading}>
//             {loading ? "⏳ Signing In..." : "Submit"}
//           </button>
//         </form>

//         <p className="text-center mt-4 text-gray-600">
//           <strong>Don't have an account?</strong>{" "}
//           <Link to="/signup" className="text-white font-bold hover:underline">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../public/images/logo.jpg";
import { signin } from "../api/authService"; // Import API function

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await signin(formData);
      localStorage.setItem("token", res.data.token); // Store token
      alert("Sign In Successful!");
      navigate("/dashboard"); // Redirect after login (change this route as needed)
    } catch (err) {
      setError(err.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center backdrop-blur-lg"
      style={{ backgroundImage: "url('../../public/images/bg2.jpg')" }}>
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-3xl font-extrabold flex gap-4 items-center">
          <img src={image} alt="Logo" className="w-18 h-18 object-contain mb rounded-md" />
          Travel Journal
        </Link>
      </div>
      <div className="backdrop-blur-3xl p-8 rounded-lg shadow-black shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" className="w-full p-2 mb-4 border rounded" value={formData.name} onChange={handleChange} required />

          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full p-2 mb-4 border rounded"
              value={formData.password} onChange={handleChange} required />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center" disabled={loading}>
            {loading ? "⏳ Signing In..." : "Submit"}
          </button>

          <p className="text-center mt-4 text-gray-600">
          {/* <strong>Forgot Password?</strong>{" "} */}
          <Link to="/forgot-password" className="text-white font-bold hover:underline">Forgot Password?</Link>
        </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

