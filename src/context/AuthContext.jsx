
import React, { createContext, useState, useEffect, useContext } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(() => {
    const savedUser  = localStorage.getItem("user");
    return savedUser  ? JSON.parse(savedUser ) : null;
  });

  useEffect(() => {
    const savedUser  = localStorage.getItem("user");
    if (savedUser ) {
      setUser (JSON.parse(savedUser ));
    }
  }, []);

  const login = (userData) => {
    setUser (userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    console.log("Logging out..."); 
    setUser (null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};