'use client';

import React from 'react';

import type { IButton } from '@/interfaces/interface';

const Button = ({
  label,
  //  onClickHandler = () => {}

  className,
}: IButton) => {
  return (
    <button
      className={`${className}`}
      // onClick={onClickHandler}
    >
      {label}
    </button>
  );
};

export default Button;
