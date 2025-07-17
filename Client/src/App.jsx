import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import BenefitsSection from './components/BenefitsSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// Home page component
const HomePage = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <BenefitsSection />
    <PricingSection />
    <Footer />
  </>
);

// Layout component to conditionally render Navbar
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isDashboardPage = 
    location.pathname === '/student-dashboard' || 
    location.pathname === '/teacher-dashboard';
  
  return (
    <>
      {!isDashboardPage && <Navbar />}
      {children}
    </>
  );
};

// Protected route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, getUserType, loading } = useAuth();
  
  // Show nothing while auth state is loading
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  
  if (requiredRole && getUserType() !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Main application with routing
function AppWithRoutes() {
  return (
    <div className="main-bg">
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher-dashboard" 
            element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AppLayout>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppWithRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
