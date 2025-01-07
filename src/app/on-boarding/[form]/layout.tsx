'use client';

import React from 'react';

import Navbar from '@/components/Navbar/Navbar';
import Timeline from '@/components/Timeline/Timeline';
import BreadCrumb from '@/components/UI/BreadCrumb/BreadCrumb';
// import ResponsiveTimeline from '@/components/Timeline/ResponsiveTimeline/ResponsiveTimeline';

const layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-6 px-[150px] pb-[120px] sm:max-md:px-6 ">
        <div className="flex flex-col sm:max-md:hidden md:max-xll:gap-6 md:max-xll:pt-6">
          <BreadCrumb />
          <Timeline />
        </div>
        {/* <div className='md:max-xll:hidden'>
          <ResponsiveTimeline />
        </div> */}
        {children}
      </div>
    </>
  );
};

export default layout;
