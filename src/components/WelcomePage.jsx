// import React, { useEffect, useState } from "react";
// import image from '../../public/images/logo.jpg';
// import { Link } from "react-router-dom";

// const WelcomePage = () => {
//   const [visitorCount, setVisitorCount] = useState(0);

//   useEffect(() => {
//     const count = localStorage.getItem("visitorCount");
//     let newCount = count ? parseInt(count) : 0;

//     // Check if the user has already visited in this session
//     if (!sessionStorage.getItem("visited")) {
//       newCount += 1; // Increase count only if it's a new session
//       localStorage.setItem("visitorCount", newCount);
//       sessionStorage.setItem("visited", "true"); // Mark session as visited
//     }

//     setVisitorCount(newCount);
//   }, []);

//   return (
//     <div>
//       <div 
//         className="h-screen w-full flex flex-col bg-cover bg-center relative"
//         style={{ backgroundImage: "url('../../public/images/bg1.jpg')" }}
//       >
        
//         {/* Visitor Counter in Top-Right */}
//         <div className="absolute top-5 right-5 text-black px-4 py-2 ">
//           <strong>Visitors :</strong> <strong>{visitorCount}</strong>
//         </div>

//         <div className="flex flex-col items-center bg-cover bg-center ">
//           <div className="relative z-10 flex mt-45 flex-row items-center gap-8">
//             <img src={image} alt="Logo" className="w-32 h-32 object-contain mb-4 rounded-md"
//             />
//             <div className="flex items-center flex-col">
//               <h1 className="text-black text-5xl font-bold">Travel Journal</h1>
//               <p className="text-white text-lg">Travel To Live, Live To Travel</p>
//             </div>
//           </div>

//           <div className="relative z-10 mt-10 flex gap-5">
//             <Link to="/signin" className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign In</Link>
//             <Link to="/signup" className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign Up</Link>
//           </div>
//         </div>
//         <p className="bottom-20 text-white text-3xl fixed left-0 right-0 text-center">One day your life will flash before your eyes</p>
//         <p className="bottom-10 text-white text-3xl fixed left-0 right-0 text-center">Make sure it's worth watching.</p>
//       </div> 
//     </div>
//   );
// };

// export default WelcomePage;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import image from "/images/logo.jpg";

export default function WelcomePage() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const count = localStorage.getItem("visitorCount");
    let newCount = count ? parseInt(count) : 0;
    if (!sessionStorage.getItem("visited")) {
      newCount += 1;
      localStorage.setItem("visitorCount", newCount);
      sessionStorage.setItem("visited", "true");
    }
    setVisitorCount(newCount);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <img 
        src="/images/bg3.jpg" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t backdrop-blur-[1px]"></div>
      <motion.div 
        className="absolute top-5 text-sm right-5 text-gray-800 px-4 py-2  bg-opacity-50 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <strong>Visitors:</strong> {visitorCount}
      </motion.div>

      <motion.div 
        className="relative  z-10 flex flex-col items-center text-center text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img 
          src={image} 
          alt="Logo" 
          className="w-32 h-32 object-contain mb-4 rounded-md shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        <h1 className="text-5xl font-extrabold drop-shadow-lg">Travel Journal</h1>
        <p className="text-xl mt-2 text-gray-300">Travel To Live, Live To Travel</p>

        <div className="flex gap-5 mt-8">
          <motion.div whileHover={{ scale: 1.1, rotate: 2 }}>
            <Link to="/signin" className="px-6 py-2 bg-white text-black rounded-xl text-lg shadow-lg hover:bg-gray-300 transition duration-300 shadow-gray-900">Sign In</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: -2 }}>
            <Link to="/signup" className="px-6 py-2 bg-white shadow-gray-900 text-black rounded-xl text-lg shadow-lg hover:bg-gray-300 transition duration-300">Sign Up</Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.p 
        className="absolute bottom-20 text-white text-3xl text-center w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        "One day your life will flash before your eyes."
      </motion.p>
      <motion.p 
        className="absolute bottom-10 text-white text-3xl text-center w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        Make sure it's worth watching.
      </motion.p>
    </div>
  );
};
