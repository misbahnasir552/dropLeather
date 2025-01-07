import React from 'react';

import BreadCrumb from '@/components/UI/BreadCrumb/BreadCrumb';
import type { ILayouts } from '@/interfaces/interface';

function layout({ children }: ILayouts) {
  return (
    <div className="flex flex-col gap-9">
      {/* <div className="sm:max-md:hidden"> */}
      <BreadCrumb />
      {/* </div> */}
      <div>{children}</div>
    </div>
  );
}

export default layout;
