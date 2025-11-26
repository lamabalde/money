import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ darkMode, setDarkMode, isAuthenticated, user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    closeMobileMenu();
  };

  // Ne pas afficher le header sur le dashboard
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">💎</div>
            <span className="logo-text">MoneyWise</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <a href="#features" onClick={closeMobileMenu}>Fonctionnalités</a>
            <a href="#dashboard" onClick={closeMobileMenu}>Tableau de bord</a>
            <a href="#how-it-works" onClick={closeMobileMenu}>Fonctionnement</a>
            <a href="#testimonials" onClick={closeMobileMenu}>Avis</a>
            
            {/* Actions dans la nav */}
            <div className="nav-actions">
              {isAuthenticated ? (
                <>
                  <div className="user-welcome">
                    Bonjour, {user?.firstName} 👋
                  </div>
                  <Link to="/dashboard" className="btn btn-secondary" onClick={closeMobileMenu}>
                    Tableau de bord
                  </Link>
                  <button className="btn btn-primary" onClick={handleLogout}>
                    Disconnect
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary" onClick={closeMobileMenu}>
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary" onClick={closeMobileMenu}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Actions Header */}
          <div className="header-actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={darkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Menu mobile"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;