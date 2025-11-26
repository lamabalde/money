import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Déplacer CustomTooltip en dehors du composant pour éviter la recréation à chaque rendu
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Mois: ${label}`}</p>
        <p className="income" style={{ color: '#00D4AA' }}>
          Revenus: {payload[0].value} €
        </p>
        <p className="expense" style={{ color: '#FF4757' }}>
          Dépenses: {payload[1].value} €
        </p>
      </div>
    );
  }
  return null;
};

const IncomeExpenseChart = ({ data }) => { // Supprimer dateRange non utilisé
  return (
    <div className="dashboard-widget" style={{ gridColumn: 'span 8' }}>
      <div className="widget-header">
        <h3 className="widget-title">Revenus vs Dépenses</h3>
        <div className="widget-actions">
          <button className="widget-action-btn">
            <span className="material-symbols-outlined">download</span>
          </button>
          <button className="widget-action-btn">
            <span className="material-symbols-outlined">filter_alt</span>
          </button>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="month" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="income" name="Revenus" fill="#00D4AA" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" name="Dépenses" fill="#FF4757" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;