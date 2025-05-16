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
    <div className="flex items-center justify-between">
      {totalPages > 1 ? (
        <button
          onClick={onPrev}
          disabled={pageNumber + 1 === 1}
          className={`w-28 bg-primary-base text-sm text-screen-white ${
            pageNumber + 1 === 1
              ? 'cursor-not-allowed hover:bg-secondary-300'
              : 'cursor-pointer hover:bg-primary-600'
          } rounded-md px-4 py-2`}
        >
          Previous
        </button>
      ) : (
        <div className="w-28" /> // Keeps spacing consistent when button is hidden
      )}

      <span>
        Page {pageNumber + 1} of {totalPages}
      </span>

      {totalPages > 1 ? (
        <button
          onClick={onNext}
          disabled={pageNumber + 1 === totalPages}
          className={`w-28 bg-primary-base text-sm text-screen-white ${
            pageNumber + 1 === totalPages
              ? 'cursor-not-allowed hover:bg-secondary-300'
              : 'cursor-pointer hover:bg-primary-600'
          } rounded-md px-4 py-2`}
        >
          Next
        </button>
      ) : (
        <div className="w-28" />
      )}
    </div>
  );
};

export default Pagination;
