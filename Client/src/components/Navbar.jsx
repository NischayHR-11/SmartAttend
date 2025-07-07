import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="logo-section">
        <div className="logo-icon">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="10" fill="url(#paint0_linear_1_2)"/>
            <path d="M18 11C14.13 11 11 14.13 11 18C11 21.87 14.13 25 18 25C21.87 25 25 21.87 25 18C25 14.13 21.87 11 18 11ZM18 23C15.24 23 13 20.76 13 18C13 15.24 15.24 13 18 13C20.76 13 23 15.24 23 18C23 20.76 20.76 23 18 23ZM18 15C16.34 15 15 16.34 15 18C15 19.66 16.34 21 18 21C19.66 21 21 19.66 21 18C21 16.34 19.66 15 18 15Z" fill="white"/>
            <defs>
              <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5B8CFF"/>
                <stop offset="1" stopColor="#A259FF"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="logo-text">SmartAttend</span>
      </div>
      <button className={`menu-toggle${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      {menuOpen && (
        <div className="mobile-menu">
          <nav className="nav-links show">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#benefits" onClick={() => setMenuOpen(false)}>Benefits</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#footer" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <div className="nav-actions show">
            <button className="sign-in">Sign In</button>
            <button className="get-started">Get Started</button>
          </div>
        </div>
      )}
      <nav className="nav-links desktop">
        <a href="#features">Features</a>
        <a href="#how">How It Works</a>
        <a href="#benefits">Benefits</a>
        <a href="#pricing">Pricing</a>
        <a href="#footer">Contact</a>
      </nav>
      <div className="nav-actions desktop">
        <button className="sign-in">Sign In</button>
        <button className="get-started">Get Started</button>
      </div>
    </header>
  );
};

export default Navbar;
