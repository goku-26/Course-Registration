// import { signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth } from "../components/firebase";
// import { toast } from "react-toastify";
// import SignInwithGoogle from "../components/signInWithGoogle";

// function LoginComponent() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log("User logged in Successfully");
//       window.location.href = "/profile";
//       toast.success("User logged in Successfully", {
//         position: "top-center",
//       });
//     } catch (error) {
//       console.log(error.message);

//       toast.error(error.message, {
//         position: "bottom-center",
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="image-container">
//         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYB-39YIn8M7nenZPpLqrS485KtB_nMVAvgA&s"></img>
//       </div>
//          <div className="mb-3">
//         <label>Email address</label>
//         <input
//           type="email"
//           className="form-control"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div className="mb-3">
//         <label>Password</label>
//         <input
//           type="password"
//           className="form-control"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>

//       <div className="d-grid">
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </div>
//       <SignInwithGoogle/>
//     </form>
//   );
// }

// export default LoginComponent;

import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../components/firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "../components/signInWithGoogle";
import { useNavigate } from "react-router-dom";
import './Login.css'

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email ends with the allowed domain
    const allowedDomain = "bitsathy.ac.in";
    if (!email.endsWith(`@${allowedDomain}`)) {
      toast.error(`Only ${allowedDomain} email addresses are allowed.`, {
        position: "bottom-center",
      });
      return; // Stop further execution
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store token, role, and email in localStorage
      localStorage.setItem("token", await user.getIdToken());
      localStorage.setItem("role", "user"); // Replace with actual role from your backend or Firebase
      localStorage.setItem("email", user.email);

      // Redirect based on role
      if (localStorage.getItem("role") === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

      toast.success("User logged in successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="image-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYB-39YIn8M7nenZPpLqrS485KtB_nMVAvgA&s"
          alt="Login"
        />
      </div>
      <div className="mb-3">
        <label>Email address :</label>
        <input
          type="email"
          className="form-control"
          // placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password :</label>
        <input
          type="password"
          className="form-control"
          // placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <SignInwithGoogle />
    </form>
  );
}

export default LoginComponent;

