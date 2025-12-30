import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Members from "./pages/Members";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import IssueReturn from "./pages/IssueReturn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Dashboard layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Default dashboard page */}
          <Route index element={<Navigate to="home" />} />

          <Route path="home" element={null} />
          <Route path="books" element={<Books />} />
          <Route path="members" element={<Members />} />
          <Route path="issue" element={<IssueReturn />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
