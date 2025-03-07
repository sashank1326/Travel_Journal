// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/signin");
//         return;
//       }

//       try {
//         const response = await axios.get("http://localhost:5000/api/user", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(response.data);
//       } catch (err) {
//         setError("Failed to load user data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/signin");
//   };

//   if (loading) return <p className="text-center text-lg">Loading...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;

//   return (
//     <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//         <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
//         <p className="text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
//         <p className="text-gray-700 mb-2"><strong>Phone:</strong> {user.phone}</p>

//         <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from "react";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
    </div>
  );
};

export default Dashboard;