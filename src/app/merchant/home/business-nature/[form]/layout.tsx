'use client';

import React from 'react';

// import Navbar from '@/components/Navbar/Navbar';
import Timeline from '@/components/Timeline/Timeline';
// import BreadCrumb from '@/components/UI/BreadCrumb/BreadCrumb';

const layout = ({ children }: any) => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col gap-6 pb-[120px]">
        {/* <BreadCrumb /> */}
        <Timeline />
        {children}
      </div>
    </>
  );
};

export default layout;
