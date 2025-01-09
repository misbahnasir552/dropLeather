import React from 'react';

// import Navbar from '@/components/Navbar/Navbar';
import Navbar from '@/components/Navbar/OnBoardingNavbar/page';
import ClientWrapper from '@/components/Wrappers/ClientWrapper';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ClientWrapper>
        <Navbar />
        {children}
      </ClientWrapper>
    </div>
  );
}

export default layout;
