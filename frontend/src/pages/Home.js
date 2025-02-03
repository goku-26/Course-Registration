// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "./firebase";
// import { doc, getDoc } from "firebase/firestore";

// function Home() {
//   const [userDetails, setUserDetails] = useState(null);
//   const navigate = useNavigate();

//   const fetchUserData = async () => {
//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         console.log(user);

//         const docRef = doc(db, "Users", user.uid); // Modular Firestore usage
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setUserDetails(docSnap.data());
//           console.log(docSnap.data());
//         } else {
//           console.log("No user data found");
//         }
//       } else {
//         console.log("User is not logged in");
//         navigate("/login");
//       }
//     });
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       navigate("/login");
//       console.log("User logged out successfully!");
//     } catch (error) {
//       console.error("Error logging out:", error.message);
//     }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/">Student Portal</Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/home">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/regulation">Regulation</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/academics">Academics</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/help">Help</Link>
//               </li>
//             </ul>
//             <button
//               className="btn btn-outline-danger ms-auto"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Home Content */}
//       <div className="container mt-4">
//         {userDetails ? (
//           <>
//             <h1 className="text-center">Welcome, {userDetails.firstName}!</h1>
//             <p className="text-center">Explore the features of the Student Portal:</p>
//             <div className="d-flex justify-content-center mt-4">
//               <Link to="/home" className="btn btn-primary mx-2">Home</Link>
//               <Link to="/regulation" className="btn btn-secondary mx-2">View Regulation</Link>
//               <Link to="/academics" className="btn btn-success mx-2">View Academics</Link>
//               <Link to="/help" className="btn btn-info mx-2">Help</Link>
//             </div>
//           </>
//         ) : (
//           <p className="text-center">Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../components/firebase"; // Adjusted import path
import { doc, getDoc } from "firebase/firestore";

function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);

        const docRef = doc(db, "Users", user.uid); // Correct modular import usage
        const docSnap = await getDoc(docRef); // Correct modular import usage
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("No user data found");
        }
      } else {
        console.log("User is not logged in");
        navigate("/login");
      }
    });
  }, [navigate]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Student Portal</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Student Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/regulation">Regulation</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/academics">Academics</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/help">Help</Link>
              </li>
            </ul>
            <button
              className="btn btn-outline-danger ms-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Home Content */}
      <div className="container mt-4">
        {userDetails ? (
          <>
            <h1 className="text-center">Welcome, {userDetails.firstName}!</h1>
            <p className="text-center">Explore the features of the Student Portal:</p>
            <div className="d-flex justify-content-center mt-4">
              <Link to="/profile" className="btn btn-primary mx-2">View Profile</Link>
              <Link to="/regulation" className="btn btn-secondary mx-2">View Regulation</Link>
              <Link to="/academics" className="btn btn-success mx-2">View Academics</Link>
              <Link to="/help" className="btn btn-info mx-2">Help</Link>
            </div>
          </>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Home;

