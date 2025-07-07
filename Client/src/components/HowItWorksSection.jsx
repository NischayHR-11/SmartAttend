import React from 'react';
import './HowItWorksSection.css';

const HowItWorksSection = () => (
  <section className="how-section" id="how">
    <div className="how-title">How It Works</div>
    <div className="how-steps">
      <div className="how-step">
        <div className="step-number">1</div>
        <div className="step-label">Face Detection</div>
        <div className="step-desc">AI scans and detects faces in real time.</div>
      </div>
      <div className="how-step">
        <div className="step-number">2</div>
        <div className="step-label">Recognition</div>
        <div className="step-desc">System matches faces to registered users.</div>
      </div>
      <div className="how-step">
        <div className="step-number">3</div>
        <div className="step-label">Attendance Marked</div>
        <div className="step-desc">Attendance is logged and securely stored.</div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
