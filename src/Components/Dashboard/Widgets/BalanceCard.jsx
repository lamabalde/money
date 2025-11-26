import React from 'react';

const BalanceCard = ({ balance, income, expenses, savings }) => {
  return (
    <div className="dashboard-widget" style={{ gridColumn: 'span 4' }}>
      <div className="widget-header">
        <h3 className="widget-title">Solde actuel</h3>
        <div className="widget-actions">
          <button className="widget-action-btn">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>

      <div className="balance-content">
        <div className="balance-amount">
          <span className="amount">{balance.toLocaleString('fr-FR')} €</span>
          <span className="trend positive">+2.5% vs mois dernier</span>
        </div>

        <div className="balance-stats">
          <div className="stat-item">
            <div className="stat-label">Revenus</div>
            <div className="stat-value positive">+{income.toLocaleString('fr-FR')} €</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Dépenses</div>
            <div className="stat-value negative">-{expenses.toLocaleString('fr-FR')} €</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Épargne</div>
            <div className="stat-value positive">+{savings.toLocaleString('fr-FR')} €</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;