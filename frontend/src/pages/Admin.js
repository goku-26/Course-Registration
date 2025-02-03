import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email');

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      {/* Navbar Section */}
      <nav className="admin-navbar">
        <div className="nav-left">
          <h2>Admin Dashboard</h2>
          <span className="admin-email">{userEmail}</span>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="admin-content">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <div className="sidebar-menu">
            <h3>Menu</h3>
            <ul>
              <li className="active">
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </li>
              <li>
                <i className="fas fa-book"></i> Courses
              </li>
              <li>
                <i className="fas fa-users"></i> Students
              </li>
              <li>
                <i className="fas fa-chart-bar"></i> Analytics
              </li>
              <li>
                <i className="fas fa-cog"></i> Settings
              </li>
            </ul>
          </div>
        </div>

        {/* Main Panel */}
        <div className="main-panel">
          <div className="panel-header">
            <h1>Welcome Back, Admin</h1>
            <p>Last login: {new Date().toLocaleString()}</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-container">
            <div className="stat-card">
              <h3>Total Courses</h3>
              <p>45</p>
              <i className="fas fa-book"></i>
            </div>
            <div className="stat-card">
              <h3>Registered Students</h3>
              <p>1,234</p>
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-card">
              <h3>Pending Requests</h3>
              <p>12</p>
              <i className="fas fa-envelope"></i>
            </div>
          </div>

          {/* Recent Activities Table */}
          <div className="recent-activities">
            <h2>Recent Activities</h2>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Activity</th>
                  <th>User</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample data - replace with dynamic content */}
                <tr>
                  <td>10:30 AM</td>
                  <td>Course Updated: Web Development</td>
                  <td>admin@bitsathy.ac.in</td>
                  <td className="status-completed">Completed</td>
                </tr>
                <tr>
                  <td>09:15 AM</td>
                  <td>New Student Registration</td>
                  <td>student1@bitsathy.ac.in</td>
                  <td className="status-pending">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;