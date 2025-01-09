import React from 'react';

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = ({
  pageNumber,
  totalPages,
  onNext,
  onPrev,
}: PaginationProps) => {
  return (
    <div className="mt-4 flex justify-between">
      <button
        onClick={onPrev}
        disabled={pageNumber + 1 === 1}
        className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2"
      >
        Previous
      </button>
      <span>
        Page {pageNumber + 1} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={pageNumber + 1 === totalPages}
        className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
