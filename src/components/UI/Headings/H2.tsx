import React from 'react';

import type { IHeadingElementProps } from '@/interfaces/interface';

const H2 = ({
  medium = false,
  children,
  textColor,
  className,
}: IHeadingElementProps) => {
  return (
    <div
      className={`text-[40px] ${
        medium ? 'font-medium' : 'font-semibold'
      } leading-tight ${className} ${textColor || `text-secondary-base`}`}
    >
      {children}
    </div>
  );
};

export default H2;
