import React from 'react';

import H4 from '@/components/UI/Headings/H4';
import type { IFormLayout } from '@/interfaces/interface';

function ReviewFormLayout({ children, formHeading }: IFormLayout) {
  return (
    <div className="rounded-2xl border-[0.5px] border-border-light bg-screen-grey sm:px-5 sm:py-6 md:px-8 md:py-6">
      <div className="flex flex-col gap-6">
        <H4>{formHeading}</H4>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}

export default ReviewFormLayout;
