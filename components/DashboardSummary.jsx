import React from "react";
import { format } from "date-fns";

const getMonthName = (monthIndex) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
};

const DashboardSummary = ({ incomeData, expenseData, selectedDateRange }) => {
  // Calculate total income
  const totalIncome = incomeData.reduce((acc, item) => acc + item.amount, 0);

  // Calculate total expense
  const totalExpense = expenseData.reduce((acc, item) => acc + item.amount, 0);

  // Calculate net income
  const netIncome = totalIncome - totalExpense;

  const formatDate = (date) => {
    const formatDateItem = (itemDate) => format(new Date(itemDate), "MM/dd/yyyy");

    if (date.startDate && date.endDate) {
      return `${formatDateItem(date.startDate)} to ${formatDateItem(date.endDate)}`;
    } else if (date.startDate) {
      return formatDateItem(date.startDate);
    } else if (date.endDate) {
      return formatDateItem(date.endDate);
    } else {
      return getMonthName(new Date().getMonth());
    }
  };

  return (
    <div className="mt-8 w-full max-w-screen-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Financial Summary <br />
        {selectedDateRange
          ? `for ${formatDate(selectedDateRange)}`
          : `for ${getMonthName(new Date().getMonth())}`}
      </h2>

      <div className="flex justify-between">
        <div className="flex-1">
          <p className="text-gray-600">Total Income</p>
          <p className="text-3xl font-bold text-green-500">${totalIncome}</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-600">Total Expense</p>
          <p className="text-3xl font-bold text-red-500">${totalExpense}</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-600">Net Income</p>
          <p
            className={`text-3xl font-bold ${
              netIncome >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${netIncome}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
