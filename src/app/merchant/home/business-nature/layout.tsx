'use client';

import React from 'react';

import type { ILayouts } from '@/interfaces/interface';

function Layout({ children }: ILayouts) {
  return (
    <div className=" flex flex-col gap-6 px-[150px] pb-[120px] pt-6 sm:max-md:px-6 sm:max-md:pt-9">
      <div className="sm:max-md:hidden"></div>
      <div className="">{children}</div>
    </div>
  );
}

export default Layout;
