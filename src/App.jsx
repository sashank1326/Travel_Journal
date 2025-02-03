// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   return (
//     <>
//       <div className='text-blue-700'>
//        App
//       </div>
//     </>
//   )
// }

// export default App

import React from "react";
import WelcomePage from "./components/WelcomePage"  // Adjust the path if necessary

function App() {
  return (
    <div className="App">
      <WelcomePage />  {/* Render the WelcomePage component */}
    </div>
  );
}

export default App;
