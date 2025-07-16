import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import DashboardCard from './DashboardCard';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/auth');
  };

  return (
    <section className="hero-section">
      <div className="hero-left">
        <div className="ai-badge">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#5B8CFF"/><path d="M7.5 10.5l2 2 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>AI-Powered Recognition</span>
        </div>
        <h1 className="hero-title">
          Smart Attendance<br/>
          <span className="gradient-text">Made Simple</span>
        </h1>
        <p className="hero-desc">
          Revolutionary facial recognition technology that transforms how organizations track attendance. Secure, accurate, and effortless.
        </p>
        <div className="hero-actions">
          <button className="start-trial" onClick={handleStartTrial}>Start Free Trial</button>
        </div>
        <div className="hero-stats">
          <div>
            <span className="stat-value">99.9%</span>
            <span className="stat-label">Accuracy</span>
          </div>
          <div>
            <span className="stat-value">&lt; 1s</span>
            <span className="stat-label">Recognition</span>
          </div>
          <div>
            <span className="stat-value">24/7</span>
            <span className="stat-label">Monitoring</span>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <DashboardCard />
      </div>
    </section>
  );
};

export default HeroSection;
