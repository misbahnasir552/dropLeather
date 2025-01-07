import React from 'react';

import BreadCrumb from '@/components/UI/BreadCrumb/BreadCrumb';
import type { ILayouts } from '@/interfaces/interface';

function layout({ children }: ILayouts) {
  return (
    <div className="flex flex-col gap-9 pt-6">
      {/* <div className="sm:max-md:hidden"> */}
      {/* <div className="pt-6"> */}
      <BreadCrumb />
      {/* </div> */}
      {/* </div> */}
      <div>{children}</div>
    </div>
  );
}

export default layout;
