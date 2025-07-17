import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalClasses: 0,
    attendedClasses: 0,
    attendancePercentage: 0,
    todayStatus: 'Not Marked'
  });

  useEffect(() => {
    // Fetch student statistics
    // This would be replaced with actual API calls
    setStats({
      totalClasses: 45,
      attendedClasses: 40,
      attendancePercentage: 89,
      todayStatus: 'Present'
    });
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';  // Use direct browser navigation for more reliable redirection
  };

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Student Dashboard</h1>
        </div>
        <div className="dashboard-actions">
          <button className="notification-btn" onClick={toggleNotifications}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {showNotifications && <span className="notification-dot"></span>}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
      
      <div className="dashboard-welcome">
        <p>Welcome back, {user?.firstName} {user?.lastName}!</p>
      </div>

      {showNotifications && (
        <div className="notifications-panel">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <button onClick={toggleNotifications}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="notifications-list">
            <div className="notification-item">
              <div className="notification-icon new">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="notification-content">
                <div className="notification-text">Your attendance for today has been marked</div>
                <div className="notification-time">30 minutes ago</div>
              </div>
            </div>
            <div className="notification-item">
              <div className="notification-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="notification-content">
                <div className="notification-text">New assignment posted in Mathematics</div>
                <div className="notification-time">2 days ago</div>
              </div>
            </div>
            <div className="notification-item">
              <div className="notification-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8v4m0 4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="notification-content">
                <div className="notification-text">Reminder: Complete your profile information</div>
                <div className="notification-time">3 days ago</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.attendancePercentage}%</div>
            <div className="stat-label">Attendance Rate</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.attendedClasses}/{stats.totalClasses}</div>
            <div className="stat-label">Classes Attended</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.todayStatus}</div>
            <div className="stat-label">Today's Status</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Recent Attendance</h2>
          <div className="attendance-list">
            <div className="attendance-item">
              <div className="attendance-date">Jan 15, 2025</div>
              <div className="attendance-subject">Mathematics</div>
              <div className="attendance-status present">Present</div>
            </div>
            <div className="attendance-item">
              <div className="attendance-date">Jan 14, 2025</div>
              <div className="attendance-subject">Physics</div>
              <div className="attendance-status present">Present</div>
            </div>
            <div className="attendance-item">
              <div className="attendance-date">Jan 13, 2025</div>
              <div className="attendance-subject">Chemistry</div>
              <div className="attendance-status absent">Absent</div>
            </div>
            <div className="attendance-item">
              <div className="attendance-date">Jan 12, 2025</div>
              <div className="attendance-subject">English</div>
              <div className="attendance-status present">Present</div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Profile Information</h2>
          <div className="profile-info">
            <div className="profile-item">
              <span className="profile-label">Student ID:</span>
              <span className="profile-value">{user?.studentId}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{user?.email}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Department:</span>
              <span className="profile-value">{user?.department}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Phone:</span>
              <span className="profile-value">{user?.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
