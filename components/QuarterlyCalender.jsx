import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const QuarterlyCalendar = ({ selectedDate, onSelectQuarter }) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: selectedDate,
      endDate: selectedDate,
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    onSelectQuarter(ranges.selection);
  };

  // Define an empty array for staticRanges to hide predefined options
  const emptyStaticRanges = [];

  // Define custom input ranges excluding "Days Upto Today" and "Days Starting Today"
  const customInputRanges = [
    {
      label: 'Custom',
      range: () => ({ startDate: new Date(), endDate: new Date(), key: 'custom' }),
    },
  ];

  return (
    <div>
      <div className="date-range-picker">
        <DateRangePicker
          ranges={dateRange}
          onChange={handleSelect}
          months={1} // Number of months to display
          direction="horizontal"
          staticRanges={emptyStaticRanges} // Set staticRanges to an empty array
          inputRanges={customInputRanges} // Set custom inputRanges
        />
      </div>
    </div>
  );
};

export default QuarterlyCalendar;
