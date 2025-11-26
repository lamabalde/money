import React from 'react';

const Sidebar = ({ activeSection, onSectionChange, onLogout }) => {
  const menuItems = [
    { id: 'overview', icon: '📊', label: 'Tableau de Bord' },
    { id: 'transactions', icon: '💳', label: 'Transactions' },
    { id: 'categories', icon: '🏷️', label: 'Catégories' },
    { id: 'export', icon: '📤', label: 'Export' },
    { id: 'settings', icon: '⚙️', label: 'Paramètres' },
    { id: 'transactions', icon: '💳', label: 'Transactions' },

  ];

  return (
    <div className="dashboard-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">💎</div>
        <span className="logo-text">MoneyWise</span>
      </div>

      {/* Menu Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Déconnexion en bas */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          <span className="logout-icon">🚪</span>
          <span className="logout-label">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;