// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Admin from "./pages/Admin";
// import User from "./pages/Student";
// import LoginComponent from "./pages/Login";

// const clientId = "364948000411-97tnlbleijdq8025vh4vfpqf15o6qmjh.apps.googleusercontent.com";

// function App() {
//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       {/* Wrap everything inside <Router> */}
//       <Router>
//         <ToastContainer />
//         <Routes>
//           <Route path="/login" element={<LoginComponent />} />
//           <Route path="/admin" element={<AdminProtectedRoute />} />
//           <Route path="/user" element={<UserProtectedRoute />} />
//           <Route path="/" element={<RedirectToRole />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </GoogleOAuthProvider>
//   );
// }

// // Protected Admin Route
// const AdminProtectedRoute = () => {
//   const isAuthenticated = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   return isAuthenticated && userRole === "admin" ? <Admin /> : <Navigate to="/login" />;
// };

// // Protected User Route
// const UserProtectedRoute = () => {
//   const isAuthenticated = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   return isAuthenticated && userRole === "user" ? <User /> : <Navigate to="/login" />;
// };

// // Redirect based on role
// const RedirectToRole = () => {
//   const isAuthenticated = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!isAuthenticated) return <Navigate to="/login" />;
//   return userRole === "admin" ? <Navigate to="/admin" /> : <Navigate to="/user" />;
// };

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import LoginComponent from "./pages/Login";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/admin" element={<AdminProtectedRoute />} />
          <Route path="/student" element={<StudentProtectedRoute />} />
          <Route path="/" element={<RedirectToRole />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

// **✅ Admin Protected Route**
const AdminProtectedRoute = () => {
  const isAuthenticated = checkAuth();
  const userRole = localStorage.getItem("role");

  return isAuthenticated && userRole === "admin" ? <Admin /> : <Navigate to="/login" />;
};

// **✅ Student Protected Route**
const StudentProtectedRoute = () => {
  const isAuthenticated = checkAuth();
  const userRole = localStorage.getItem("role");

  return isAuthenticated && userRole === "student" ? <Student /> : <Navigate to="/login" />;
};

// **✅ Redirect based on role**
const RedirectToRole = () => {
  const isAuthenticated = checkAuth();
  const userRole = localStorage.getItem("role");

  if (!isAuthenticated) return <Navigate to="/login" />;
  return userRole === "admin" ? <Navigate to="/admin" /> : <Navigate to="/student" />;
};

// **✅ Check Authentication & Auto Logout on Token Expiry**
const checkAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    if (exp * 1000 < Date.now()) {
      localStorage.clear();
      return false;
    }
    return true;
  } catch (error) {
    console.error("Invalid Token:", error);
    localStorage.clear();
    return false;
  }
};

export default App;

