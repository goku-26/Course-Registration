import React from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css'; // We'll reuse the Admin.css with minor modifications

const User = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email');
  const studentName = "John Doe"; // Replace with actual data from your backend

  // Sample course data - replace with API call
  const registeredCourses = [
    { id: 1, name: 'Web Development', code: 'CS101', credits: 3, grade: 'A' },
    { id: 2, name: 'Database Systems', code: 'CS102', credits: 4, grade: 'B+' },
    { id: 3, name: 'Software Engineering', code: 'CS103', credits: 3, grade: 'A-' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <div className="user-dashboard">
      {/* Navbar */}
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

      {/* Main Content */}
      <div className="user-content">
        {/* Sidebar */}
        <div className="user-sidebar">
          <div className="sidebar-menu">
            <h3>Student Menu</h3>
            <ul>
              <li className="active">
                <i className="fas fa-home"></i> Dashboard
              </li>
              <li>
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
            <p>Current Semester: Spring 2024</p>
          </div>

          {/* Registered Courses */}
          <div className="courses-container">
            <h2>Your Registered Courses</h2>
            <div className="courses-grid">
              {registeredCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-header">
                    <h3>{course.name}</h3>
                    <span className="course-code">{course.code}</span>
                  </div>
                  <div className="course-details">
                    <p>Credits: {course.credits}</p>
                    <p>Current Grade: {course.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Summary */}
          <div className="academic-summary">
            <h2>Academic Summary</h2>
            <div className="summary-cards">
              <div className="summary-card">
                <i className="fas fa-graduation-cap"></i>
                <div>
                  <h3>CGPA</h3>
                  <p>3.75 / 4.0</p>
                </div>
              </div>
              <div className="summary-card">
                <i className="fas fa-book-open"></i>
                <div>
                  <h3>Completed Credits</h3>
                  <p>96 / 120</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;