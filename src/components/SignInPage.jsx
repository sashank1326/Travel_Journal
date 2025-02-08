import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center backdrop-blur-lg"
      style={{ backgroundImage: "url('../../public/images/bg2.jpg')" }}
    >
      {/* App Name in Top Left */}
      <div className="absolute top-4 left-4">
        <Link to="/" 
          className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-red-400  hover:scale-105 transition-all duration-300"
        >Travel Journal</Link>
      </div>

      <div className="bg-white-0 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
        
        <form>
          <input type="text" placeholder="Name" className="w-full p-2 mb-4 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
        </form>

        {/* Redirect to Sign Up Page */}
        <p className="text-center mt-4 text-gray-600">
          <strong>Don't have an account?</strong>{" "}
          <Link to="/signup" className="text-white font-bold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
