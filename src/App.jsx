// import React from "react";
// import WelcomePage from "./components/WelcomePage"  // Adjust the path if necessary

// function App() {
//   return (
//     <div className="App">
//       <WelcomePage />  {/* Render the WelcomePage component */}
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";  
import SignupPage from "./components/SignupPage";  // Import SignupPage
import SignIn from "./components/SignInPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
