// import React from "react";
// import image from '../../public/images/logo.jpg'
// import { Link } from "react-router-dom";

// const WelcomePage = () => {
//   const [visitorCount, setVisitorCount] = useState(0);

//   // Increase visitor count when the page loads
//   useEffect(() => {
//     const count = localStorage.getItem("visitorCount");
//     const newCount = count ? parseInt(count) + 1 : 1;
//     setVisitorCount(newCount);
//     localStorage.setItem("visitorCount", newCount);
//   }, []);

//   return (
//     <div>
//     <div 
//       className="h-screen w-full flex flex-col  bg-cover bg-center relative  "
//       style={{ backgroundImage: "url('../../public/images/bg1.jpg')" }}
//     >
//      {/* Visitor Counter in Top-Right */}
//      <div className="absolute top-5 right-5 bg-black text-white px-4 py-2 rounded-full text-lg shadow-lg">
//         Visitors: {visitorCount}
//       </div>
      
//       <div className="flex flex-col items-center bg-cover bg-center ">
//       <div className="relative z-10 flex mt-45 flex-row items-center gap-8">
//       <img 
//           src={image} 
//           alt="Logo"
//           className="w-32 h-32 object-contain mb-4 rounded-md"
//         />
//         <div className="flex items-center flex-col">
//         <h1 className="text-black text-5xl font-bold">Travel Journal</h1>
//         <p className="text-white text-lg">Travel To Live, Live To Travel</p>
//         </div>
        
//       </div>
      
//       {/* <div className="relative z-10 mt-10 flex gap-5">
//         <button className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign In</button>
//         <button className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign Up</button>

//       </div> */}
//       <div className="relative z-10 mt-10 flex gap-5">
//         <Link to="/signin" className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign In</Link>
//         <Link to="/signup" className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign Up</Link>
//       </div>


//     </div>
//     <p className="bottom-20 text-white text-4xl  fixed left-0 right-0 text-center">Description</p>
//     </div> 
//     </div>
//   );
// };

// export default WelcomePage;


import React, { useEffect, useState } from "react";
import image from '../../public/images/logo.jpg';
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const count = localStorage.getItem("visitorCount");
    let newCount = count ? parseInt(count) : 0;

    // Check if the user has already visited in this session
    if (!sessionStorage.getItem("visited")) {
      newCount += 1; // Increase count only if it's a new session
      localStorage.setItem("visitorCount", newCount);
      sessionStorage.setItem("visited", "true"); // Mark session as visited
    }

    setVisitorCount(newCount);
  }, []);

  return (
    <div>
      <div 
        className="h-screen w-full flex flex-col bg-cover bg-center relative"
        style={{ backgroundImage: "url('../../public/images/bg1.jpg')" }}
      >
        
        {/* Visitor Counter in Top-Right */}
        <div className="absolute top-5 right-5 text-black px-4 py-2 ">
          <strong>Visitors :</strong> <strong>{visitorCount}</strong>
        </div>

        <div className="flex flex-col items-center bg-cover bg-center ">
          <div className="relative z-10 flex mt-45 flex-row items-center gap-8">
            <img src={image} alt="Logo" className="w-32 h-32 object-contain mb-4 rounded-md"
            />
            <div className="flex items-center flex-col">
              <h1 className="text-black text-5xl font-bold">Travel Journal</h1>
              <p className="text-white text-lg">Travel To Live, Live To Travel</p>
            </div>
          </div>

          <div className="relative z-10 mt-10 flex gap-5">
            <Link to="/signin" className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign In</Link>
            <Link to="/signup" className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign Up</Link>
          </div>
        </div>
        <p className="bottom-20 text-white text-3xl fixed left-0 right-0 text-center">One day your life will flash before your eyes</p>
        <p className="bottom-10 text-white text-3xl fixed left-0 right-0 text-center">Make sure it's worth watching.</p>
      </div> 
    </div>
  );
};

export default WelcomePage;

