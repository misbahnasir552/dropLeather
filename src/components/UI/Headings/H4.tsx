import React from 'react';

import type { IHeadingElementProps } from '@/interfaces/interface';

const H4 = ({
  // medium = false,
  children,
  textColor,
  className,
}: IHeadingElementProps) => {
  return (
    <div
      className={`font-normal leading-tight ${className} ${
        textColor || `text-secondary-base`
      }`}
    >
      {children}
    </div>
  );
};

export default H4;
