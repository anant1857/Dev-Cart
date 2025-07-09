import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination flex justify-center items-center py-4">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="px-4 py-2 mr-2 disabled:opacity-50 hover:bg-gray-300 transition-colors"
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button 
          key={number} 
          onClick={() => onPageChange(number)} 
          className={`px-4 py-2 mx-1 rounded-lg transition-colors ${currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          {number}
        </button>
      ))}

      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="px-4 py-2 ml-2 disabled:opacity-50 hover:bg-gray-300 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
