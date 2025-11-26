import React, { useState, useEffect } from 'react';
import './Overview.css';

const Overview = ({ user }) => {
  const [dateRange, setDateRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Composant Carte Statistique
  const StatCard = ({ title, value, subtitle, trend, icon, color, onClick }) => (
    <div className={`stat-card ${color}`} onClick={onClick}>
      <div className="stat-header">
        <div className="stat-icon">{icon}</div>
        <div className="stat-trend">{trend}</div>
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <div className="stat-value">{value}</div>
        <p className="stat-subtitle">{subtitle}</p>
      </div>
    </div>
  );

  // Composant Graphique Simple
  const SimpleChart = ({ data, type = 'bar' }) => (
    <div className="simple-chart">
      <div className="chart-bars">
        {data.map((item, index) => (
          <div key={index} className="chart-bar-container">
            <div 
              className="chart-bar" 
              style={{ height: `${item.value}%` }}
              title={`${item.label}: ${item.amount}`}
            >
              <div className="bar-value">{item.value}%</div>
            </div>
            <span className="bar-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Composant Transaction
  const TransactionItem = ({ transaction }) => (
    <div className="transaction-item">
      <div className="transaction-main">
        <div className="transaction-icon">{transaction.icon}</div>
        <div className="transaction-info">
          <h4>{transaction.name}</h4>
          <div className="transaction-meta">
            <span className="category">{transaction.category}</span>
            <span className="date">{transaction.date}</span>
          </div>
        </div>
      </div>
      <div className={`transaction-amount ${transaction.type}`}>
        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} F CFA
      </div>
    </div>
  );

  // Composant Filtres
  const FilterButtons = () => (
    <div className="filter-buttons">
      {['all', 'income', 'expense'].map(filter => (
        <button
          key={filter}
          className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter === 'all' && '📊 Tous'}
          {filter === 'income' && '📥 Revenus'}
          {filter === 'expense' && '📤 Dépenses'}
        </button>
      ))}
    </div>
  );

  // Composant Graphique Ligne
  const LineChart = ({ data }) => (
    <div className="line-chart">
      <div className="chart-grid">
        {[0, 25, 50, 75, 100].map((line, index) => (
          <div key={index} className="grid-line" style={{ bottom: `${line}%` }}>
            <span className="grid-label">{line}%</span>
          </div>
        ))}
      </div>
      <div className="chart-line income-line">
        {data.map((point, index) => (
          <div
            key={index}
            className="data-point"
            style={{ 
              left: `${(index / (data.length - 1)) * 100}%`,
              bottom: `${point.income}%`
            }}
          ></div>
        ))}
      </div>
      <div className="chart-line expense-line">
        {data.map((point, index) => (
          <div
            key={index}
            className="data-point"
            style={{ 
              left: `${(index / (data.length - 1)) * 100}%`,
              bottom: `${point.expenses}%`
            }}
          ></div>
        ))}
      </div>
      <div className="chart-labels">
        {data.map((point, index) => (
          <span key={index} className="chart-label">{point.month}</span>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockData = {
          // Statistiques principales
          mainStats: [
            {
              title: "Solde Actuel",
              value: "208 366 F CFA",
              subtitle: "+2.5% vs mois dernier",
              trend: "📈",
              icon: "💰",
              color: "primary"
            },
            {
              title: "Revenu Mensuel",
              value: "2 107 000 F CFA",
              subtitle: "+15% d'augmentation",
              trend: "🎯",
              icon: "📥",
              color: "success"
            },
            {
              title: "Dépenses Mensuelles",
              value: "1 898 634 F CFA",
              subtitle: "-8% de réduction",
              trend: "📉",
              icon: "📤",
              color: "warning"
            },
            {
              title: "Transactions",
              value: "66",
              subtitle: "Ce mois",
              trend: "🔄",
              icon: "💳",
              color: "info"
            }
          ],

          // Données détaillées
          detailedStats: [
            {
              title: "Épargne Mensuelle",
              value: "208 366 F CFA",
              subtitle: "125% de l'objectif",
              icon: "🎯",
              progress: 125
            },
            {
              title: "Budget Restant",
              value: "101 366 F CFA",
              subtitle: "5% du budget total",
              icon: "📊",
              progress: 5
            },
            {
              title: "Dépenses Moyennes",
              value: "63 288 F CFA",
              subtitle: "Par jour",
              icon: "📅",
              progress: 75
            }
          ],

          // Transactions
          transactions: [
            { 
              id: 1, 
              name: 'Salaire Entreprise', 
              category: 'Revenu Fixe', 
              amount: 500000, 
              type: 'income', 
              date: '15 Nov',
              icon: '💼'
            },
            { 
              id: 2, 
              name: 'Loyer Appartement', 
              category: 'Logement', 
              amount: -150000, 
              type: 'expense', 
              date: '10 Nov',
              icon: '🏠'
            },
            { 
              id: 3, 
              name: 'Courses Supermarché', 
              category: 'Alimentation', 
              amount: -75000, 
              type: 'expense', 
              date: '08 Nov',
              icon: '🛒'
            },
            { 
              id: 4, 
              name: 'Projet Freelance', 
              category: 'Revenu Variable', 
              amount: 300000, 
              type: 'income', 
              date: '05 Nov',
              icon: '⚡'
            },
            { 
              id: 5, 
              name: 'Abonnement Internet', 
              category: 'Services', 
              amount: -25000, 
              type: 'expense', 
              date: '03 Nov',
              icon: '🌐'
            }
          ],

          // Données graphiques
          categoryData: [
            { label: 'Logement', value: 35, amount: '150K', color: '#FF6B6B' },
            { label: 'Alimentation', value: 18, amount: '75K', color: '#4ECDC4' },
            { label: 'Transport', value: 12, amount: '50K', color: '#45B7D1' },
            { label: 'Loisirs', value: 10, amount: '45K', color: '#96CEB4' },
            { label: 'Santé', value: 7, amount: '30K', color: '#FFEAA7' }
          ],

          // Données ligne de temps
          trendData: [
            { month: 'Jan', income: 60, expenses: 45 },
            { month: 'Fév', income: 65, expenses: 50 },
            { month: 'Mar', income: 70, expenses: 40 },
            { month: 'Avr', income: 68, expenses: 48 },
            { month: 'Mai', income: 72, expenses: 42 },
            { month: 'Jun', income: 75, expenses: 46 }
          ],

          // Alertes
          alerts: [
            {
              id: 1,
              type: 'warning',
              title: 'Budget quasi épuisé',
              message: '95% de votre budget mensuel utilisé',
              action: 'Ajuster le budget'
            },
            {
              id: 2,
              type: 'success',
              title: 'Objectif épargne atteint',
              message: '125% de votre objectif mensuel',
              action: 'Voir détail'
            },
            {
              id: 3,
              type: 'info',
              title: 'Nouvelle fonctionnalité',
              message: 'Export PDF maintenant disponible',
              action: 'Essayer'
            }
          ]
        };
        
        setDashboardData(mockData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dateRange]);

  // Filtrer les transactions
  const filteredTransactions = dashboardData?.transactions.filter(transaction => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'income') return transaction.type === 'income';
    if (activeFilter === 'expense') return transaction.type === 'expense';
    return true;
  });

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement de vos données financières...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">😕</div>
        <h3>Données non disponibles</h3>
        <p>Impossible de charger les données du tableau de bord</p>
        <button 
          className="retry-btn"
          onClick={() => window.location.reload()}
        >
          🔄 Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="overview-content">
      {/* En-tête */}
      <div className="content-header">
        <div className="user-welcome">
          <h1>Bonjour, {user?.firstName || 'ALEN'} 👋</h1>
          <p>Voici votre situation financière en temps réel</p>
        </div>
        <div className="header-controls">
          <select 
            className="period-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="export-btn">
            📊 Exporter Rapport
          </button>
        </div>
      </div>

      {/* Alertes rapides */}
      <div className="quick-alerts">
        {dashboardData.alerts.map(alert => (
          <div key={alert.id} className={`quick-alert ${alert.type}`}>
            <div className="alert-content">
              <span className="alert-icon">
                {alert.type === 'warning' && '⚠️'}
                {alert.type === 'success' && '✅'}
                {alert.type === 'info' && 'ℹ️'}
              </span>
              <div className="alert-text">
                <strong>{alert.title}</strong>
                <span>{alert.message}</span>
              </div>
            </div>
            <button className="alert-action">{alert.action}</button>
          </div>
        ))}
      </div>

      {/* Statistiques principales */}
      <div className="main-stats-grid">
        {dashboardData.mainStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            trend={stat.trend}
            icon={stat.icon}
            color={stat.color}
            onClick={() => console.log(`Clicked: ${stat.title}`)}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="main-content">
        {/* Colonne gauche */}
        <div className="left-column">
          {/* Graphique des tendances */}
          <div className="chart-widget">
            <div className="widget-header">
              <h3>📈 Évolution Revenus vs Dépenses</h3>
              <div className="chart-legend">
                <span className="legend-item income">Revenus</span>
                <span className="legend-item expense">Dépenses</span>
              </div>
            </div>
            <LineChart data={dashboardData.trendData} />
          </div>

          {/* Statistiques détaillées */}
          <div className="detailed-stats">
            <h3>📊 Statistiques Détaillées</h3>
            <div className="stats-grid">
              {dashboardData.detailedStats.map((stat, index) => (
                <div key={index} className="detailed-stat">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <h4>{stat.title}</h4>
                    <div className="stat-value">{stat.value}</div>
                    <p>{stat.subtitle}</p>
                  </div>
                  <div className="progress-circle">
                    <div 
                      className="circle-fill"
                      style={{ 
                        background: `conic-gradient(#3B82F6 ${stat.progress}%, #E5E7EB 0)` 
                      }}
                    ></div>
                    <span className="progress-text">{stat.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="right-column">
          {/* Filtres et Transactions */}
          <div className="transactions-widget">
            <div className="widget-header">
              <h3>💳 Transactions Récentes</h3>
              <FilterButtons />
            </div>
            <div className="transactions-list">
              {filteredTransactions.map(transaction => (
                <TransactionItem 
                  key={transaction.id} 
                  transaction={transaction} 
                />
              ))}
            </div>
            <button className="view-all-btn">
              Voir toutes les transactions →
            </button>
          </div>

          {/* Répartition des dépenses */}
          <div className="categories-widget">
            <div className="widget-header">
              <h3>📋 Répartition par Catégorie</h3>
              <button className="detail-btn">Détail</button>
            </div>
            <SimpleChart data={dashboardData.categoryData} />
            <div className="categories-list">
              {dashboardData.categoryData.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-color" style={{ backgroundColor: category.color }}></div>
                  <span className="category-name">{category.label}</span>
                  <span className="category-amount">{category.amount}</span>
                  <span className="category-percentage">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;