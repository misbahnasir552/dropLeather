import React from 'react';

import type { IHeadingElementProps } from '@/interfaces/interface';

const H6 = ({
  // medium = false,
  children,
  textColor,
  className,
}: IHeadingElementProps) => {
  return (
    <div
      className={`font-semibold leading-tight ${className}  ${
        textColor || `text-secondary-base`
      }`}
    >
      {children}
    </div>
  );
};

export default H6;
