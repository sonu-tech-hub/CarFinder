// src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={handlePrevPage}
        className="px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-600 transition-colors"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 ${currentPage === page ? 'bg-primary-600' : 'bg-primary-700'} text-white rounded-lg hover:bg-primary-600 transition-colors`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        className="px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-600 transition-colors"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
