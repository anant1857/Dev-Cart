// import React, { useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext"; 
// import { useNavigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login"); 
//     }
//   }, [isAuthenticated, navigate]);

//   // If the user is authenticated, render the children
//   return isAuthenticated ? children : null; 
// };

// export default PrivateRoute;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  return !isLoading && isAuthenticated ? children : null;
};

export default PrivateRoute;