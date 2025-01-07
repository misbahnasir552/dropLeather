import React from 'react';

import type { IHeadingElementProps } from '@/interfaces/interface';

const H7 = ({
  medium = false,
  children,
  textColor,
  className,
}: IHeadingElementProps) => {
  return (
    <div
      className={`text-sm ${
        medium ? 'font-medium' : 'font-semibold'
      } leading-tight ${className} ${textColor || `text-secondary-base`}`}
    >
      {children}
    </div>
  );
};

export default H7;
