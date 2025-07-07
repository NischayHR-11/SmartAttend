import React from 'react';
import './PricingSection.css';

const PricingSection = () => (
  <section className="pricing-section" id="pricing">
    <div className="pricing-container">
      <div className="pricing-header">
        <div className="pricing-title">Choose Your Plan</div>
        <div className="pricing-subtitle">Start free, scale as you grow</div>
      </div>
      <div className="pricing-cards">
        <div className="pricing-card starter">
          <div className="plan-badge">Free</div>
          <div className="plan-name">Starter</div>
          <div className="plan-price">
            <span className="currency">$</span>
            <span className="amount">0</span>
            <span className="period">/month</span>
          </div>
          <div className="plan-desc">Basic attendance tracking</div>
          <div className="plan-features">
            <div className="feature">✓ Up to 10 employees</div>
            <div className="feature">✓ Basic reporting</div>
            <div className="feature">✓ Email support</div>
          </div>
          <button className="plan-btn">Get Started</button>
        </div>
        <div className="pricing-card popular">
          <div className="plan-badge popular-badge">Popular</div>
          <div className="plan-name">Pro</div>
          <div className="plan-price">
            <span className="currency">$</span>
            <span className="amount">19</span>
            <span className="period">/month</span>
          </div>
          <div className="plan-desc">Advanced features for teams</div>
          <div className="plan-features">
            <div className="feature">✓ Unlimited employees</div>
            <div className="feature">✓ Advanced analytics</div>
            <div className="feature">✓ Priority support</div>
          </div>
          <button className="plan-btn">Start Trial</button>
        </div>
        <div className="pricing-card enterprise">
          <div className="plan-badge">Enterprise</div>
          <div className="plan-name">Enterprise</div>
          <div className="plan-price">
            <span className="amount">Custom</span>
          </div>
          <div className="plan-desc">Solutions for large organizations</div>
          <div className="plan-features">
            <div className="feature">✓ Everything in Pro</div>
            <div className="feature">✓ Dedicated support</div>
            <div className="feature">✓ Custom integrations</div>
          </div>
          <button className="plan-btn">Contact Us</button>
        </div>
      </div>
    </div>
  </section>
);

export default PricingSection;
