// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Admin.css';

// const Admin = () => {
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem('email');

//   const [totalCourses, setTotalCourses] = useState(0);
//   const [registeredStudents, setRegisteredStudents] = useState(0);
//   const [pendingRequests, setPendingRequests] = useState(0);
//   const [recentActivities, setRecentActivities] = useState([]);
//   const [registeredCourses, setRegisteredCourses] = useState([]);
//   const [newCourse, setNewCourse] = useState("");
//   const [selectedDept, setSelectedDept] = useState("");
//   const [departments, setDepartments] = useState({
//     CSE: ["Data Structures", "Algorithms"],
//     IT: ["Web Development", "Cyber Security"],
//     EEE: ["Power Electronics"],
//   });

//   useEffect(() => {
//     // Fetch total courses
//     fetch('http://localhost:5000/api/registration/courses')
//       .then((res) => res.json())
//       .then((data) => {
//         setTotalCourses(data.length);
//         setRegisteredCourses(data);
//       })
//       .catch((error) => console.error('Error fetching courses:', error));

//     // Fetch registered students
//     fetch('http://localhost:5000/api/users')
//       .then((res) => res.json())
//       .then((data) => {
//         const studentCount = data.filter((user) => user.role === 'student').length;
//         setRegisteredStudents(studentCount);
//       })
//       .catch((error) => console.error('Error fetching students:', error));

//     // Fetch pending requests
//     fetch('http://localhost:5000/api/pending-requests')
//       .then((res) => res.json())
//       .then((data) => setPendingRequests(data.length))
//       .catch((error) => console.error('Error fetching pending requests:', error));

//     // Fetch recent activities
//     fetch('http://localhost:5000/api/recent-activities')
//       .then((res) => res.json())
//       .then((data) => setRecentActivities(data))
//       .catch((error) => console.error('Error fetching activities:', error));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('email');
//     navigate('/login');
//   };

//   const handleAddCourse = () => {
//     if (!selectedDept || !newCourse) {
//       alert("Select department and enter a course name.");
//       return;
//     }
//     setDepartments((prev) => ({
//       ...prev,
//       [selectedDept]: [...(prev[selectedDept] || []), newCourse],
//     }));
//     setNewCourse("");
//   };

//   return (
//     <div className="admin-dashboard">
//       <nav className="admin-navbar">
//         <div className="nav-left">
//           <h2>Admin Dashboard</h2>
//           <span className="admin-email">{userEmail}</span>
//         </div>
//         <div className="nav-right">
//           <button onClick={handleLogout} className="logout-btn">Logout</button>
//         </div>
//       </nav>

//       <div className="admin-content">
//         <div className="admin-sidebar">
//           <div className="sidebar-menu">
//             <h3>Menu</h3>
//             <ul>
//               <li className="active"><i className="fas fa-tachometer-alt"></i> Dashboard</li>
//               <li><i className="fas fa-book"></i> Courses</li>
//               <li><i className="fas fa-users"></i> Students</li>
//               <li><i className="fas fa-chart-bar"></i> Analytics</li>
//               <li><i className="fas fa-cog"></i> Settings</li>
//             </ul>
//           </div>
//         </div>

//         <div className="main-panel">
//           <div className="panel-header">
//             <h1>Welcome Back, Admin</h1>
//             <p>Last login: {new Date().toLocaleString()}</p>
//           </div>

//           <div className="stats-container">
//             <div className="stat-card">
//               <h3>Total Courses</h3>
//               <p>{totalCourses}</p>
//               <i className="fas fa-book"></i>
//             </div>
//             <div className="stat-card">
//               <h3>Registered Students</h3>
//               <p>{registeredStudents}</p>
//               <i className="fas fa-users"></i>
//             </div>
//             <div className="stat-card">
//               <h3>Pending Requests</h3>
//               <p>{pendingRequests}</p>
//               <i className="fas fa-envelope"></i>
//             </div>
//           </div>

//           <div className="recent-activities">
//             <h2>Registered Courses</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Student Email</th>
//                   <th>Roll No</th>
//                   <th>Semester</th>
//                   <th>Department</th>
//                   <th>Course</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {registeredCourses.length > 0 ? (
//                   registeredCourses.map((course, index) => (
//                     <tr key={index}>
//                       <td>{course.studentEmail}</td>
//                       <td>{course.rollNo}</td>
//                       <td>{course.semester}</td>
//                       <td>{course.department}</td>
//                       <td>{course.course}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5">No registered courses found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="recent-activities">
//   <h2>Recent Activities</h2>
//   {recentActivities.length > 0 ? (
//     <ul>
//       {recentActivities.map((activity, index) => (
//         <li key={index}>{activity}</li>
//       ))}
//     </ul>
//   ) : (
//     <p>No recent activities.</p>
//   )}
// </div>

