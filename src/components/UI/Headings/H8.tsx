import React from 'react';

import type { IHeadingElementProps } from '@/interfaces/interface';

const H8 = ({
  // medium = false,
  children,
  textColor,
  className,
}: IHeadingElementProps) => {
  return (
    <div
      className={`text-sm font-extradoublebold leading-tight ${className} ${
        textColor || `text-secondary-base`
      }`}
    >
      {children}
    </div>
  );
};

export default H8;
