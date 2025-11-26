import React from 'react';

const BudgetProgress = ({ budget }) => {
  const progress = (budget.spent / budget.total) * 100;
  
  return (
    <div className="dashboard-widget" style={{ gridColumn: 'span 3' }}>
      <div className="widget-header">
        <h3 className="widget-title">Budget du mois</h3>
        <div className="widget-actions">
          <button className="widget-action-btn">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>

      <div className="budget-content">
        <div className="budget-amounts">
          <div className="budget-item">
            <span className="label">Dépensé</span>
            <span className="amount spent">{budget.spent} €</span>
          </div>
          <div className="budget-item">
            <span className="label">Restant</span>
            <span className="amount remaining">{budget.remaining} €</span>
          </div>
          <div className="budget-item">
            <span className="label">Total</span>
            <span className="amount total">{budget.total} €</span>
          </div>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        <div className="progress-text">
          {progress.toFixed(1)}% utilisé
        </div>
      </div>
    </div>
  );
};

export default BudgetProgress;