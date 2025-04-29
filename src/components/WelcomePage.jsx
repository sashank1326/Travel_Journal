
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import image from "/images/logo.jpg";

// export default function WelcomePage() {
//   const [visitorCount, setVisitorCount] = useState(0);

//   useEffect(() => {
//     const count = localStorage.getItem("visitorCount");
//     let newCount = count ? parseInt(count) : 0;
//     if (!sessionStorage.getItem("visited")) {
//       newCount += 1;
//       localStorage.setItem("visitorCount", newCount);
//       sessionStorage.setItem("visited", "true");
//     }
//     setVisitorCount(newCount);
//   }, []);

//   return (
//     <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
//       <img 
//         src="/images/bg3.jpg" 
//         alt="Background" 
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t backdrop-blur-[1px]"></div>
//       <motion.div 
//         className="absolute top-5 text-sm right-5 text-gray-800 px-4 py-2  bg-opacity-50 rounded-lg"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5 }}
//       >
//         <strong>Visitors:</strong> {visitorCount}
//       </motion.div>

//       <motion.div 
//         className="relative  z-10 flex flex-col items-center text-center text-white"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <motion.img 
//           src={image} 
//           alt="Logo" 
//           className="w-32 h-32 object-contain mb-4 rounded-md shadow-lg"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5 }}
//         />
//         <h1 className="text-5xl font-extrabold drop-shadow-lg">Travel Journal</h1>
//         <p className="text-xl mt-2 text-gray-300">Travel To Live, Live To Travel</p>

//         <div className="flex gap-5 mt-8">
//           <motion.div whileHover={{ scale: 1.1, rotate: 2 }}>
//             <Link to="/signin" className="px-6 py-2 bg-white text-black rounded-xl text-lg shadow-lg hover:bg-gray-300 transition duration-300 shadow-gray-900">Sign In</Link>
//           </motion.div>
//           <motion.div whileHover={{ scale: 1.1, rotate: -2 }}>
//             <Link to="/signup" className="px-6 py-2 bg-white shadow-gray-900 text-black rounded-xl text-lg shadow-lg hover:bg-gray-300 transition duration-300">Sign Up</Link>
//           </motion.div>
//         </div>
//       </motion.div>

//       <motion.p 
//         className="absolute bottom-20 text-white text-3xl text-center w-full"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1.2 }}
//       >
//         "One day your life will flash before your eyes."
//       </motion.p>
//       <motion.p 
//         className="absolute bottom-10 text-white text-3xl text-center w-full"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1.5 }}
//       >
//         Make sure it's worth watching.
//       </motion.p>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { Typewriter } from 'react-simple-typewriter';
import ForgotPassword from "./ForgotPassword";


export default function WelcomePage() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  useEffect(() => {
    const count = localStorage.getItem("visitorCount");
    let newCount = count ? parseInt(count) : 0;
    if (!sessionStorage.getItem("visited")) {
      newCount += 1;
      localStorage.setItem("visitorCount", newCount);
      sessionStorage.setItem("visited", "true");
    }
    setVisitorCount(newCount);
    setTimeout(() => setLoaded(true), 300);
  }, []);

  const closePopups = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(false);
    setShowForgot(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/introVideo.mp4" type="video/mp4" />

      </video>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute z-20 top-4 w-full flex flex-col">
        <div className={` flex text-white justify-between px-4 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}>
          <h1 className="relative text-5xl lobster-regular font-medium ml-14 drop-shadow-md ">Travel <span>Journal</span></h1>
          <p className="absolute top-12 text-[1.4rem] lobster-regular left-55">- Travel to Live, Live to Travel</p>
          <div className="flex gap-3 mb-12 mr-33">
            <button
              onClick={() => {
                setShowLoginPopup(true);
                setShowSignupPopup(false);
              }}
              className="relative group drop-shadow-lg drop-shadow-black border-emerald-500 px-8 py-3 uppercase text-white rounded-full text-lg transition duration-300 "
            >
              Login
              <span className="absolute left-8 bottom-2 h-[2px] w-0 bg-emerald-600 transition-all duration-300 group-hover:w-[45%]"></span>
            </button>
            <button
              onClick={() => {
                setShowSignupPopup(true);
                setShowLoginPopup(false);
              }}
              className="px-9 py-2 uppercase bg-emerald-500 text-black rounded-full text-lg  hover:bg-gray-200 transition duration-300"
            >
              Sign Up
            </button>
          </div>

        </div>
        <div className={`flex items-center justify-center w-md mt-30 ml-25  text-white transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>

          <h1 className="text-6xl font-medium drop-shadow-2xl text-gray-100">
            <Typewriter
              words={[
                "Life is short and the world is wide.",
                "Let your journey tell the story.",
                "Collect memories, not things.",
                "Every destination begins with a single step.",
                "Write your adventures. Live your pages."
              ]}
              loop={0} // Infinite loop
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={3000}
            />
          </h1>
        </div>
      </div>


      <div className={`absolute top-6 right-6 text-sm text-white px-4 py-2 bg-opacity-40 rounded-full transition-all duration-700 ${loaded ? 'opacity-80' : 'opacity-0'}`}>
        <strong>Visitors:</strong> {visitorCount}
      </div>

      {showLoginPopup && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="absolute inset-0  bg-black/70" onClick={closePopups}></div>
          <div className="fixed top-30  rounded-4xl pt-10 shadow-2xl bg-gray-200 z-10 transform transition-all duration-100 scale-100 max-w-sm w-full">
            <div className=" absolute top-3 right-4 flex justify-end  text-xl ">
              <button onClick={closePopups} className="border-1 px-3 text-2xl py- rounded-xl text-gray-700 hover:text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 duration-50">
                x
              </button>
            </div>
            <div className=" pb-6">
              <Login isPopup={true} setShowLoginPopup={setShowLoginPopup} setShowForgot={setShowForgot}
                setShowSignupPopup={setShowSignupPopup} onClose={closePopups} />
            </div>
          </div>
        </div>
      )}

      {showSignupPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/70" onClick={closePopups}></div>
          <div className="bg-gray-200 rounded-xl shadow-2xl z-10 transform transition-all duration-300 scale-100 max-w-4xl w-full mx-4 overflow-hidden">
            <div className=" absolute top-3 right-4 flex justify-end  text-xl ">
              <button onClick={closePopups} className="border-1 px-3 text-2xl py- rounded-xl text-gray-700 hover:text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 duration-50">
                x
              </button>
            </div>
            <div className="flex w-full">
              {/* Form section */}
              <div className="p-6 pt-17">
                <SignUp setShowLoginPopup={setShowLoginPopup}
                  setShowSignupPopup={setShowSignupPopup} isPopup={true} onClose={closePopups} />
              </div>
            </div>
          </div>
        </div>
      )}

      {showForgot && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="absolute inset-0  bg-black/70" onClick={closePopups}></div>
          <div className="fixed top-30  rounded-4xl pt-10 shadow-2xl bg-gray-200 z-10 transform transition-all duration-100 scale-100 max-w-sm w-full">
            <div className=" absolute top-3 right-4 flex justify-end  text-xl ">
              <button onClick={closePopups} className="border-1 px-3 text-2xl py- rounded-xl text-gray-700 hover:text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 duration-50">
                x
              </button>
            </div>
            <div className=" pb-6">
              <ForgotPassword isPopup={true} setShowLoginPopup={setShowLoginPopup}
                setShowForgot={setShowForgot} onClose={closePopups} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}