import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import BenefitsSection from './components/BenefitsSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="main-bg">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <PricingSection />
      <Footer />
    </div>
  );
}

export default App;
