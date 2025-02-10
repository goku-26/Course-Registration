import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";

const User = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail && storedEmail.includes("@")) {
      setUserEmail(storedEmail);
    } else {
      setUserEmail("unknown@student.com"); // Fallback if email is missing
    }
  }, []);

  // Extract student name from email and convert to uppercase
  const extractStudentName = (email) => {
    if (!email || !email.includes("@")) return "STUDENT";
    const namePart = email.split("@")[0];
    const nameSegments = namePart.split(".");
    return nameSegments.length > 1 ? nameSegments[0].toUpperCase() : namePart.toUpperCase();
  };

  const studentName = extractStudentName(userEmail);

  const [showRegulations, setShowRegulations] = useState(false);
  const [selectedRegulation, setSelectedRegulation] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rollNo, setRollNo] = useState("");
  const [semester, setSemester] = useState("");
  const [registeredCourse, setRegisteredCourse] = useState(null);

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
    setSelectedCourse(course);
  };

  const handleSubmitRegistration = () => {
    if (!rollNo || !semester || !selectedCourse) {
      alert("Please fill all fields and select a course.");
      return;
    }
    setRegisteredCourse(selectedCourse);
    alert(`Course Registered: ${selectedCourse.name}`);
  };

  return (
    <div className="user-dashboard">
      {/* Navbar */}
      <nav className="user-navbar">
        <div className="nav-left">
          <h2>Student Portal</h2>
          <br></br>
          <div className="user-info">
            {/* <span className="user-name">{studentName}</span> */}
            <span className="user-email">{userEmail}</span>
          </div>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar & Main Content */}
      <div className="user-content">
        <div className="user-sidebar">
          <div className="sidebar-menu">
            <br></br>
            <br></br>
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

        {/* Main Panel */}
        <div className="main-panel">
          <div className="panel-header">
            <h1>Welcome, {studentName}</h1>
            <p>Current Semester: Spring 2025</p>
          </div>

          {/* Dashboard - Show Registered Course */}
          {registeredCourse ? (
            <div className="registered-course">
              <h2>Registered Course</h2>
              <div className="course-card">
                <h3>{registeredCourse.name}</h3>
                <p>Course Code: {registeredCourse.code}</p>
              </div>
            </div>
          ) : (
            <p className="no-course-msg">No courses registered yet.</p>
          )}

          {/* Course Registration */}
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
              <input type="text" placeholder="Student Name" value={studentName} readOnly />
              <input type="text" placeholder="Roll Number" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
              <input type="text" placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} />

              <h3>Select One Course for Current Semester</h3>
              <div className="courses-list">
                {courses2022.map((course) => (
                  <label key={course.id} className="course-option">
                    <input
                      type="radio"
                      name="selectedCourse"
                      checked={selectedCourse?.id === course.id}
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
