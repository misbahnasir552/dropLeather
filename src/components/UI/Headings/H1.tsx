import React from 'react';

import type { IHeadingElementProps } from '@/interfaces/interface';

const H1 = ({
  medium = false,
  children,
  textColor,
  className,
}: IHeadingElementProps) => {
  return (
    <div
      className={`text-5xl sm:max-md:text-[32px] ${
        medium ? 'font-medium' : 'font-semibold'
      } leading-tight ${className} ${textColor || `text-secondary-base`}`}
    >
      {children}
    </div>
  );
};

export default H1;
