// src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPageButtons = 5;
  
  // Calculate range of visible page numbers
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  
  // Adjust if at the edges
  if (endPage - startPage + 1 < maxPageButtons && startPage > 1) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex space-x-1" aria-label="Pagination">
        {/* Previous Page Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-3 py-2 rounded-md ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
          }`}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        {/* First Page */}
        {startPage > 1 && (
          <React.Fragment>
            <button
              onClick={() => onPageChange(1)}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                ...
              </span>
            )}
          </React.Fragment>
        )}
        
        {/* Page Numbers */}
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === number
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            {number}
          </button>
        ))}
        
        {/* Last Page */}
        {endPage < totalPages && (
          <React.Fragment>
            {endPage < totalPages - 1 && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                ...
              </span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md"
            >
              {totalPages}
            </button>
          </React.Fragment>
        )}
        
        {/* Next Page Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-3 py-2 rounded-md ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
          }`}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;