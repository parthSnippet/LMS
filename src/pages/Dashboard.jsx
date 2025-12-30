// // Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import Sidebar from "../components/Sidebar";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   const location = useLocation();
//   const [books, setBooks] = useState([]);
//   const [members, setMembers] = useState([]);

//   useEffect(() => {
//     setBooks(JSON.parse(localStorage.getItem("books")) || []);
//     setMembers(JSON.parse(localStorage.getItem("members")) || []);
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   const isHome = location.pathname === "/dashboard/home";

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar logout={logout} />

//       <motion.div
//         className="flex-1 p-6 overflow-y-auto max-h-screen"
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         {isHome && (
//           <>
//             <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//               <Stat title="Total Books" value={books.length} />
//               <Stat
//                 title="Issued Books"
//                 value={books.filter(b => b.totalCopies !== b.availableCopies).length}
//               />
//               <Stat
//                 title="Available Books"
//                 value={books.reduce((a, b) => a + b.availableCopies, 0)}
//               />
//               <Stat
//                 title="Active Members"
//                 value={members.filter(m => m.status === "active").length}
//               />
//             </div>

//             {books.length > 0 && (
//               <div className="bg-white p-4 rounded-xl shadow h-72">
//                 <Bar
//                   data={{
//                     labels: books.map(b => b.title),
//                     datasets: [
//                       {
//                         label: "Available",
//                         data: books.map(b => b.availableCopies),
//                         backgroundColor: "#3b82f6",
//                       },
//                       {
//                         label: "Issued",
//                         data: books.map(b => b.totalCopies - b.availableCopies),
//                         backgroundColor: "#f97316",
//                       },
//                     ],
//                   }}
//                   options={{ responsive: true, maintainAspectRatio: false }}
//                 />
//               </div>
//             )}
//           </>
//         )}

//         {/* ROUTED PAGES RENDER HERE */}
//         <Outlet />
//       </motion.div>
//     </div>
//   );
// };

// const Stat = ({ title, value }) => (
//   <div className="bg-white p-6 rounded-xl shadow">
//     <p className="text-gray-500">{title}</p>
//     <h2 className="text-3xl font-bold">{value}</h2>
//   </div>
// );

// export default Dashboard;




import React, { useEffect, useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState("allBooks"); // default filter

  useEffect(() => {
    setBooks(JSON.parse(localStorage.getItem("books")) || []);
    setMembers(JSON.parse(localStorage.getItem("members")) || []);
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const isHome = location.pathname === "/dashboard/home";

  // Computed values
  const issuedBooks = books.filter(b => b.totalCopies !== b.availableCopies);
  const availableBooks = books.filter(b => b.availableCopies > 0);
  const activeMembers = members.filter(m => m.status === "active");
  const blockedMembers = members.filter(m => m.status === "blocked");

  // Filtered data for table
  const filteredBooks = useMemo(() => {
    switch(filter){
      case "issuedBooks": return issuedBooks;
      case "availableBooks": return availableBooks;
      case "allBooks": return books;
      default: return [];
    }
  }, [filter, books, issuedBooks, availableBooks]);

  const filteredMembers = useMemo(() => {
    switch(filter){
      case "activeMembers": return activeMembers;
      case "blockedMembers": return blockedMembers;
      default: return [];
    }
  }, [filter, activeMembers, blockedMembers]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar logout={logout} />

      <motion.div
        className="flex-1 p-6 overflow-y-auto max-h-screen"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {isHome && (
          <>
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Stat
                title="Total Books"
                value={books.length}
                onClick={() => setFilter("allBooks")}
                active={filter === "allBooks"}
              />
              <Stat
                title="Issued Books"
                value={issuedBooks.length}
                onClick={() => setFilter("issuedBooks")}
                active={filter === "issuedBooks"}
              />
              <Stat
                title="Available Books"
                value={availableBooks.length}
                onClick={() => setFilter("availableBooks")}
                active={filter === "availableBooks"}
              />
              <Stat
                title="Active Members"
                value={activeMembers.length}
                onClick={() => setFilter("activeMembers")}
                active={filter === "activeMembers"}
              />
            </div>

            {/* BAR CHART */}
            {books.length > 0 && (
              <div className="bg-white p-4 rounded-xl shadow h-72 mb-6">
                <Bar
                  data={{
                    labels: ["Available", "Issued"],
                    datasets: [
                      {
                        label: "Books",
                        data: [
                          availableBooks.length,
                          issuedBooks.length,
                        ],
                        backgroundColor: ["#3b82f6", "#f97316"],
                        borderRadius: 6,
                      },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            )}

            {/* FILTERED TABLE */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-xl font-semibold mb-4">Details</h2>

              {/* BOOKS TABLE */}
          {["allBooks", "issuedBooks", "availableBooks"].includes(filter) && (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden shadow-md">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Title</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Author</th>
          <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Total</th>
          <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Available</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredBooks.map((b, idx) => (
          <tr
            key={b.id}
            className={`hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
          >
            <td className="px-6 py-4 text-sm text-gray-800">{b.title}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{b.author}</td>
            <td className="px-6 py-4 text-sm text-center">{b.totalCopies}</td>
            <td className="px-6 py-4 text-sm text-center">{b.availableCopies}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

              {/* MEMBERS TABLE */}
             {["activeMembers", "blockedMembers"].includes(filter) && (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden shadow-md">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Membership ID</th>
          <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredMembers.map((m, idx) => (
          <tr
            key={m.id}
            className={`hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
          >
            <td className="px-6 py-4 text-sm text-gray-800">{m.name}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{m.email}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{m.phone}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{m.membershipId}</td>
            <td className={`px-6 py-4 text-sm font-medium text-center ${m.status === "active" ? "text-green-600" : "text-red-500"}`}>
              {m.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

            </div>
          </>
        )}

        <Outlet />
      </motion.div>
    </div>
  );
};

const Stat = ({ title, value, onClick, active }) => (
  <div
    className={`bg-white p-6 rounded-xl shadow cursor-pointer hover:scale-105 transform transition-transform ${
      active ? "border-2 border-blue-500" : ""
    }`}
    onClick={onClick}
  >
    <p className="text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold">{value}</h2>
  </div>
);

export default Dashboard;
