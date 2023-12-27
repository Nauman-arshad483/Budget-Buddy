import React from 'react';

const DashboardTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-gray-200">
      <nav className="tabs flex flex-col sm:flex-row">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`tab active text-gray-600 py-4 px-6 block hover:text-accent-color focus:outline-none ${
            activeTab === 'dashboard'
              ? 'text-accent-color border-b-2 font-medium border-orange-500'
              : ''
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onTabChange('expense')}
          className={`tab text-gray-600 py-4 px-6 block hover:text-accent-color focus:outline-none ${
            activeTab === 'expense' ? 'border-accent-color' : ''
          }`}
        >
          Expense
        </button>
        <button
          onClick={() => onTabChange('income')}
          className={`tab text-gray-600 py-4 px-6 block hover:text-accent-color focus:outline-none ${
            activeTab === 'income' ? 'border-accent-color' : ''
          }`}
        >
          Income
        </button>
      </nav>
    </div>
  );
};

export default DashboardTabs;
