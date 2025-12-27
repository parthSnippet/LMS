import { createContext, useContext, useState } from "react";
import React from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || {
      isLoggedIn: false,
      role: null
    }
  );

  const login = (email, password) => {
    if (email === "admin@library.com" && password === "123@lbr") {
      const data = { isLoggedIn: true, role: "admin" };
      localStorage.setItem("auth", JSON.stringify(data));
      setAuth(data);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({ isLoggedIn: false, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
