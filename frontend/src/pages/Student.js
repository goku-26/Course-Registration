// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Student.css'; // We'll reuse the Admin.css with minor modifications

// const User = () => {
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem('email');
//   const studentName = "Gokul"; // Replace with actual data from your backend

//   // Sample course data - replace with API call
//   const registeredCourses = [
//     { id: 1, name: 'Web Development', code: 'CS101', credits: 3, grade: 'A' },
//     { id: 2, name: 'Database Systems', code: 'CS102', credits: 4, grade: 'B+' },
//     { id: 3, name: 'Software Engineering', code: 'CS103', credits: 3, grade: 'A-' },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('email');
//     navigate('/login');
//   };

//   return (
//     <div className="user-dashboard">
//       {/* Navbar */}
//       <nav className="user-navbar">
//         <div className="nav-left">
//           <h2>Student Portal</h2>
//           <div className="user-info">
//             <span className="user-name">{studentName}</span>
//             <span className="user-email">{userEmail}</span>
//           </div>
//         </div>
//         <div className="nav-right">
//           <button onClick={handleLogout} className="logout-btn">
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="user-content">
//         {/* Sidebar */}
//         <div className="user-sidebar">
//           <div className="sidebar-menu">
//             <br></br>
//             <h3>Student Menu</h3>
//             <ul>
//               <li className="active">
//                 <i className="fas fa-home"></i> Dashboard
//               </li>
//               <li>
//                 <i className="fas fa-book"></i> Course Registration
//               </li>
//               <li>
//                 <i className="fas fa-file-alt"></i> Results
//               </li>
//               <li>
//                 <i className="fas fa-calendar-alt"></i> Academic Calendar
//               </li>
//               <li>
//                 <i className="fas fa-question-circle"></i> Help Desk
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Main Panel */}
//         <div className="main-panel">
//           <div className="panel-header">
//             <h1>Welcome, {studentName}</h1>
//             <p>Current Semester: Spring 2025</p>
//           </div>

//           {/* Registered Courses */}
//           <div className="courses-container">
//             <h2>Your Registered Courses</h2>
//             <div className="courses-grid">
//               {registeredCourses.map((course) => (
//                 <div key={course.id} className="course-card">
//                   <div className="course-header">
//                     <h3>{course.name}</h3>
//                     <span className="course-code">{course.code}</span>
//                   </div>
//                   <div className="course-details">
//                     <p>Credits: {course.credits}</p>
//                     <p>Current Grade: {course.grade}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Academic Summary */}
//           <div className="academic-summary">
//             <h2>Academic Summary</h2>
//             <div className="summary-cards">
//               <div className="summary-card">
//                 <i className="fas fa-graduation-cap"></i>
//                 <div>
//                   <h3>CGPA</h3>
//                   <p>7.46 / 10.0</p>
//                 </div>
//               </div>
//               <div className="summary-card">
//                 <i className="fas fa-book-open"></i>
//                 <div>
//                   <h3>Completed Credits</h3>
//                   <p>96 / 120</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Student.css"; // Keep using your existing CSS

// const User = () => {
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem("email");
//   const studentName = "Gokul"; // Replace with actual data from your backend

//   const [showRegulations, setShowRegulations] = useState(false);
//   const [selectedRegulation, setSelectedRegulation] = useState(null);
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [rollNo, setRollNo] = useState("");
//   const [semester, setSemester] = useState("");

//   // Sample courses for the 2022 regulation
//   const courses2022 = [
//     { id: 1, name: "Artificial Intelligence", code: "AI202" },
//     { id: 2, name: "Cloud Computing", code: "CC301" },
//     { id: 3, name: "Cyber Security", code: "CS401" },
//     { id: 4, name: "Machine Learning", code: "ML501" },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("email");
//     navigate("/login");
//   };

//   const handleCourseSelection = (course) => {
//     setSelectedCourses((prevCourses) =>
//       prevCourses.includes(course)
//         ? prevCourses.filter((c) => c !== course)
//         : [...prevCourses, course]
//     );
//   };

//   const handleSubmitRegistration = () => {
//     if (!rollNo || !semester || selectedCourses.length === 0) {
//       alert("Please fill all fields and select at least one course.");
//       return;
//     }
//     alert(`Courses Registered: ${selectedCourses.map((c) => c.name).join(", ")}`);
//   };

//   return (
//     <div className="user-dashboard">
//       {/* Navbar */}
//       <nav className="user-navbar">
//         <div className="nav-left">
//           <h2>Student Portal</h2>
//           <div className="user-info">
//             <span className="user-name">{studentName}</span>
//             <span className="user-email">{userEmail}</span>
//           </div>
//         </div>
//         <div className="nav-right">
//           <button onClick={handleLogout} className="logout-btn">
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="user-content">
//         {/* Sidebar */}
//         <div className="user-sidebar">
//           <div className="sidebar-menu">
//             <br />
//             <h3>Student Menu</h3>
//             <ul>
//               <li className="active">
//                 <i className="fas fa-home"></i> Dashboard
//               </li>
//               <li onClick={() => setShowRegulations(true)}>
//                 <i className="fas fa-book"></i> Course Registration
//               </li>
//               <li>
//                 <i className="fas fa-file-alt"></i> Results
//               </li>
//               <li>
//                 <i className="fas fa-calendar-alt"></i> Academic Calendar
//               </li>
//               <li>
//                 <i className="fas fa-question-circle"></i> Help Desk
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Main Panel */}
//         <div className="main-panel">
//           <div className="panel-header">
//             <h1>Welcome, {studentName}</h1>
//             <p>Current Semester: Spring 2025</p>
//           </div>
          