//           <div className="add-course-section">
//             <h2>Add Course</h2>
//             <select onChange={(e) => setSelectedDept(e.target.value)}>
//               <option value="">Select Department</option>
//               {Object.keys(departments).map((dept) => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Enter Course Name"
//               value={newCourse}
//               onChange={(e) => setNewCourse(e.target.value)}
//             />
//             <button onClick={handleAddCourse}>Add Course</button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email');

  const [currentPage, setCurrentPage] = useState('dashboard'); // State to manage the current page
  const [totalCourses, setTotalCourses] = useState(0);
  const [registeredStudents, setRegisteredStudents] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  // Use the same departments object as in Student.js
  const [departments, setDepartments] = useState({
    CSE: ["Data Structures", "Algorithms", "Operating Systems"],
    "INFORMATION TECHNOLOGY": ["Web Development", "Cyber Security"],
    "COMPUTER TECHNOLOGY": ["Database Management", "Network Security"],
    AIML: ["Deep Learning", "Natural Language Processing"],
    AIDS: ["Big Data Analytics", "Data Mining"],
    EEE: ["Power Electronics", "Embedded Systems"],
    EIE: ["Industrial Automation", "Process Control"],
    ISE: ["Software Engineering", "Cloud Computing"],
    CIVIL: ["Structural Engineering", "Geotechnical Engineering"],
  });

  useEffect(() => {
    // Fetch total courses
    fetch('http://localhost:5000/api/registration/courses')
      .then((res) => res.json())
      .then((data) => {
        setTotalCourses(data.length);
        setRegisteredCourses(data);
      })
      .catch((error) => console.error('Error fetching courses:', error));

    // Fetch registered students
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => {
        const studentCount = data.filter((user) => user.role === 'student').length;
        setRegisteredStudents(studentCount);
      })
      .catch((error) => console.error('Error fetching students:', error));

    // Fetch pending requests
    fetch('http://localhost:5000/api/pending-requests')
      .then((res) => res.json())
      .then((data) => setPendingRequests(data.length))
      .catch((error) => console.error('Error fetching pending requests:', error));

    // Fetch recent activities
    fetch('http://localhost:5000/api/recent-activities')
      .then((res) => res.json())
      .then((data) => setRecentActivities(data))
      .catch((error) => console.error('Error fetching activities:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const handleAddCourse = () => {
    if (!selectedDept || !newCourse) {
      alert("Select department and enter a course name.");
      return;
    }

    // Check if the course already exists in the selected department
    if (departments[selectedDept].includes(newCourse)) {
      alert("This course already exists in the selected department.");
      return;
    }

    // Add the new course to the selected department
    setDepartments((prev) => ({
      ...prev,
      [selectedDept]: [...prev[selectedDept], newCourse],
    }));
    setNewCourse("");
  };

  // Render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <>
            <div className="panel-header">
              <h1>Welcome Back, Admin</h1>
              <p>Last login: {new Date().toLocaleString()}</p>
            </div>

            <div className="stats-container">
              <div className="stat-card">
                <h3>Total Courses</h3>
                <p>{totalCourses}</p>
                <i className="fas fa-book"></i>
              </div>
              <div className="stat-card">
                <h3>Registered Students</h3>
                <p>{registeredStudents}</p>
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-card">
                <h3>Pending Requests</h3>
                <p>{pendingRequests}</p>
                <i className="fas fa-envelope"></i>
              </div>
            </div>

            <div className="recent-activities">
              <h2>Registered Courses</h2>
              <table>
                <thead>
                  <tr>
                    <th>Student Email</th>
                    <th>Roll No</th>
                    <th>Semester</th>
                    <th>Department</th>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredCourses.length > 0 ? (
                    registeredCourses.map((course, index) => (
                      <tr key={index}>
                        <td>{course.studentEmail}</td>
                        <td>{course.rollNo}</td>
                        <td>{course.semester}</td>
                        <td>{course.department}</td>
                        <td>{course.course}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No registered courses found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="recent-activities">
              <h2>Recent Activities</h2>
              {recentActivities.length > 0 ? (
                <ul>
                  {recentActivities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              ) : (
                <p>No recent activities.</p>
              )}
            </div>
          </>
        );

      case 'courses':
        return (
          <div className="courses-page">
            <h2>Courses</h2>
            <div className="add-course-section">
              <h3>Add New Course</h3>
              <select
                onChange={(e) => setSelectedDept(e.target.value)}
                value={selectedDept}
              >
                <option value="">Select Department</option>
                {Object.keys(departments).map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Enter New Course Name"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
              />
              <button onClick={handleAddCourse}>Add Course</button>
            </div>

            <div className="course-list">
              <h3>Available Courses</h3>
              {Object.entries(departments).map(([dept, courses]) => (
                <div key={dept} className="department-courses">
                  <h4>{dept}</h4>
                  <ul>
                    {courses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="students-page">
            <h2>Students</h2>
            <p>List of registered students will be displayed here.</p>
          </div>
        );

      case 'analytics':
        return (
          <div className="analytics-page">
            <h2>Analytics</h2>
            <p>Analytics data will be displayed here.</p>
          </div>
        );

      case 'settings':
        return (
          <div className="settings-page">
            <h2>Settings</h2>
            <p>Settings options will be displayed here.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar">
        <div className="nav-left">
          <h2>Admin Dashboard</h2>
          <span className="admin-email">{userEmail}</span>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="admin-content">
        <div className="admin-sidebar">
          <div className="sidebar-menu">
            <h3>Menu</h3>
            <ul>
              <li
                className={currentPage === 'dashboard' ? 'active' : ''}
                onClick={() => setCurrentPage('dashboard')}
              >
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </li>
              <li
                className={currentPage === 'courses' ? 'active' : ''}
                onClick={() => setCurrentPage('courses')}
              >
                <i className="fas fa-book"></i> Courses
              </li>
              <li
                className={currentPage === 'students' ? 'active' : ''}
                onClick={() => setCurrentPage('students')}
              >
                <i className="fas fa-users"></i> Students
              </li>
              <li
                className={currentPage === 'analytics' ? 'active' : ''}
                onClick={() => setCurrentPage('analytics')}
              >
                <i className="fas fa-chart-bar"></i> Analytics
              </li>
              <li
                className={currentPage === 'settings' ? 'active' : ''}
                onClick={() => setCurrentPage('settings')}
              >
                <i className="fas fa-cog"></i> Settings
              </li>
            </ul>
          </div>
        </div>

        <div className="main-panel">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default Admin;