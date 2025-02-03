import React from "react";
import image from '../../public/images/logo.jpg'

const WelcomePage = () => {
  return (
    <div>
    <div 
      className="h-screen w-full flex flex-col  bg-cover bg-center relative gap-0 "
      style={{ backgroundImage: "url('../../public/images/bg1.jpg')" }}
    >
     
      <div className="flex flex-col items-center bg-cover bg-center ">
      <div className="relative z-10 flex mt-45 flex-row items-center gap-8">
      <img 
          src={image} 
          alt="Logo"
          className="w-32 h-32 object-contain mb-4 rounded-md"
        />
        <div className="flex items-center flex-col">
        <h1 className="text-black text-5xl font-bold">Travel Journal</h1>
        <p className="text-white text-lg">Travel To Live, Live To Travel</p>
        </div>
        
      </div>
      
      <div className="relative z-10 mt-10 flex gap-5">
        <button className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign In</button>
        <button className="px-6 py-2 bg-white text-black rounded-full text-lg">Sign Up</button>

      </div>
      
    </div>
    <p className="bottom-20 text-white text-4xl  fixed left-0 right-0 text-center">Description</p>
    </div> 
    </div>
  );
};

export default WelcomePage;