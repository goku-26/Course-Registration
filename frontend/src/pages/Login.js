// import React, { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./Login.css";

// function LoginComponent() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showRoleSelection, setShowRoleSelection] = useState(false);

//   const handleLogin = () => {
//     if (email && password) {
//       localStorage.setItem("token", "manualLoginToken");
//       localStorage.setItem("email", email);
//       setShowRoleSelection(true);
//     } else {
//       toast.error("Please enter email and password", { position: "top-center" });
//     }
//   };

//   const handleLoginSuccess = (response) => {
//     console.log("Google Login successful:", response);
//     localStorage.setItem("token", response.credential);
//     setShowRoleSelection(true);
//   };

//   const handleLoginFailure = (error) => {
//     console.error("Google Login failed:", error);
//     toast.error("Google Login failed, please try again.", { position: "top-center" });
//   };

//   const handleRoleSelection = (role) => {
//     localStorage.setItem("role", role);
//     toast.success(`Logged in as ${role}`, { position: "top-center" });
//     navigate(role === "admin" ? "/admin" : "/student");
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="image-container">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYB-39YIn8M7nenZPpLqrS485KtB_nMVAvgA&s"
//             alt="Login"
//           />
//         </div>
//         <h2>Login</h2>

//         <input
//           type="email"
//           className="input-field"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           className="input-field"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
        
//         <button type="submit" className="submit-button" onClick={handleLogin}>
//           Submit
//         </button>

//         <div className="google-login">
//           <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
//         </div>

//         {showRoleSelection && (
//           <div className="role-selection">
//             <h3>Select Your Role</h3>
//             <button onClick={() => handleRoleSelection("admin")} className="role-button">
//               Admin
//             </button>
//             <button onClick={() => handleRoleSelection("student")} className="role-button">
//               Student
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default LoginComponent;

import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Login.css";

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password", { position: "top-center" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setShowRoleSelection(true);
        toast.success("Login successful!", { position: "top-center" });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed", { position: "top-center" });
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const googleToken = response.credential;
      const res = await axios.post("http://localhost:5000/api/auth/google-login", { token: googleToken });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setShowRoleSelection(true);
        toast.success("Google Login successful!", { position: "top-center" });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Google Login failed:", error);
      toast.error("Google Login failed, please try again.", { position: "top-center" });
    }
  };

  const handleGoogleLoginFailure = () => {
    toast.error("Google Login failed, please try again.", { position: "top-center" });
  };

  const handleRoleSelection = (role) => {
    localStorage.setItem("role", role);
    toast.success(`Logged in as ${role}`, { position: "top-center" });
    navigate(role === "admin" ? "/admin" : "/student");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="image-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYB-39YIn8M7nenZPpLqrS485KtB_nMVAvgA&s"
            alt="Login"
          />
        </div>
        <h2>Login</h2>

        <input
          type="email"
          className="input-field"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit" className="submit-button" onClick={handleLogin}>
          Submit
        </button>

        <div className="google-login">
          <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginFailure} />
        </div>

        {showRoleSelection && (
          <div className="role-selection">
            <h3>Select Your Role</h3>
            <button onClick={() => handleRoleSelection("admin")} className="role-button">
              Admin
            </button>
            <button onClick={() => handleRoleSelection("student")} className="role-button">
              Student
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginComponent;
