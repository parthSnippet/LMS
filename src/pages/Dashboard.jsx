import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Books from "./Books"; // main content component

const Dashboard = () => {
  const { logout } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActivePage("dashboard")}
            className={`text-left px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer ${
              activePage === "dashboard" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActivePage("books")}
            className={`text-left px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer ${
              activePage === "books" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            Manage Books
          </button>

          <button
            onClick={() => setActivePage("members")}
            className={`text-left px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer ${
              activePage === "members" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            Manage Members
          </button>

          <button
            onClick={() => setActivePage("issue")}
            className={`text-left px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer ${
              activePage === "issue" ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            Issue/Return
          </button>

          <button
            onClick={logout}
            className="mt-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <motion.div
        className="flex-1 p-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activePage === "dashboard" && (
          <div>
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Total Books</p>
                <h2 className="text-3xl font-bold">{books.length}</h2>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Issued Books</p>
                <h2 className="text-3xl font-bold">
                  {books.filter((b) => b.totalCopies !== b.availableCopies).length}
                </h2>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Available Books</p>
                <h2 className="text-3xl font-bold">
                  {books.reduce((acc, b) => acc + b.availableCopies, 0)}
                </h2>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-500">Members</p>
                <h2 className="text-3xl font-bold">0</h2>
              </div>
            </div>
          </div>
        )}

        {activePage === "books" && <Books />}
        {activePage === "members" && <h1 className="text-2xl font-semibold">Manage Members Page</h1>}
        {activePage === "issue" && <h1 className="text-2xl font-semibold">Issue / Return Books Page</h1>}
      </motion.div>
    </div>
  );
};

export default Dashboard;
