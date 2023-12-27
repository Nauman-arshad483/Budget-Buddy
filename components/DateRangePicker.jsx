// DateRangePicker.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ onChange, containerClassName, labelClassName, datePickerClassName }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);

  };

  const handleEndDateChange = (date) => {
    setEndDate(date);

  };

  const handleSubmit = () => {
    if (startDate && endDate) {
      // Call the parent component's callback function with the date range
      
      console.log("valuess of datess")
      console.log("start date is...",startDate);
      console.log("end date is...",endDate);
      onChange({ startDate, endDate });
    }
    // You can add additional actions if needed
  };

  

  return (
    <div className={containerClassName}>
      <label className={labelClassName}>Start Date:</label>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        dateFormat="dd/MM/yyyy"
        isClearable
        className={`${datePickerClassName} bg-gray-100 p-2 rounded`}
      />

      <label className={labelClassName}>End Date:</label>
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        dateFormat="dd/MM/yyyy"
        isClearable
        className={`${datePickerClassName} bg-gray-100 p-2 rounded ml-2`}
      />

      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
};

export default DateRangePicker;
