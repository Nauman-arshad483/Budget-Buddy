import React, { useState, useEffect } from 'react';
import IncomeForm from '@components/IncomeForm';
import IncomeChart from '@components/IncomeChart';
import IncomeTable from '@components/IncomeTable';

const Income = ({ onRefreshChart }) => {
  const [chartData, setChartData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [refresh, setRefresh] = useState(false); // State to trigger re-render

  const fetchIncomeData = async () => {
    try {
      const userID = localStorage.getItem('userID');
      const response = await fetch("/api/income/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID,income:true }),
      });

      if (response.ok) {
        const data = await response.json();
        const transformedChartData = data.map((item) => ({
          category: item.source,
          amount: item.amount,
        }));
        const transformedIncomeData = data.map((item, index) => ({
          id: index + 1,
          category: item.source,
          amount: item.amount,
          date: item.date,
          paymentMethod: item.paymentMethod,
          _id: item._id,
        }));

        setChartData(transformedChartData);
        setIncomeData(transformedIncomeData);
        onRefreshChart();
      } else {
        const errorData = await response.json();
        console.error("Error fetching income data:", errorData);
      }
    } catch (error) {
      console.error("Error during income data fetch:", error);
    }
  };

  // UseEffect to fetch data on initial render and whenever refresh state changes
  useEffect(() => {
    fetchIncomeData();
  }, [refresh]);

  // Function to be passed to IncomeForm to trigger refresh
  const handleIncomeAdded = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  // Function to be passed to IncomeTable to trigger refresh
  const handleIncomeDeleted = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  return (
    <section className="mb-8 mt-4">
      <div className="flex flex-col md:flex-row mb-4">
        <div className="w-full md:w-1/2 md:mr-4">
          <div className="p-4 rounded-lg shadow-md bg-gray-200">
            {/* Pass the function to trigger refresh */}
            <IncomeForm onIncomeAdded={handleIncomeAdded} />
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <IncomeChart data={chartData} />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <IncomeTable incomeData={incomeData} onIncomeDeleted={handleIncomeDeleted} onDelRefreshChart={onRefreshChart}  />
      </div>
    </section>
  );
};

export default Income;
