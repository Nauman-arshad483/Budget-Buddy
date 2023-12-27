"use client";
import React, { useState, useEffect } from "react";
import DashboardTabs from "@components/DashboardTabs";
import DashboardChart from "@components/DashboardChart";
import DashboardExpenseTable from "@components/DashboardExpenseTable";
import DashboardIncomeTable from "@components/DashboardIncomeTable";
import DashboardSummary from "@components/DashboardSummary";
import Expense from "@app/expense/page";
import Income from "@app/income/page";
import DateRangePicker from "@components/DateRangePicker";

const fetchData = async (apiEndpoint, userID, dateRange, setData) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setData(data);
    } else {
      const errorData = await response.json();
      console.error(`Error fetching data from ${apiEndpoint}:`, errorData);
    }
  } catch (error) {
    console.error(`Error during data fetch from ${apiEndpoint}:`, error);
  }
};

const fetchDataForChart = async (
  apiEndpoint,
  userID,
  expense,
  income,
  setData
) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        expense,
        income,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setData(data); // Update state with fetched data
    } else {
      const errorData = await response.json();
      console.error(`Error fetching data from ${apiEndpoint}:`, errorData);
    }
  } catch (error) {
    console.error(`Error during data fetch from ${apiEndpoint}:`, error);
  }
};
const Dashboard = () => {
  const [refreshChart, setRefreshChart] = useState(false);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  const [chartExpenseData, setChartExpenseData] = useState([]);
  const [chartIncomeData, setChartIncomeData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const userID =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;

    const handleRefreshChart = () => {
      setRefreshChart((prevRefresh) => !prevRefresh);
    };
  
  useEffect(() => {
    // Fetch data for the current month on initial load
    const currentMonth = new Date();
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    fetchData(
      "/api/expense/get",
      userID,
      {
        startDate: startOfMonth.toISOString(),
        endDate: endOfMonth.toISOString(),
      },
      setExpenseData
    );

    fetchData(
      "/api/income/get",
      userID,
      {
        startDate: startOfMonth.toISOString(),
        endDate: endOfMonth.toISOString(),
      },
      setIncomeData
    );

    // Set the initial date range
    setDateRange({ startDate: startOfMonth, endDate: endOfMonth });

    // Log additional information or actions if needed
    console.log("Dashboard component is mounted");

    // Cleanup function (optional)
    return () => {
      // Perform any cleanup actions if needed
      console.log("Dashboard component will unmount");
    };
  }, [userID]);

  // Fetch chart data when expenseData changes
  useEffect(() => {
    fetchDataForChart(
      "/api/expense/get",
      userID,
      true,
      false,
      setChartExpenseData
    );
  }, [userID, expenseData, setChartExpenseData,refreshChart]);

  // Fetch chart data when incomeData changes
  useEffect(() => {
    fetchDataForChart(
      "/api/income/get",
      userID,
      false,
      true,
      setChartIncomeData
    );
  }, [userID, incomeData, setChartIncomeData,refreshChart]);

  const handleDateRangeSubmit = (startDate, endDate) => {
    // Fetch data for expenses and incomes with the selected date range
    fetchData(
      "/api/expense/get",
      userID,
      { startDate, endDate },
      setExpenseData
    );
    fetchData("/api/income/get", userID, { startDate, endDate }, setIncomeData);
    console.log("logs from the dashboard page...");
    console.log("start date is..", startDate);
    console.log("end date is ...", endDate);
    setSelectedDateRange({
      startDate: startDate.startDate,
      endDate: startDate.endDate,
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-8">
      {/* Navigation Tabs */}
      <DashboardTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Content based on the selected tab */}
      {activeTab === "dashboard" && (
        <div className="mb-8 p-8 bg-white rounded-lg shadow-md">
          {/* Summary and Date Picker Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 p-8 bg-white rounded-lg shadow-md">
            {/* Summary Section */}
            <div className="mb-4 md:mb-0 md:w-2/3">
              <DashboardSummary
                incomeData={incomeData}
                expenseData={expenseData}
                selectedDateRange={selectedDateRange}
              />
            </div>

            {/* Date Picker Section */}
            <div className="flex items-center">
              {/* Apply styles directly to the DateRangePicker component */}
              <DateRangePicker
                onChange={handleDateRangeSubmit}
                containerClassName="flex flex-col md:flex-row items-center space-x-4"
                labelClassName="text-sm md:text-base"
                datePickerClassName="mr-4"
              />
            </div>
          </div>

          {/* Single Chart Section */}
          <div className="mt-8">
            <DashboardChart
              expenseData={chartExpenseData}
              incomeData={chartIncomeData}
            />
          </div>

          {/* Tables Section */}
          <div className="flex mt-8">
            {/* Expense Table */}
            <div className="w-1/2 pr-4">
              <h2 className="text-lg font-semibold mb-4"> </h2>
              <DashboardExpenseTable data={expenseData} />
            </div>

            {/* Income Table */}
            <div className="w-1/2 pl-4">
              <h2 className="text-lg font-semibold mb-4"> </h2>
              <DashboardIncomeTable data={incomeData} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "expense" && (
        <div className="mb-8">
          {/* Your Expense content goes here */}
          <Expense onRefreshChart={handleRefreshChart} />
        </div>
      )}
      {activeTab === "income" && (
        <div className="mb-8">
          {/* Your Income content goes here */}
          <Income onRefreshChart={handleRefreshChart}/>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
