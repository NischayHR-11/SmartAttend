import React from 'react';
import './DashboardCard.css';

const DashboardCard = () => (
  <div className="dashboard-card">
    <div className="dashboard-card-inner">
      <div className="dashboard-header">
        <div className="window-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="dashboard-title">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="5" fill="#5B8CFF"/><path d="M10 6C8.067 6 6.5 7.567 6.5 9.5C6.5 11.433 8.067 13 10 13C11.933 13 13.5 11.433 13.5 9.5C13.5 7.567 11.933 6 10 6ZM10 12C8.619 12 7.5 10.881 7.5 9.5C7.5 8.119 8.619 7 10 7C11.381 7 12.5 8.119 12.5 9.5C12.5 10.881 11.381 12 10 12ZM10 8C9.172 8 8.5 8.672 8.5 9.5C8.5 10.328 9.172 11 10 11C10.828 11 11.5 10.328 11.5 9.5C11.5 8.672 10.828 8 10 8Z" fill="#fff"/></svg>
        </span>
      </div>
      <div className="dashboard-users">
        <div className="user-row">
          <span className="user-avatar purple">JD</span>
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <span className="user-time">Checked in at 9:00 AM</span>
          </div>
          <span className="user-status online"></span>
        </div>
        <div className="user-row">
          <span className="user-avatar green">SW</span>
          <div className="user-info">
            <span className="user-name">Sarah Wilson</span>
            <span className="user-time">Checked in at 8:45 AM</span>
          </div>
          <span className="user-status online"></span>
        </div>
      </div>
      <div className="dashboard-features">
        <div className="feature-block">
          <span className="feature-icon"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#5B8CFF"/><path d="M12 8v4l3 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span className="feature-label">Real-time<br/>Tracking</span>
        </div>
        <div className="feature-block">
          <span className="feature-icon"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#5BFFB8"/><path d="M12 8v4l3 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span className="feature-label">Secure<br/>Encrypted</span>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardCard;
