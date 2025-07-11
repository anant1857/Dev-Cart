// import React, { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import { TypeAnimation } from "react-type-animation";
// import toast, { Toaster } from "react-hot-toast"; // Import toast

// const LoginPage = () => {
//   const { login } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fieldFocused, setFieldFocused] = useState({ username: false, email: false });
//   const navigate = useNavigate();

//   const validateForm = () => {
//     if (!username) {
//       setError("Username is required.");
//       return false;
//     }
//     if (username.length < 3) {
//       setError("Username must be at least 3 characters long.");
//       return false;
//     }
//     if (!email) {
//       setError("Email is required.");
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address.");
//       return false;
//     }
//     return true;
//   };

//   const handleLogin = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const userData = { name: username, email };
//       login(userData);

//       // Display success toast
//       toast.success(`Welcome, ${username}!`, {
//         position: "top-right",
//       });

//       navigate("/products");
//     } catch (err) {
//       setError(err.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleLogin();
//     }
//   };

//   return (
//     <div
//       className="flex justify-center items-center bg-gray-100"
//       style={{ height: "calc(100vh - 100px)" }}
//     >
//       <Toaster /> {/* Toast notification renderer */}
//       <div className="form-container m-5 lg:m-0 bg-gray-900 rounded-lg p-8 text-gray-100 w-[450px]">
//         <h2 className="title text-center text-2xl font-bold mb-6">Login</h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <div className="form space-y-6">
//           {/* Username Field */}
//           <div className="relative">
//             <FontAwesomeIcon
//               icon={faUser}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5"
//             />
//             <input
//               id="username"
//               type="text"
//               maxLength={10}
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               onFocus={() => setFieldFocused((prev) => ({ ...prev, username: true }))}
//               onBlur={() => setFieldFocused((prev) => ({ ...prev, username: false }))}
//               onKeyDown={handleKeyDown}
//               className="input w-full pl-10 py-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-400"
//             />
//             {/* Typing Animation for Placeholder */}
//             {!fieldFocused.username && !username && (
//               <TypeAnimation
//                 sequence={["Enter your username", 2000, ""]}
//                 wrapper="span"
//                 speed={30}
//                 className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//                 repeat={Infinity}
//               />
//             )}
//           </div>

//           {/* Email Field */}
//           <div className="relative">
//             <FontAwesomeIcon
//               icon={faEnvelope}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5"
//             />
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onFocus={() => setFieldFocused((prev) => ({ ...prev, email: true }))}
//               onBlur={() => setFieldFocused((prev) => ({ ...prev, email: false }))}
//               onKeyDown={handleKeyDown}
//               className="input w-full pl-10 py-3 bg-gray-900 border border-gray-700 rounded-md text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-400"
//             />
//             {/* Typing Animation for Placeholder */}
//             {!fieldFocused.email && !email && (
//               <TypeAnimation
//                 sequence={["Enter your email address", 2000, ""]}
//                 wrapper="span"
//                 speed={30}
//                 className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//                 repeat={Infinity}
//               />
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleLogin}
//             className={`sign w-full bg-purple-600 text-gray-100 py-3 rounded-md font-semibold hover:bg-purple-500 transition ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;