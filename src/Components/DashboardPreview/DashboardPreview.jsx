import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './DashboardPreview.css';

const DashboardPreview = () => {
  // Données pour les graphiques
  const expenseData = [
    { name: 'Logement', value: 45, color: '#00D4AA' },
    { name: 'Alimentation', value: 20, color: '#4361EE' },
    { name: 'Transport', value: 15, color: '#7209B7' },
    { name: 'Loisirs', value: 12, color: '#FFA502' },
    { name: 'Autres', value: 8, color: '#FF4757' }
  ];

  const monthlyData = [
    { month: 'Jan', income: 3200, expenses: 1845 },
    { month: 'Fév', income: 3250, expenses: 1920 },
    { month: 'Mar', income: 3300, expenses: 1740 },
    { month: 'Avr', income: 3350, expenses: 1890 },
    { month: 'Mai', income: 3400, expenses: 1820 },
    { month: 'Jun', income: 3450, expenses: 1760 }
  ];

  const recentTransactions = [
    { id: 1, name: 'Salaire', category: 'Revenu', amount: 3250, type: 'income', date: '15 Jun' },
    { id: 2, name: 'Loyer', category: 'Logement', amount: 850, type: 'expense', date: '10 Jun' },
    { id: 3, name: 'Courses', category: 'Alimentation', amount: 245, type: 'expense', date: '08 Jun' },
    { id: 4, name: 'Freelance', category: 'Revenu', amount: 1200, type: 'income', date: '05 Jun' }
  ];

  return (
    <section id="dashboard" className="section dashboard-preview">
      <div className="container">
        <h2 className="section-title">Tableau de bord intelligent</h2>
        <p className="section-subtitle">
          Visualisez vos finances en temps réel avec des graphiques interactifs et des insights personnalisés
        </p>
        
        <div className="dashboard-grid">
          {/* Graphique en camembert des dépenses */}
          <div className="dashboard-card">
            <h3>Répartition des dépenses</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              {expenseData.map((item, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Graphique en barres revenus/dépenses */}
          <div className="dashboard-card">
            <h3>Évolution mensuelle</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="var(--positive)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="var(--negative)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dernières transactions */}
          <div className="dashboard-card transactions">
            <h3>Dernières transactions</h3>
            <div className="transactions-list">
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <div className="transaction-name">{transaction.name}</div>
                    <div className="transaction-category">{transaction.category}</div>
                  </div>
                  <div className="transaction-details">
                    <div className={`transaction-amount ${transaction.type}`}>
                      {transaction.type === 'income' ? '+' : '-'}€{transaction.amount}
                    </div>
                    <div className="transaction-date">{transaction.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistiques rapides */}
          
          </div>
      </div>
    </section>
  );
};

export default DashboardPreview;