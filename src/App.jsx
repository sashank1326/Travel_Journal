// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import WelcomePage from "./components/WelcomePage";  
// import SignupPage from "./components/SignupPage";  
// import SignIn from "./components/SignInPage";
// import Dashboard from "./components/Dashboard"; // Import Dashboard Component

// function App() { 
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<WelcomePage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard Route */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";  
import SignupPage from "./components/SignupPage";  
import SignIn from "./components/SignInPage";
import Dashboard from "./components/dashboard";  
import ForgotPassword from "./components/ForgotPassword";
import CreateBlog from "./components/CreateBlog";




function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-blog" element={<CreateBlog />} />

      </Routes>
    </Router>
  );
}

export default App;
