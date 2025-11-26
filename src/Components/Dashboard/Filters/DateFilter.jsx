import React from 'react';

const DateFilter = ({ value, onChange }) => {
  const periods = [
    { value: 'week', label: '7j' },
    { value: 'month', label: '30j' },
    { value: 'quarter', label: '3m' },
    { value: 'year', label: '1an' },
    { value: 'all', label: 'Tout' }
  ];

  return (
    <div className="date-filter">
      {periods.map(period => (
        <button
          key={period.value}
          className={`filter-btn ${value === period.value ? 'active' : ''}`}
          onClick={() => onChange(period.value)}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};

export default DateFilter;