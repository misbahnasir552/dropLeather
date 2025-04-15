'use client';

import React from 'react';

import Timeline from '@/components/Timeline/Timeline';

const Layout = ({ children }: any) => {
  return (
    <>
      <div className="flex flex-col gap-6 pb-[120px]">
        <Timeline />
        {children}
      </div>
    </>
  );
};

export default Layout;
