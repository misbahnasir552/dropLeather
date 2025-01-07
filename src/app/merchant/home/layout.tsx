import React from 'react';

// import Navbar from '@/components/Navbar/Navbar';
import Navbar from '@/components/Navbar/OnBoardingNavbar/page';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default layout;
