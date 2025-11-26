import React, { useState } from 'react';
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar';
import DashboardHeader from '../Components/Header/Header';
import Overview from '../Components/Dashboard/MainContent/Overview';
import Settings from '../Components/Dashboard/MainContent/Settings';
import '../styles/dashboard.css';
import Transactions from "../Components/Dashboard/MainContent/Transactions";


const Dashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview user={user} />;
      case 'settings':
        return <Settings user={user} />;
        case 'transactions':
      return <Transactions />;
      default:
        return <Overview user={user} />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={onLogout}
      />
      
      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <DashboardHeader 
          title={getSectionTitle(activeSection)}
          user={user}
        />
        
        {/* Content */}
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const getSectionTitle = (section) => {
  const titles = {
    'overview': 'Tableau de Bord',
    'transactions': 'Transactions',
    'categories': 'Catégories',
    'export': 'Export',
    'settings': 'Paramètres',

  };
  return titles[section] || 'Tableau de Bord';
};

export default Dashboard;