import React from 'react';

const B3 = ({ children, textColor, classes, medium }: any) => {
  return (
    <span
      className={`text-xs ${
        medium ? 'font-semibold' : 'font-normal'
      } leading-tight ${textColor || 'text-secondary-500'} ${classes}`}
    >
      {children}
    </span>
  );
};

export default B3;
