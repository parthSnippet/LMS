import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels = [], data = [] }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "#3B82F6", // blue
          "#A855F7", // purple
          "#EF4444", // red (future use)
          "#22C55E", // green (future use)
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="h-32 w-full">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
