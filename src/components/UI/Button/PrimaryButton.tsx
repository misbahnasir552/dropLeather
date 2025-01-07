'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import type { IButton } from '@/interfaces/interface';

const Button = ({
  label,
  type = 'button',
  onClickHandler,
  routeName,
  className,
  isDisabled = false,
}: IButton) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClickHandler) {
      onClickHandler();
    }
    if (routeName) {
      router.push(routeName);
    }
  };
  // console.log("Button running");

  return (
    <button
      data-label={label}
      type={type}
      className={`${
        isDisabled
          ? 'hover:none cursor-default bg-neutral-black-300'
          : 'cursor-pointer bg-primary-base'
      } ${className}`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      <div className="w-full">{label}</div>
    </button>
  );
};

export default Button;
