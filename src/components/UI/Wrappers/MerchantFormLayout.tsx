import React from 'react';

import type { IFormLayout } from '@/interfaces/interface';

const MerchantFormLayout = ({ children }: IFormLayout) => {
  return (
    <div className="rounded-lg border-[0.5px] border-border-light bg-screen-grey  px-[24px] pb-[24px] pt-[60px]">
      <div className="flex w-full flex-col gap-4">{children}</div>
    </div>
  );
};
export default MerchantFormLayout;
