'use client';

import React from 'react';

import CorporateTimeline from '@/components/Timeline/CorporateTimeline/Timeline';
import Timeline from '@/components/Timeline/Timeline';
import { useAppSelector } from '@/hooks/redux';

const Layout = ({ children }: any) => {
  const userData = useAppSelector((state: any) => state.auth);

  return (
    <>
      <div className="flex flex-col gap-6 pb-[120px]">
        {userData?.userType == 'Corporate' ? (
          <CorporateTimeline />
        ) : (
          <Timeline />
        )}
        {children}
      </div>
    </>
  );
};

export default Layout;
