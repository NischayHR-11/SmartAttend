import React from 'react';
import './ContactSection.css';

const ContactSection = () => (
  <section className="contact-section" id="contact">
    <div className="contact-title">Contact Us</div>
    <form className="contact-form">
      <input type="text" placeholder="Your Name" className="contact-input" />
      <input type="email" placeholder="Your Email" className="contact-input" />
      <textarea placeholder="Message" className="contact-input" rows="4" />
      <button className="contact-btn" type="submit">Send Message</button>
    </form>
  </section>
);

export default ContactSection;
