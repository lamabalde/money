import React from 'react';

const RecentTransactions = ({ transactions }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'Revenu': '💰',
      'Logement': '🏠',
      'Alimentation': '🛒',
      'Transport': '🚗',
      'Loisirs': '🎮',
      'Santé': '🏥',
      'Autres': '📦'
    };
    return icons[category] || '💳';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="dashboard-widget" style={{ gridColumn: 'span 6' }}>
      <div className="widget-header">
        <h3 className="widget-title">Dernières transactions</h3>
        <div className="widget-actions">
          <button className="widget-action-btn">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>

      <div className="transactions-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-icon">
              {getCategoryIcon(transaction.category)}
            </div>
            <div className="transaction-details">
              <div className="transaction-name">{transaction.name}</div>
              <div className="transaction-category">{transaction.category}</div>
            </div>
            <div className="transaction-amount">
              <span className={`amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : '-'}{transaction.amount} €
              </span>
              <span className="transaction-date">
                {formatDate(transaction.date)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="transactions-footer">
        <button className="view-all-btn">
          Voir toutes les transactions
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;