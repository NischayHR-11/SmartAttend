import React from 'react';
import './PricingSection.css';

const PricingSection = () => (
  <section className="pricing-section" id="pricing">
    <div className="pricing-title">Pricing</div>
    <div className="pricing-cards">
      <div className="pricing-card">
        <div className="plan-name">Starter</div>
        <div className="plan-price">Free</div>
        <div className="plan-desc">Basic features for small teams.</div>
        <button className="plan-btn">Get Started</button>
      </div>
      <div className="pricing-card popular">
        <div className="plan-name">Pro</div>
        <div className="plan-price">$19/mo</div>
        <div className="plan-desc">Advanced features for growing businesses.</div>
        <button className="plan-btn">Start Free Trial</button>
      </div>
      <div className="pricing-card">
        <div className="plan-name">Enterprise</div>
        <div className="plan-price">Custom</div>
        <div className="plan-desc">Tailored solutions for large organizations.</div>
        <button className="plan-btn">Contact Us</button>
      </div>
    </div>
  </section>
);

export default PricingSection;
