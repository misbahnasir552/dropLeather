// import type { ReactNode } from 'react';
import React from 'react';

import type { IFormLayout } from '@/interfaces/interface';

import H6 from '../Headings/H6';

const FormLayout = ({ children, formHeading }: IFormLayout) => {
  return (
    <div className="rounded-lg border-[0.5px] border-border-light bg-screen-grey sm:px-5 sm:py-6 md:px-[290px] md:py-[60px]">
      <div className="flex w-full flex-col gap-4">
        {formHeading && <H6>{formHeading}</H6>}
        {children}
      </div>
    </div>
  );
};
export default FormLayout;
