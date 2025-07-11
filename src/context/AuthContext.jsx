
// import React, { createContext, useState, useEffect, useContext } from "react";


// export const AuthContext = createContext();


// export const AuthProvider = ({ children }) => {
//   const [user, setUser ] = useState(() => {
//     const savedUser  = localStorage.getItem("user");
//     return savedUser  ? JSON.parse(savedUser ) : null;
//   });

//   useEffect(() => {
//     const savedUser  = localStorage.getItem("user");
//     if (savedUser ) {
//       setUser (JSON.parse(savedUser ));
//     }
//   }, []);

//   const login = (userData) => {
//     setUser (userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     console.log("Logging out..."); 
//     setUser (null);
//     localStorage.removeItem("user");
//   };

//   const isAuthenticated = !!user;

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  };

  // Check if user is authenticated
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      if (token) {
        setAuthToken(token);
        const res = await axios.get("/api/v1/auth/me");
        setUser(res.data.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
      setToken(null);
      setAuthToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [token]);

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      setToken(res.data.token);
      await checkAuth();
      return true;
    } catch (err) {
      throw err.response?.data || { error: "Login failed" };
    }
  };

  // Register user
  const register = async (name, email, password) => {
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      setToken(res.data.token);
      await checkAuth();
      return true;
    } catch (err) {
      throw err.response?.data || { error: "Registration failed" };
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);