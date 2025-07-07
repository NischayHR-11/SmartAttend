import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer-custom">
    <div className="footer-container">
      <div className="footer-col left">
        <div className="footer-logo-row">
          <span className="footer-logo-icon">
            <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="10" fill="url(#paint0_linear_1_2)"/>
              <path d="M18 11C14.13 11 11 14.13 11 18C11 21.87 14.13 25 18 25C21.87 25 25 21.87 25 18C25 14.13 21.87 11 18 11ZM18 23C15.24 23 13 20.76 13 18C13 15.24 15.24 13 18 13C20.76 13 23 15.24 23 18C23 20.76 20.76 23 18 23ZM18 15C16.34 15 15 16.34 15 18C15 19.66 16.34 21 18 21C19.66 21 21 19.66 21 18C21 16.34 19.66 15 18 15Z" fill="white"/>
              <defs>
                <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#5B8CFF"/>
                  <stop offset="1" stopColor="#A259FF"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="footer-logo-text">SmartAttend</span>
        </div>
        <div className="footer-desc">
          Revolutionary facial recognition technology that transforms how organizations track attendance. Secure, accurate, and effortless attendance management for the modern workplace.
        </div>
        <div className="footer-contact-row">
          <span className="footer-icon">📧</span>
          <span>contact@smartattend.com</span>
        </div>
        <div className="footer-contact-row">
          <span className="footer-icon">📞</span>
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="footer-contact-row">
          <span className="footer-icon">📍</span>
          <span>123 Innovation Drive, Tech City, TC 12345</span>
        </div>
      </div>
      <div className="footer-col">
        <div className="footer-col-title">Product</div>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#integration">Integration</a>
        <a href="#api">API Documentation</a>
      </div>
      <div className="footer-col">
        <div className="footer-col-title">Company</div>
        <a href="#about">About Us</a>
        <a href="#careers">Careers</a>
        <a href="#press">Press</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="footer-col">
        <div className="footer-col-title">Support</div>
        <a href="#help">Help Center</a>
        <a href="#community">Community</a>
        <a href="#training">Training</a>
        <a href="#status">Status</a>
      </div>
    </div>
  </footer>
);

export default Footer;
