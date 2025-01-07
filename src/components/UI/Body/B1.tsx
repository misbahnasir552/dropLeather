import React from 'react';

const B1 = ({ children, textColor, medium, classes }: any) => {
  return (
    <span
      className={`text-base sm:max-md:text-sm ${
        medium ? 'font-medium' : 'font-normal'
      } leading-tight ${classes} ${textColor || 'text-secondary-600'} `}
    >
      {children}
    </span>
  );
};

export default B1;
