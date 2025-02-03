// import React, { useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import LoginComponent from "./pages/Login";
// import Home from "./pages/Home";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useState } from "react";
// import { auth } from "./components/firebase";

// function App() {
//   const [user, setUser] = useState();
//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });
//   });
//   return (
//     <Router>
//       <div className="App">
//         <div className="auth-wrapper">
//           <div className="auth-inner">
//             {/* <Routes>
//               <Route
//                 path="/"
//                 element={user ? <Navigate to="/profile" /> : <LoginComponent />}
//               />
//               <Route path="/login" element={<LoginComponent />} />
//               <Route path="/home" element={<Home />} />
//             </Routes> */}
//             <Routes>
//             <Route path="/" element={user ? <Navigate to="/home" /> : <LoginComponent />}/>
//             <Route path="/login" element={<LoginComponent />} />
//             <Route path="/home" element={<Home />} />
//             </Routes>
//             <ToastContainer />
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import LoginComponent from "./pages/Login";
// import Home from "./pages/Home";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { auth } from "./components/firebase";

// function App() {
//   const [user, setUser] = useState(null); // Initialize user state as null for clarity

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       setUser(currentUser);
//     });

//     // Cleanup the subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   return (
//     <Router>
//       <div className="App">
//         <div className="auth-wrapper">
//           <div className="auth-inner">
//             <Routes>
//               {/* Redirect user based on authentication state */}
//               <Route
//                 path="/"
//                 element={user ? <Navigate to="/home" replace /> : <LoginComponent />}
//               />
//               <Route path="/login" element={<LoginComponent />} />
//               <Route
//                 path="/home"
//                 element={user ? <Home /> : <Navigate to="/login" replace />}
//               />
//             </Routes>
//             <ToastContainer />
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./pages/Login";
import Admin from "./pages/Admin";
import User from "./pages/User";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Check if the user is authenticated and their role
  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  return (
    <Router>
      {/* Toast notifications */}
      <ToastContainer />

      <Routes>
        {/* Login Route (accessible to everyone) */}
        <Route path="/login" element={<LoginComponent />} />

        {/* Admin Route (accessible only to authenticated admins) */}
        <Route
          path="/admin"
          element={
            isAuthenticated && userRole === "admin" ? (
              <Admin />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* User Route (accessible only to authenticated users) */}
        <Route
          path="/user"
          element={
            isAuthenticated && userRole === "user" ? (
              <User />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default Route (redirect to login if not authenticated) */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              userRole === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Fallback Route (redirect to login for any unknown paths) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
