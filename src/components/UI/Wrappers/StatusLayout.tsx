import React from 'react';

import type { IFormLayout } from '@/interfaces/interface';

import H6 from '../Headings/H6';

const StatusLayout = ({ children, formHeading }: IFormLayout) => {
  return (
    <div className="absolute left-[376px] top-[275px] w-[700px]  rounded-lg border-[0.5px]  border-border-light bg-neutral-white-base p-8">
      <div className="flex w-full flex-col gap-4">
        {formHeading && <H6>{formHeading}</H6>}
        {children}
      </div>
    </div>
  );
};
export default StatusLayout;
