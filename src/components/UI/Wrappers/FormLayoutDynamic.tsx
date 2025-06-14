// import type { ReactNode } from 'react';
import React from 'react';

import H6 from '@/components/UI/Headings/H6';

const FormLayoutDynamic = ({
  children,
  heading,
  subHeading,
  uniqueId,
}: any) => {
  return (
    <div
      className="rounded-lg border-[0.5px] border-border-light bg-screen-grey sm:px-5 sm:py-6 md:px-[290px] md:py-[60px]"
      key={uniqueId}
    >
      <div className="flex w-full flex-col gap-4">
        <H6>{heading}</H6>
        <div className="font-small text-sm text-secondary-base">
          {subHeading ?? subHeading}
        </div>
        {children}
      </div>
    </div>
  );
};
export default FormLayoutDynamic;
