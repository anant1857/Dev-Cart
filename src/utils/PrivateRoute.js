import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); 
    }
  }, [isAuthenticated, navigate]);

  // If the user is authenticated, render the children
  return isAuthenticated ? children : null; 
};

export default PrivateRoute;