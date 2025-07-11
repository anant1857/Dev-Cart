// import React, { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { CartContext } from "../context/CartContext";
// import { Link } from "react-router-dom";
// import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
// import { FaBagShopping } from "react-icons/fa6";
// import logo from "../assets/cartLogo.png"; 

// const Navbar = () => {
//   const { user, isAuthenticated, logout } = useContext(AuthContext);
//   const { cart } = useContext(CartContext);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Function to handle link clicks
//   const handleLinkClick = () => {
//     setMenuOpen(false); 
//   };

//   return (
//     <nav className="p-4 bg-purple-700 text-white shadow-md sticky top-0 z-[999]">
//       <div className="flex justify-between items-center">
//         {/* Logo Section */}
//         <div className="flex items-center">
//           <Link to="/" className="flex items-center" onClick={handleLinkClick}>
//             <img
//               src={logo}
//               alt="E-Shop Logo"
//               className="h-[55px] mr-2 rounded-2"
//             />
//             <span className="text-xl font-bold">Dev-Cart</span>
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           id="mobile-menu-button"
//           className="block md:hidden text-xl font-semibold focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </button>

//         {/* Desktop Links */}
//         <div className="hidden md:flex space-x-4 items-center">
//           <Link to="/products" className="flex items-center hover:text-gray-300">
//             <FaBagShopping className="mr-1" />
//             All Products
//           </Link>
//           <Link to="/cart" className="flex items-center hover:text-gray-300">
//             <FaShoppingCart className="mr-1" />
//             Cart {cart.length > 0 && <span>({cart.length})</span>}
//           </Link>
//           <Link to="/wishlist" className="flex items-center hover:text-gray-300">
//             <FaHeart className="mr-1 text-red-600 shadow-lg" />
//             Wishlist
//           </Link>
//           {isAuthenticated ? (
//             <div className="flex items-center">
//               <span className="mr-2">Welcome, {user.name}!</span>
//               <button
//                 onClick={logout}
//                 className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <Link
//               to="/login"
//               className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition duration-200 flex items-center"
//             >
//               <FaUser className="mr-1" />
//               Login
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Mobile Links */}
//       <div
//         id="mobile-menu"
//         className={`${
//           menuOpen ? "flex" : "hidden"
//         } flex-col space-y-3 mt-3 md:hidden`}
//       >
//         <Link
//           to="/products"
//           className="flex items-center hover:text-gray-300"
//           onClick={handleLinkClick} 
//         >
//           <FaBagShopping className="mr-1" />
//           All Products
//         </Link>
//         <Link
//           to="/cart"
//           className="flex items-center hover:text-gray-300"
//           onClick={handleLinkClick} 
//         >
//           <FaShoppingCart className="mr-1" />
//           Cart {cart.length > 0 && <span>({cart.length})</span>}
//         </Link>
//         <Link
//           to="/wishlist"
//           className="flex items-center hover:text-gray-300"
//           onClick={handleLinkClick} 
//         >
//           <FaHeart className="mr-1 text-white shadow-lg" />
//           Wishlist
//         </Link>
//         {isAuthenticated ? (
//           <div className="flex flex-col items-start">
//             <span className="mb-2">Welcome, {user.name}!</span>
//             <button
//               onClick={() => {
//                 logout();
//                 setMenuOpen(false); 
//               }}
//               className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <Link
//             to="/login"
//             className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition duration-200 flex items-center"
//             onClick={handleLinkClick} 
//           >
//             <FaUser className="mr-1" />
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import logo from "../assets/cartLogo.png"; 

const Navbar = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to handle link clicks
  const handleLinkClick = () => {
    setMenuOpen(false); 
  };

  // Don't show anything while auth is loading
  if (isLoading) {
    return null;
  }

  return (
    <nav className="p-4 bg-purple-700 text-white shadow-md sticky top-0 z-[999]">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center" onClick={handleLinkClick}>
            <img
              src={logo}
              alt="E-Shop Logo"
              className="h-[55px] mr-2 rounded-2"
            />
            <span className="text-xl font-bold">Dev-Cart</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-button"
          className="block md:hidden text-xl font-semibold focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/products" className="flex items-center hover:text-gray-300">
            <FaBagShopping className="mr-1" />
            All Products
          </Link>
          <Link to="/cart" className="flex items-center hover:text-gray-300">
            <FaShoppingCart className="mr-1" />
            Cart {cart.length > 0 && <span>({cart.length})</span>}
          </Link>
          <Link to="/wishlist" className="flex items-center hover:text-gray-300">
            <FaHeart className="mr-1 text-red-600 shadow-lg" />
            Wishlist
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center">
              <span className="mr-2">Welcome, {user?.name}!</span>
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition duration-200 flex items-center"
              >
                <FaUser className="mr-1" />
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Links */}
      <div
        id="mobile-menu"
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col space-y-3 mt-3 md:hidden`}
      >
        <Link
          to="/products"
          className="flex items-center hover:text-gray-300"
          onClick={handleLinkClick} 
        >
          <FaBagShopping className="mr-1" />
          All Products
        </Link>
        <Link
          to="/cart"
          className="flex items-center hover:text-gray-300"
          onClick={handleLinkClick} 
        >
          <FaShoppingCart className="mr-1" />
          Cart {cart.length > 0 && <span>({cart.length})</span>}
        </Link>
        <Link
          to="/wishlist"
          className="flex items-center hover:text-gray-300"
          onClick={handleLinkClick} 
        >
          <FaHeart className="mr-1 text-white shadow-lg" />
          Wishlist
        </Link>
        {isAuthenticated ? (
          <div className="flex flex-col items-start">
            <span className="mb-2">Welcome, {user?.name}!</span>
            <button
              onClick={() => {
                logout();
                setMenuOpen(false); 
              }}
              className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition duration-200 flex items-center"
              onClick={handleLinkClick} 
            >
              <FaUser className="mr-1" />
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={handleLinkClick}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;