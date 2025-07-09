import React, { useState } from "react";

const ProductFilter = ({ categories, selectedCategory, onCategoryClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    onCategoryClick(category); 
    setIsOpen(false); 
    window.scrollTo(0, 0);
  };
  

  return (
    <>
      {/* Button to toggle the menu (only visible on mobile) */}
      <button
        onClick={toggleMenu}
        className="sm:hidden text-lg text-black rounded font-bold fixed top-24 left-4 z-50" // Make it sticky
      >
        {isOpen ? "X" : "☰"}
      </button>

      {/* Menu */}
      <div
        className={`w-full sm:w-1/4 bg-gray-100 p-4 pl-[40px] rounded-lg shadow-md fixed top-24 left-0 h-full transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:h-full sm:block`}
      >
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <button
          onClick={() => handleCategoryClick(null)} 
          className={`block w-full text-left p-2 mb-2 rounded hover:bg-blue-200 ${selectedCategory === null ? "font-bold bg-blue-200" : ""}`}
        >
          All Products
        </button>
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`block w-full text-left p-2 mb-2 rounded hover:bg-blue-200 ${selectedCategory === category ? "font-bold bg-blue-200" : ""}`}
            >
              {category}
            </button>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </>
  );
};

export default ProductFilter;
