'use client';

import React from 'react';

import RequestRevisionTimeline from '@/components/Timeline/RequestRevisionTimeline';

const Layout = ({ children }: any) => {
  return (
    <>
      <div className=" flex flex-col gap-6 px-[150px] pb-[120px] pt-6 sm:max-md:px-6 sm:max-md:pt-9">
        <div className="flex flex-col gap-6 pb-[120px]">
          <RequestRevisionTimeline />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
