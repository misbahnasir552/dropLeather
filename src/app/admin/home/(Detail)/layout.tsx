import React from 'react';

import BreadCrumb from '@/components/UI/BreadCrumb/BreadCrumb';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-9 pb-[144px] pt-6">
      <BreadCrumb />
      <div>{children}</div>
    </div>
  );
}

export default layout;
