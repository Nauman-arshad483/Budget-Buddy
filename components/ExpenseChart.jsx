"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useEffect } from "react";

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const aggregateData = (data) => {
  const aggregatedData = {};

  data.forEach((item) => {
    const source = item.category;
    if (!aggregatedData[source]) {
      aggregatedData[source] = 0;
    }

    aggregatedData[source] += item.amount;
  });

  const labels = Object.keys(aggregatedData);
  const amounts = Object.values(aggregatedData);

  return { labels, amounts };
};


const ExpenseChart = ({ data }) => {
  useEffect(() => {
    console.log("data is...", data);
  });

  const aggregatedData = aggregateData(data);

  const content = {
    labels: aggregatedData.labels,
    datasets: [
      {
        label: "Expense",
        data: aggregatedData.amounts,
        backgroundColor: "#f797e1", // Color for the bars
        borderColor: "#cb0c9f", // Color for the horizontal lines
        borderWidth: 6, // Adjust the width of the lines
        barThickness: 30, // Adjust the height of the bars
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Category",
          padding: {
            bottom: 10,
          },
          font: {
            size: 30,
            style: "italic",
            family: "Arial",
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Expense",
          padding: {
            left: 20,
          },
          font: {
            size: 30,
            style: "italic",
            family: "Arial",
          },
        },
      },
    },
  };

  return (
    <div className="mt-4 w-full p-6 bg-white shadow-lg rounded-lg">
      <Bar data={content} options={options} width="100%" height={400}></Bar>
    </div>
  );
};

export default ExpenseChart;


