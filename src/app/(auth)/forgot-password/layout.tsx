import React from 'react';

// import BreadCrumb from '@/components/UI/BreadCrumb/BreadCrumb';
import type { ILayouts } from '@/interfaces/interface';

function layout({ children }: ILayouts) {
  return (
    <div className=" ">
      <div className="">{/* <BreadCrumb /> */}</div>
      <div className="">{children}</div>
    </div>
  );
}

export default layout;
