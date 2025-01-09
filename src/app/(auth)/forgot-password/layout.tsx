import React from 'react';

import BreadCrumb from '@/components/UI/BreadCrumb/BreadCrumb';
import type { ILayouts } from '@/interfaces/interface';

function layout({ children }: ILayouts) {
  return (
    <div className=" flex flex-col gap-6 px-[150px] pb-[120px] pt-6 sm:max-md:px-6 sm:max-md:pt-9">
      <div className="sm:max-md:hidden">
        <BreadCrumb />
      </div>
      <div className="">{children}</div>;
    </div>
  );
}

export default layout;
