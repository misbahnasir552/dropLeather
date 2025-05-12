'use client';

import React from 'react';

interface ApiErrorProps {
  apiError?: string;
}

const ApiError: React.FC<ApiErrorProps> = ({ apiError }) => {
  if (!apiError) return null;

  return (
    // <div className='flex flex-col bg-secondary-500 w-full'>
    <div className="flex w-full justify-start  px-3 pt-[8px] text-xs text-danger-base">
      {apiError}
      {/* </div> */}
    </div>
  );
};

export default ApiError;