//           {/* Course Registration Section */}
//           {showRegulations && !selectedRegulation && (
//             <div className="regulation-selection">
//               <h2>Select Your Regulation</h2>
//               <button onClick={() => setSelectedRegulation("2018")}>
//                 Regulation 2018
//               </button>
//               <button onClick={() => setSelectedRegulation("2022")}>
//                 Regulation 2022
//               </button>
//             </div>
//           )}

//           {/* Course Selection Form for 2022 */}
//           {selectedRegulation === "2022" && (
//             <div className="course-form">
//               <h2>Course Registration - Regulation 2022</h2>
//               <input
//                 type="text"
//                 placeholder="Student Name"
//                 value={studentName}
//                 readOnly
//               />
//               <input
//                 type="text"
//                 placeholder="Roll Number"
//                 value={rollNo}
//                 onChange={(e) => setRollNo(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Semester"
//                 value={semester}
//                 onChange={(e) => setSemester(e.target.value)}
//               />

//               <h3>Select Courses for Current Semester</h3>
//               <div className="courses-list">
//                 {courses2022.map((course) => (
//                   <label key={course.id} className="course-option">
//                     <input
//                       type="checkbox"
//                       checked={selectedCourses.includes(course)}
//                       onChange={() => handleCourseSelection(course)}
//                     />
//                     {course.name} ({course.code})
//                   </label>
//                 ))}
//               </div>

//               <button onClick={handleSubmitRegistration}>Submit</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";

const User = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");
  const studentName = "Gokul"; // Replace with actual data from your backend

  const [showRegulations, setShowRegulations] = useState(false);
  const [selectedRegulation, setSelectedRegulation] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [semester, setSemester] = useState("");

  const courses2022 = [
    { id: 1, name: "Artificial Intelligence", code: "AI202" },
    { id: 2, name: "Cloud Computing", code: "CC301" },
    { id: 3, name: "Cyber Security", code: "CS401" },
    { id: 4, name: "Machine Learning", code: "ML501" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleCourseSelection = (course) => {
    setSelectedCourses((prevCourses) => {
      const isAlreadySelected = prevCourses.some((c) => c.id === course.id);
      if (isAlreadySelected) {
        return prevCourses.filter((c) => c.id !== course.id);
      } else {
        return [...prevCourses, course];
      }
    });
  };

  const handleSubmitRegistration = () => {
    if (!rollNo || !semester || selectedCourses.length === 0) {
      alert("Please fill all fields and select at least one course.");
      return;
    }
    alert(`Courses Registered: ${selectedCourses.map((c) => c.name).join(", ")}`);
  };

  return (
    <div className="user-dashboard">
      <nav className="user-navbar">
        <div className="nav-left">
          <h2>Student Portal</h2>
          <div className="user-info">
            <span className="user-name">{studentName}</span>
            <span className="user-email">{userEmail}</span>
          </div>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="user-content">
        <div className="user-sidebar">
          <div className="sidebar-menu">
            <br />
            <h3>Student Menu</h3>
            <ul>
              <li className="active">
                <i className="fas fa-home"></i> Dashboard
              </li>
              <li onClick={() => setShowRegulations(true)}>
                <i className="fas fa-book"></i> Course Registration
              </li>
              <li>
                <i className="fas fa-file-alt"></i> Results
              </li>
              <li>
                <i className="fas fa-calendar-alt"></i> Academic Calendar
              </li>
              <li>
                <i className="fas fa-question-circle"></i> Help Desk
              </li>
            </ul>
          </div>
        </div>

        <div className="main-panel">
          <div className="panel-header">
            <h1>Welcome, {studentName}</h1>
            <p>Current Semester: Spring 2025</p>
          </div>

          {showRegulations && !selectedRegulation && (
            <div className="regulation-selection">
              <h2>Select Your Regulation</h2>
              <button onClick={() => setSelectedRegulation("2018")}>
                Regulation 2018
              </button>
              <button onClick={() => setSelectedRegulation("2022")}>
                Regulation 2022
              </button>
            </div>
          )}

          {selectedRegulation === "2022" && (
            <div className="course-form">
              <h2>Course Registration - Regulation 2022</h2>
              <input
                type="text"
                placeholder="Student Name"
                value={studentName}
                readOnly
              />
              <input
                type="text"
                placeholder="Roll Number"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
              <input
                type="text"
                placeholder="Semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />

              <h3>Select Courses for Current Semester</h3>
              <div className="courses-list">
                {courses2022.map((course) => (
                  <label key={course.id} className="course-option">
                    <input
                      type="checkbox"
                      checked={selectedCourses.some((c) => c.id === course.id)}
                      onChange={() => handleCourseSelection(course)}
                    />
                    {course.name} ({course.code})
                  </label>
                ))}
              </div>

              <button onClick={handleSubmitRegistration}>Submit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
