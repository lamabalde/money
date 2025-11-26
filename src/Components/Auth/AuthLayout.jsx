import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';

const AuthLayout = ({ children }) => {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('darkMode', (!isDark).toString());
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        {/* Logo centré en haut */}
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">M</div>
          <span className="auth-logo-text">MoneyWise</span>
        </Link>
        
        {/* Bouton thème en haut à droite */}
        <button 
          className="auth-theme-toggle"
          onClick={toggleTheme}
          aria-label="Basculer le thème"
        >
          <span className="material-symbols-outlined">
            {document.documentElement.classList.contains('dark') ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </header>

      <main className="auth-main">
        <div className="auth-card">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;