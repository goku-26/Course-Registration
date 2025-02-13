import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";

const User = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showRegulations, setShowRegulations] = useState(false);
  const [selectedRegulation, setSelectedRegulation] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rollNo, setRollNo] = useState("");
  const [semester, setSemester] = useState("");
  const [registeredCourse, setRegisteredCourse] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail && storedEmail.includes("@")) {
      setUserEmail(storedEmail);
    } else {
      setUserEmail("unknown@student.com");
    }
  }, []);

  const extractStudentName = (email) => {
    if (!email || !email.includes("@")) return "STUDENT";
    const namePart = email.split("@")[0];
    const nameSegments = namePart.split(".");
    return nameSegments.length > 1 ? nameSegments[0].toUpperCase() : namePart.toUpperCase();
  };

  const studentName = extractStudentName(userEmail);

  const departments = {
    "CSE": ["Data Structures", "Algorithms", "Operating Systems"],
    "INFORMATION TECHNOLOGY": ["Web Development", "Cyber Security"],
    "COMPUTER TECHNOLOGY": ["Database Management", "Network Security"],
    "AIML": ["Deep Learning", "Natural Language Processing"],
    "AIDS": ["Big Data Analytics", "Data Mining"],
    "EEE": ["Power Electronics", "Embedded Systems"],
    "EIE": ["Industrial Automation", "Process Control"],
    "ISE": ["Software Engineering", "Cloud Computing"],
    "CIVIL": ["Structural Engineering", "Geotechnical Engineering"]
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleSubmitRegistration = () => {
    if (!rollNo || !semester || !selectedDepartment || !selectedCourse) {
      alert("Please fill all fields and select a course.");
      return;
    }
    setRegisteredCourse(selectedCourse);
    alert(`Course Registered: ${selectedCourse}`);
  };

  return (
    <div className="user-dashboard">
      <nav className="user-navbar">
        <div className="nav-left">
          <h2>Student Portal</h2>
          <div className="user-info">
            <span className="user-email">{userEmail}</span>
          </div>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="user-content">
        <div className="user-sidebar">
          <div className="sidebar-menu">
            <h3>Student Menu</h3>
            <ul>
              <li className={activeTab === "Dashboard" ? "active" : ""} onClick={() => setActiveTab("Dashboard")}>
                Dashboard
              </li>
              <li className={activeTab === "Course Registration" ? "active" : ""} onClick={() => { setActiveTab("Course Registration"); setShowRegulations(true); }}>
                Course Registration
              </li>
              <li className={activeTab === "Results" ? "active" : ""} onClick={() => setActiveTab("Results")}>
                Results
              </li>
              <li className={activeTab === "Academic Calendar" ? "active" : ""} onClick={() => setActiveTab("Academic Calendar")}>
                Academic Calendar
              </li>
              <li className={activeTab === "Help Desk" ? "active" : ""} onClick={() => setActiveTab("Help Desk")}>
                Help Desk
              </li>
            </ul>
          </div>
        </div>

        <div className="main-panel">
          {activeTab === "Dashboard" && (
            <>
              <div className="panel-header">
                <h1>Welcome, {studentName}</h1>
                <p>Current Semester: Spring 2025</p>
              </div>
              {registeredCourse ? (
                <div className="registered-course">
                  <h2>Registered Course</h2>
                  <div className="course-card">
                    <h3>{registeredCourse}</h3>
                  </div>
                </div>
              ) : (
                <p className="no-course-msg">No courses registered yet.</p>
              )}
            </>
          )}

          {activeTab === "Results" && (
            <div className="results-section">
              <h2>Your Results</h2>
              <p>Results will be displayed here...</p>
            </div>
          )}

          {activeTab === "Academic Calendar" && (
            <div className="academic-calendar">
              <h2>Academic Calendar</h2>
              <p>Semester schedule and holidays will be listed here...</p>
            </div>
          )}

          {activeTab === "Help Desk" && (
            <div className="help-desk">
              <h2>Help Desk</h2>
              <p>If you have any issues, please contact support.</p>
            </div>
          )}

          {activeTab === "Course Registration" && showRegulations && !selectedRegulation && (
            <div className="regulation-selection">
              <h2>Select Your Regulation</h2>
              <button onClick={() => setSelectedRegulation("2018")}>Regulation 2018</button>
              <button onClick={() => setSelectedRegulation("2022")}>Regulation 2022</button>
            </div>
          )}

          {activeTab === "Course Registration" && selectedRegulation && !selectedDepartment && (
            <div className="department-selection">
              <h2>Select Your Department</h2>
              {Object.keys(departments).map((dept) => (
                <button key={dept} onClick={() => setSelectedDepartment(dept)}>{dept}</button>
              ))}
            </div>
          )}

          {activeTab === "Course Registration" && selectedDepartment && (
            <div className="course-form">
              <h2>Course Registration - {selectedDepartment}</h2>
              <input type="text" placeholder="Student Name" value={studentName} readOnly />
              <input type="text" placeholder="Roll Number" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
              <input type="text" placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
              <h3>Select One Course</h3>
              <div className="courses-list">
                {departments[selectedDepartment].map((course) => (
                  <label key={course} className="course-option">
                    <input type="radio" name="selectedCourse" onChange={() => setSelectedCourse(course)} />
                    {course}
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
