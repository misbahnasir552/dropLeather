import React from 'react';
// import H1 from '@/components/UI/Headings/H1';
import { BarLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <BarLoader color="#21B25F" />
    </div>
  );
}

export default Loading;
