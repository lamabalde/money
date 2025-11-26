import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Composant Tooltip externe pour éviter la recréation
const CategoryTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{payload[0].name}</p>
        <p className="value">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const SpendingByCategory = ({ data }) => {
  return (
    <div className="dashboard-widget" style={{ gridColumn: 'span 3' }}>
      <div className="widget-header">
        <h3 className="widget-title">Dépenses par catégorie</h3>
        <div className="widget-actions">
          <button className="widget-action-btn">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CategoryTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingByCategory;