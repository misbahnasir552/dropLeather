import React from 'react';

import type { IHeadingElementProps } from '@/interfaces/interface';

const H5 = ({
  // medium = false,
  children,
  textColor,
  className,
}: IHeadingElementProps) => {
  return (
    <div
      className={`font-medium leading-tight ${className}  ${
        textColor || `text-secondary-base`
      }`}
    >
      {children}
    </div>
  );
};

export default H5;
