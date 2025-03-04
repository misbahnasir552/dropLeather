'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { ClockLoader } from 'react-spinners';

import type { IButton } from '@/interfaces/interface';

const Button = ({
  label,
  type = 'button',
  onClickHandler,
  routeName,
  className,
  isDisabled = false,
  disable,
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
        isDisabled || disable
          ? 'hover:none bg-neutral-black-300'
          : 'cursor-pointer bg-primary-base'
      } ${className}`}
      disabled={isDisabled || disable}
      onClick={handleClick}
    >
      <div className="flex w-full items-center justify-center gap-2">
        {label}
        {/* <B1 textColor='text-screen-white'>{label}</B1> */}
        {isDisabled && <ClockLoader color="#FFFFFF" size={14} />}
      </div>
    </button>
  );
};

export default Button;
