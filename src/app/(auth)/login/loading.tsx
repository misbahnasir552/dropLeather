import React from 'react';
import { ClockLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="flex w-full flex-col justify-center">
      <ClockLoader color="#21B25F" />
    </div>
  );
}

export default Loading;
