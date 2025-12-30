// src/components/MainLayout.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children, initialPage = "dashboard", logout }) => {
  const [activePage, setActivePage] = useState(
    localStorage.getItem("activePage") || initialPage
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} logout={logout} />
      <div className="flex-1 p-6">{children(activePage)}</div>
    </div>
  );
};

export default MainLayout;
