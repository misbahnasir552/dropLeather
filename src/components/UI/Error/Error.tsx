'use client';

import React from 'react';

import { useAppSelector } from '@/hooks/redux';

const ApiError = () => {
  const apiError = useAppSelector((state: any) => state.apiError);

  if (!apiError) return null;

  return (
    <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
      {apiError}
    </div>
  );
};

export default ApiError;
