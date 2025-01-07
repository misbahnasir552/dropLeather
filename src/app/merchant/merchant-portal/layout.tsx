import React from 'react';

import MerchantPortalNavbar from '@/components/Navbar/MerchantPortalNavbar/MerchantPortalNavbar';
import MerchantPortalHeader from '@/components/Navbar/MerchantPortalNavbar/MerchantPotalHeader.tsx/MerchantPortalHeader';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <MerchantPortalHeader />
      <MerchantPortalNavbar />
      <div className="">{children}</div>
    </div>
  );
}

export default layout;
