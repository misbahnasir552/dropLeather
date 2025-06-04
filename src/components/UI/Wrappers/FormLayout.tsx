// import type { ReactNode } from 'react';
import React from 'react';

import type { IFormLayout } from '@/interfaces/interface';

const FormLayout = ({ children }: IFormLayout) => {
  return (
    <div className="flex h-screen w-[26%] flex-col justify-between px-[38px] pt-[60px] xs:max-xl:w-full xs:max-xl:px-4">
      {children}
    </div>
  );
};
export default FormLayout;
