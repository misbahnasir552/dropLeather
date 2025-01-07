// import type { ReactNode } from 'react';
import React from 'react';

// import type { IAcceptPaymentWrapper } from '@/interfaces/interface';

// interface IAcceptPaymentWrapper {
//   children: ReactNode;
//   //   className?: string;
//

function UIWrapper({ children }: any) {
  return (
    <>
      <div className="flex flex-col">
        <div className="sm:max-md:gap-5 sm:max-md:px-[24px] sm:max-md:pb-[80px] flex flex-col gap-9 px-[150px] pb-[120px] pt-[80px]">
          {children}
        </div>
      </div>
    </>
  );
}

export default UIWrapper;
