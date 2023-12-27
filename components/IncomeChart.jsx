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

const IncomeChart = ({ data }) => {
  useEffect(() => {
    console.log("data to display in chart is...", data);
  });

  const aggregatedData = aggregateData(data);
  const content = {
    labels: aggregatedData.labels,
    datasets: [
      {
        label: "Income",
        data: aggregatedData.amounts,
        backgroundColor: "#50B948",
        borderColor: "#2B18E9",
        borderWidth: 6,
        barThickness: 30,
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
          text: "Source",
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
          text: "Income",
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

export default IncomeChart;
