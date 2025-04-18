'use client';

import React from 'react';

// import BreadCrumb from '@/components/UI/BreadCrumb/BreadCrumb';
import CorporateTimeline from '@/components/Timeline/CorporateTimeline/Timeline';
// import Navbar from '@/components/Navbar/Navbar';
import RequestRevisionTimeline from '@/components/Timeline/RequestRevisionTimeline';
// import H7 from '@/components/UI/Headings/H7';
import { useAppSelector } from '@/hooks/redux';

const Layout = ({ children }: any) => {
  const userData = useAppSelector((state: any) => state.auth);

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col gap-6 pb-[120px]">
        {/* <BreadCrumb /> */}
        {userData?.userType == 'Corporate' ? (
          <CorporateTimeline />
        ) : (
          <RequestRevisionTimeline />
        )}

        {/* <H7 textColor="text-secondary-600">Ticket ID: {userData?.ticketId}</H7> */}
        {/* <Timeline /> */}
        {children}
      </div>
    </>
  );
};

export default Layout;
