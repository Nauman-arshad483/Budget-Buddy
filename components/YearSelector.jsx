// YearSelector.js
import React from "react";

const YearSelector = ({ onSelectYear }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 10 },
    (_, index) => currentYear - 5 + index
  ); // Display 10 years, adjust as needed

  return (
    <select
      onChange={(e) => {
        console.log("Selected Year:", e.target.value);

        onSelectYear(parseInt(e.target.value, 10));
      }}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelector;
