// MonthSelector.js
import React from 'react';

const MonthSelector = ({ onSelectMonth }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <select onChange={(e) => onSelectMonth(new Date(new Date().getFullYear(), months.indexOf(e.target.value), 1))}>
      {months.map((month, index) => (
        <option key={index} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthSelector;
