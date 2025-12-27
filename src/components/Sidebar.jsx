import React from "react";

const Sidebar = ({ activePage, setActivePage, logout }) => {
  return (
    <div className="w-64 bg-white shadow-lg flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-2 flex-1">
        {[
          { key: "dashboard", label: "Dashboard" },
          { key: "books", label: "Manage Books" },
          { key: "members", label: "Manage Members" },
          { key: "issue", label: "Issue / Return" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className={`text-left px-4 py-2 rounded-lg
            hover:bg-gray-200 cursor-pointer
            ${
              activePage === item.key
                ? "bg-gray-200 font-semibold"
                : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
