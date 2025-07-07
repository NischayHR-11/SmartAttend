import React from 'react';
import './BenefitsSection.css';

const BenefitsSection = () => (
  <section className="benefits-section" id="benefits">
    <div className="benefits-title">Benefits</div>
    <div className="benefits-list">
      <div className="benefit-card glassy-card">
        <div className="benefit-card-inner">
          <div className="benefit-label">No Manual Entry</div>
          <div className="benefit-desc">Eliminate errors and save time with automated attendance.</div>
        </div>
      </div>
      <div className="benefit-card glassy-card">
        <div className="benefit-card-inner">
          <div className="benefit-label">Accurate Reports</div>
          <div className="benefit-desc">Get detailed, real-time attendance analytics.</div>
        </div>
      </div>
      <div className="benefit-card glassy-card">
        <div className="benefit-card-inner">
          <div className="benefit-label">Easy Integration</div>
          <div className="benefit-desc">Works seamlessly with your existing systems.</div>
        </div>
      </div>
    </div>
  </section>
);

export default BenefitsSection;
