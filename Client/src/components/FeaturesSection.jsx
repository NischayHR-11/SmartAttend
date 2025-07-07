import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => (
  <section className="features-section" id="features">
    <div className="features-title">Features</div>
    <div className="features-list">
      <div className="feature-card glassy-card">
        <div className="feature-card-inner">
          <div className="feature-icon blue"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#5B8CFF"/><path d="M16 10v8l6 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <div className="feature-label">Real-time Attendance</div>
          <div className="feature-desc">Track attendance instantly with AI-powered facial recognition.</div>
        </div>
      </div>
      <div className="feature-card glassy-card">
        <div className="feature-card-inner">
          <div className="feature-icon green"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="10" fill="#5BFFB8"/><path d="M16 10v8l6 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <div className="feature-label">Secure & Encrypted</div>
          <div className="feature-desc">All data is encrypted and privacy is protected by design.</div>
        </div>
      </div>
      <div className="feature-card glassy-card">
        <div className="feature-card-inner">
          <div className="feature-icon purple"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#A259FF"/><path d="M16 10v8l6 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <div className="feature-label">24/7 Monitoring</div>
          <div className="feature-desc">System is always on, providing round-the-clock monitoring.</div>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
