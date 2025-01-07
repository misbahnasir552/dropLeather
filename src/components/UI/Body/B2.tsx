import React from 'react';

const B2 = ({ children, textColor, classes }: any) => {
  return (
    // <span
    //   className='text-sm font-normal leading-tight text-secondary-base'
    // >
    //   {children}
    // </span>
    <span
      className={`text-sm font-normal leading-tight ${
        textColor || `text-secondary-500`
      } ${classes}`}
    >
      {children}
    </span>
  );
};

export default B2;
