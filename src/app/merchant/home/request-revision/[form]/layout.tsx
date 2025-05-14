'use client';

import React from 'react';

// import BreadCrumb from '@/components/UI/BreadCrumb/BreadCrumb';
// import Navbar from '@/components/Navbar/Navbar';
import RequestRevisionTimeline from '@/components/Timeline/RequestRevisionTimeline';
// import H7 from '@/components/UI/Headings/H7';

const Layout = ({ children }: any) => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col gap-6 pb-[120px]">
        {/* <BreadCrumb /> */}

        <RequestRevisionTimeline />

        {/* <H7 textColor="text-secondary-600">Ticket ID: {userData?.ticketId}</H7> */}
        {/* <Timeline /> */}
        {children}
      </div>
    </>
  );
};

export default Layout;
