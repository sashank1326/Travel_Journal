// import React from "react";

// const WelcomePage = () => {
//   return (
//     <div 
//       className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
//       //style={{ backgroundImage: "url('../../public/images/Background.jpeg')" }}
//       style={{ backgroundImage: `url('../../public/images/project3.jpeg')` }}
//     >
//       <div className="absolute top-0 left-0 w-full h-full "></div>
      
//       <div className="relative z-10 flex flex-col items-center">
//         <img 
//           src="../../public/images/logo.jpg" 
//           alt="Logo" 
//           className="w-32 h-32 object-contain mb-4"
//         />
//         <h1 className="text-white text-4xl font-bold">Travel Journal</h1>
//         <p className="text-white text-lg">Travel To Live, Live To Travel</p>
//       </div>
      
//       <div className="relative z-10 mt-10 flex gap-4">
//         <button className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign In</button>
//         <button className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign Up</button>
//       </div>
//     </div>
//   );
// };

// export default WelcomePage;



import React from "react";
import image from '../../public/images/logo.jpg'

const WelcomePage = () => {
  return (
    <div 
      className="h-screen w-full flex flex-col items-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('../../public/images/background.jpeg')" }}
    >
      <div className="absolute top-10 left-0 w-full h-full bg-opacity-50"></div>
      
      <div className="relative z-10 mt-15 flex flex-col items-center">
        <img 
          src={image} 
          alt="Logo"  
          className="w-32 h-32 object-contain mb-4"
        />
        <h1 className="text-white text-4xl font-bold">Travel Journal</h1>
        <p className="text-black text-lg">Travel To Live, Live To Travel</p>
      </div>
      
      <div className="relative z-10 mt-10 flex gap-10">
        <button className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign In</button>
        <button className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign Up</button>
      </div>
    </div>
  );
};

export default WelcomePage;