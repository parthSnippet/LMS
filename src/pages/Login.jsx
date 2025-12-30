import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Check if fields are empty
    if (!email.trim() || !password.trim()) {
      toast.error("Fill all fields to proceed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
      });
      return;
    }

    const isValid = login(email, password);

    if (isValid) {
      localStorage.setItem("activePage", "dashboard");

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
      });

      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      toast.error("Invalid credentials!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-[350px]"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Admin Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            maxLength={50} // ✅ Max 50 characters
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
