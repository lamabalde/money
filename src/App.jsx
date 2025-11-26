import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import Hero from './Components/Hero/Hero';
import Features from './Components/Features/Features';
import DashboardPreview from './Components/DashboardPreview/DashboardPreview';
import HowItWorks from './Components/HowItWorks/HowItWorks';
import Testimonials from './Components/Testimonials/Testimonials';
import CTA from './Components/CTA/CTA';
import Footer from './Components/Footer/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

// Composant de navigation
const Navigate = ({ to }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(to);
  }, [navigate, to]);
  return null;
};

// Composant pour la page d'accueil
const HomePage = ({ darkMode, setDarkMode, isAuthenticated, user, onLogout }) => (
  <>
    <Header 
      darkMode={darkMode} 
      setDarkMode={setDarkMode}
      isAuthenticated={isAuthenticated}
      user={user}
      onLogout={onLogout}
    />
    <Hero />
    <Features />
    <DashboardPreview />
    <HowItWorks />
    <Testimonials />
    <CTA />
    <Footer />
  </>
);

const App = () => {
  // Initialisation de l'état avec les valeurs du localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Gérer les redirections basées sur l'authentification
  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/dashboard');
    } else if (!isAuthenticated && location.pathname === '/dashboard') {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Gérer le thème
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    if (darkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div className={`App ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <Routes>
        {/* Page d'accueil publique */}
        <Route path="/" element={
          <HomePage 
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
        } />
        
        {/* Pages d'authentification */}
        <Route path="/login" element={
          !isAuthenticated ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Navigate to="/dashboard" />
          )
        } />
        
        <Route path="/register" element={
          !isAuthenticated ? (
            <Register onLogin={handleLogin} />
          ) : (
            <Navigate to="/dashboard" />
          )
        } />

        {/* Dashboard protégé */}
        <Route path="/dashboard/*" element={
          isAuthenticated ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        } />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;