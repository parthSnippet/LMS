import React from "react";
import { Bar } from "react-chartjs-2";

const ChartCard = ({ title, data, labels }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: labels.map((_, i) =>
          `hsl(${i * 60}, 70%, 50%)`
        ), // Gradient-like colors for each bar
        borderRadius: 8,
        barThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#1f2937",
        titleColor: "#f9fafb",
        bodyColor: "#f9fafb",
        padding: 10,
        cornerRadius: 6,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 13 } },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: "#e5e7eb",
          borderDash: [4, 2],
        },
        ticks: {
          stepSize: 1,
          color: "#6b7280",
          font: { size: 13 },
        },
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md h-64 flex flex-col">
      <p className="text-gray-500 text-sm mb-2">{title}</p>
      <div className="flex-1">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartCard;
