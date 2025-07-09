import React from "react";

const Footer = () => {
  return (
    <footer className="fixed-bottom z-[999] fixed bottom-0 bg-gray-800 text-white py-2 w-full text-center">
      <p>&copy; {new Date().getFullYear()} Dev-Cart - Anant Joshi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
