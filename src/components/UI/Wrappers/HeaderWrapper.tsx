'use client';

import React from 'react';

import B1 from '@/components/UI//Body/B1';
import H1 from '@/components/UI/Headings/H1';
import type { IHeaderWrapper } from '@/interfaces/interface';

const HeaderWrapper = ({
  heading,
  description, // show = false,
}: IHeaderWrapper): JSX.Element => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <H1>{heading}</H1>
        {description && <B1>{description}</B1>}
      </div>
    </div>
  );
};

export default HeaderWrapper;
