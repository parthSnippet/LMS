import React from "react";
import { motion } from "framer-motion";
import PieChart from "./charts/Piechart"

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  labels,
  chartData,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4"
    >
      {/* TOP SECTION */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>

        <div className="text-3xl text-blue-500">
          {icon}
        </div>
      </div>

      {/* CHART SECTION */}
      {labels?.length > 0 && chartData?.length > 0 && (
        <PieChart labels={labels} data={chartData} />
      )}
    </motion.div>
  );
};

export default StatCard;
