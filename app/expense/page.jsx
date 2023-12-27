import React, { useState, useEffect } from "react";
import ExpenseForm from "@components/ExpenseForm";
import ExpenseChart from "@components/ExpenseChart";
import ExpenseTable from "@components/ExpenseTable";

const Expense = ({ onRefreshChart }) => {
  const [chartData, setChartData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [refresh, setRefresh] = useState(false); // State to trigger re-render

  const fetchExpenseData = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const response = await fetch("/api/expense/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID ,expense:true}),
      });

      if (response.ok) {
        const data = await response.json();
        const transformedChartData = data.map((item) => ({
          category: item.category,
          amount: item.amount,
          date:item.date,
        }));
        const transformedExpenseData = data.map((item, index) => ({
          id: index + 1,
          category: item.category,
          amount: item.amount,
          date: item.date.split("T")[0], // Format the date here
          paymentMethod: item.paymentMethod,
          _id: item._id,
        }));

        setChartData(transformedChartData);
        setExpenseData(transformedExpenseData);
        onRefreshChart();

      } else {
        const errorData = await response.json();
        console.error("Error fetching expense data:", errorData);
      }
    } catch (error) {
      console.error("Error during expense data fetch:", error);
    }
  };

  // UseEffect to fetch data on initial render and whenever refresh state changes
  useEffect(() => {
    fetchExpenseData();
  }, [refresh]);

  // Function to be passed to ExpenseForm to trigger refresh
  const handleExpenseAdded = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  // Function to be passed to ExpenseTable to trigger refresh
  const handleExpenseDeleted = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  return (
    <section className="mb-8 mt-4">
      <div className="flex flex-col md:flex-row mb-4">
        <div className="w-full md:w-1/2 md:mr-4">
          <div className="p-4 rounded-lg shadow-md bg-gray-200">
            {/* Pass the function to trigger refresh */}
            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ExpenseChart data={chartData} />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {/* Pass the function to trigger refresh */}
        <ExpenseTable
          expenseData={expenseData}
          onExpenseDeleted={handleExpenseDeleted}
          onDelRefreshChart={onRefreshChart}
        />
      </div>
    </section>
  );
};

export default Expense;
