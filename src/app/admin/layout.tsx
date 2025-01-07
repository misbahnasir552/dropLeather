import React from 'react';

import AdminPortalNav from '@/components/Navbar/AdminPortalNav/AdminPortalNav';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <Navbar /> */}
      <AdminPortalNav />
      <div className="">{children}</div>;
    </div>
  );
}

export default layout;
