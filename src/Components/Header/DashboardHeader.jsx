import React from 'react';

const DashboardHeader = ({ title, user }) => {
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Utilisateur';

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">Bonjour, {fullName} 👋</p>
      </div>
      
      <div className="header-right">
        <div className="user-info">
          <div className="user-avatar">
            {user ? user.avatar : 'U'}
          </div>
          <div className="user-details">
            <span className="user-name">{fullName}</span>
            <span className="user-status">En ligne</span>
          </div>
        </div>
        
        <button className="notification-btn">
          <span className="material-symbols-outlined">notifications</span>
          <span className="notification-badge">3</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;