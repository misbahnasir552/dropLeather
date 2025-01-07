import React from 'react';

import Navbar from '@/components/Navbar/Navbar';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {/* <div className="sm:max-md:px-6 px-[150px]"> */}
      {children}
      {/* </div> */}
    </div>
  );
}

export default layout;
