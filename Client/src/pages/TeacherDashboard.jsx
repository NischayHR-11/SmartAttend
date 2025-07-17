import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    todayClasses: 0,
    attendanceRate: 0
  });

  useEffect(() => {
    // Fetch teacher statistics
    // This would be replaced with actual API calls
    setStats({
      totalStudents: 120,
      totalClasses: 25,
      todayClasses: 3,
      attendanceRate: 87
    });
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';  // Redirect to home page after logout
  };

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Teacher Dashboard</h1>
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
        <p style={{ marginLeft: '20px' }}>Welcome back, {user?.firstName} {user?.lastName}!</p>
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
                <div className="notification-text">New attendance request for Physics class</div>
                <div className="notification-time">2 minutes ago</div>
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
                <div className="notification-text">Attendance report for May generated</div>
                <div className="notification-time">1 day ago</div>
              </div>
            </div>
            <div className="notification-item">
              <div className="notification-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8v4m0 4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="notification-content">
                <div className="notification-text">Schedule change for Mathematics class</div>
                <div className="notification-time">2 days ago</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalStudents}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7V4h16v3M9 20h6M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalClasses}</div>
            <div className="stat-label">Total Classes</div>
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
            <div className="stat-value">{stats.todayClasses}</div>
            <div className="stat-label">Today's Classes</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.attendanceRate}%</div>
            <div className="stat-label">Avg. Attendance</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Today's Classes</h2>
          <div className="classes-list">
            <div className="class-item">
              <div className="class-time">09:00 AM</div>
              <div className="class-subject">Mathematics - Grade 10</div>
              <div className="class-status">
                <button className="mark-attendance-btn">Mark Attendance</button>
                <button className="download-excel-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 3v4a1 1 0 001 1h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 9h1v8H9M14 9h1v8h-1M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Excel
                </button>
              </div>
            </div>
            <div className="class-item">
              <div className="class-time">11:00 AM</div>
              <div className="class-subject">Physics - Grade 11</div>
              <div className="class-status">
                <button className="mark-attendance-btn">Mark Attendance</button>
                <button className="download-excel-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 3v4a1 1 0 001 1h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 9h1v8H9M14 9h1v8h-1M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Excel
                </button>
              </div>
            </div>
            <div className="class-item">
              <div className="class-time">02:00 PM</div>
              <div className="class-subject">Chemistry - Grade 12</div>
              <div className="class-status">
                <button className="mark-attendance-btn">Mark Attendance</button>
                <button className="download-excel-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 3v4a1 1 0 001 1h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 9h1v8H9M14 9h1v8h-1M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-time">2 hours ago</div>
              <div className="activity-description">Marked attendance for Mathematics class</div>
            </div>
            <div className="activity-item">
              <div className="activity-time">Yesterday</div>
              <div className="activity-description">Updated Physics class schedule</div>
            </div>
            <div className="activity-item">
              <div className="activity-time">2 days ago</div>
              <div className="activity-description">Generated attendance report</div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Profile Information</h2>
          <div className="profile-info">
            <div className="profile-item">
              <span className="profile-label">Teacher ID:</span>
              <span className="profile-value">{user?.teacherId}</span>
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

export default TeacherDashboard;
