import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

import { useEffect } from "react";
// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const DashboardChart = ({ expenseData, incomeData }) => {
  useEffect(() => {
    console.log("logs from the chart dashborad");

    console.log("expense data is...", expenseData);
    console.log("income data is...", incomeData);
  }, []);

  const formattedLabels = [
    ...new Set([
      ...expenseData.map((data) => format(new Date(data.date), "MMM yyyy")),
      ...incomeData.map((data) => format(new Date(data.date), "MMM yyyy")),
    ]),
  ].sort();

  const content = {
    labels: formattedLabels,
    datasets: [
      {
        label: "Expense",
        data: expenseData.map((data) => data.amount),
        borderColor: "#cb0c9f",
        borderWidth: 3,
        pointBorderColor: "#cb0c9f",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#f797e1");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
      {
        label: "Income",
        data: incomeData.map((data) => data.amount),
        borderColor: "#3498db",
        borderWidth: 3,
        pointBorderColor: "#3498db",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#a9cce3");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
    responsive: true,
    scales: {
      y: [
        {
          type: "linear",
          display: true,
          position: "left",
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
              bottom: 10,
            },
            font: {
              size: 30,
              style: "italic",
              family: "Arial",
            },
          },
          id: "y-expense",
          min: 50,
        },
        {
          type: "linear",
          display: true,
          position: "right",
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
              bottom: 10,
            },
            font: {
              size: 30,
              style: "italic",
              family: "Arial",
            },
          },
          id: "y-income",
          min: 0, // Set the min value for the income y-axis
        },
      ],
      x: {
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Month",
          padding: {
            top: 20,
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
    <div className="mt-4 w-full max-w-screen-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Line data={content} options={options} width={1000} height={300}></Line>
    </div>
  );
};

export default DashboardChart;
