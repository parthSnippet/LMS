import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
   faGaugeHigh,
  faBook,
  faUsers,
  faRightLeft
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ logout }) => {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard/home", icon: faGaugeHigh },
    { label: "Manage Books", path: "/dashboard/books", icon: faBook },
    { label: "Manage Members", path: "/dashboard/members", icon: faUsers },
    { label: "Issue / Return", path: "/dashboard/issue", icon: faRightLeft },
  ];

  return (
  <div className="w-64 bg-white shadow-lg flex-shrink-0 p-6 h-screen sticky top-0 flex flex-col justify-between bg-gradient-to-r from-black-500 to-purple-300 text-white ">
  <div>
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel</h2>

    <nav className="flex flex-col gap-3">
      {menuItems.map((item) => (
        <NavLink key={item.path} to={item.path}>
          {({ isActive }) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              className={`px-4 py-3 rounded-xl font-medium cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.label}</span>
              </div>
            </motion.div>
          )}
        </NavLink>
      ))}
    </nav>
  </div>

  <motion.button
    onClick={logout}
    whileHover={{ scale: 1.03 }}
    className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer"
  >
    Logout
  </motion.button>
</div>


  );
};

export default Sidebar;
