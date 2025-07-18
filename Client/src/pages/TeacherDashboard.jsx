import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS, apiCall } from '../config/api';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    todayClasses: 0,
    attendanceRate: 0
  });

  const [showStudentModal, setShowStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({
    name: '',
    usn: '',
    rollNo: '',
    branch: '',
    semester: ''
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

  const handleStudentFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall(API_ENDPOINTS.REGISTER_STUDENT, {
        method: 'POST',
        body: JSON.stringify(studentForm),
      });

      if (response.status === 'success') {
        // Reset form and close modal
        setStudentForm({
          name: '',
          usn: '',
          rollNo: '',
          branch: '',
          semester: ''
        });
        setShowStudentModal(false);
        toast.success(
          `🎉 ${response.data.student.name} registered successfully!`,
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'custom-success-toast',
            bodyClassName: 'custom-toast-body',
            progressClassName: 'custom-progress-bar'
          }
        );
        
        // Refresh student count
        setStats(prev => ({
          ...prev,
          totalStudents: prev.totalStudents + 1
        }));
      }
    } catch (error) {
      console.error('Error registering student:', error);
      
      // Extract specific error message
      let errorMessage = 'Registration Failed!';
      
      if (error.message) {
        // Handle validation errors
        if (error.message.includes('validation failed')) {
          errorMessage = 'Validation Error: Please check your input';
        } else if (error.message.includes('USN already exists')) {
          errorMessage = 'Student with this USN already exists';
        } else if (error.message.includes('USN format')) {
          errorMessage = 'Invalid USN format (e.g., 1MS21CS001)';
        } else if (error.message.includes('Branch')) {
          errorMessage = 'Please select a valid branch';
        } else if (error.message.includes('Semester')) {
          errorMessage = 'Please select a valid semester';
        } else if (error.message.includes('name')) {
          errorMessage = 'Student name is required';
        } else if (error.message.includes('rollNo')) {
          errorMessage = 'Roll number is required';
        } else if (error.message.includes('Network')) {
          errorMessage = 'Network error. Please check your connection';
        } else if (error.message.includes('CORS')) {
          errorMessage = 'Server connection error. Please try again';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'custom-error-toast',
        bodyClassName: 'custom-toast-body',
        progressClassName: 'custom-progress-bar'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({
      ...prev,
      [name]: value
    }));
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

      <div className="dashboard-content-wrapper">
        <div className="dashboard-main">
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
        </div>

        <div className="dashboard-sidebar">
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

          <div className="register-student-card">
            <div className="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Register Student</h3>
            <p>Add new students to your class roster and manage their information effectively.</p>
            <button 
              className="register-btn"
              onClick={() => setShowStudentModal(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Enter Student Portal
            </button>
          </div>
        </div>
      </div>

      {/* Student Registration Modal */}
      {showStudentModal && (
        <div className="modal-overlay" onClick={() => setShowStudentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Register Student</h2>
              <button 
                className="close-btn"
                onClick={() => setShowStudentModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleStudentFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Student Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={studentForm.name}
                  onChange={handleInputChange}
                  placeholder="Enter student's full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="usn">USN (University Seat Number)</label>
                <input
                  type="text"
                  id="usn"
                  name="usn"
                  value={studentForm.usn}
                  onChange={handleInputChange}
                  placeholder="Enter USN (e.g., 1MS21CS001 or 01JST22UCS097)"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rollNo">Roll Number</label>
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  value={studentForm.rollNo}
                  onChange={handleInputChange}
                  placeholder="Enter roll number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <select
                  id="branch"
                  name="branch"
                  value={studentForm.branch}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">Computer Science Engineering (CSE)</option>
                  <option value="ISE">Information Science Engineering (ISE)</option>
                  <option value="ECE">Electronics & Communication Engineering (ECE)</option>
                  <option value="EEE">Electrical & Electronics Engineering (EEE)</option>
                  <option value="ME">Mechanical Engineering (ME)</option>
                  <option value="CE">Civil Engineering (CE)</option>
                  <option value="IE">Industrial Engineering (IE)</option>
                  <option value="BT">Biotechnology (BT)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <select
                  id="semester"
                  name="semester"
                  value={studentForm.semester}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">3rd Semester</option>
                  <option value="4">4th Semester</option>
                  <option value="5">5th Semester</option>
                  <option value="6">6th Semester</option>
                  <option value="7">7th Semester</option>
                  <option value="8">8th Semester</option>
                </select>
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowStudentModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Register Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
        transition={Slide}
      />
    </div>
  );
};

export default TeacherDashboard;
