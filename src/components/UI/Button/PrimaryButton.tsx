'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

// import { ClockLoader } from 'react-spinners';
import type { IButton } from '@/interfaces/interface';

import H6 from '../Headings/H6';

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
      className={` h-[35px] rounded-lg  ${
        isDisabled || disable
          ? 'hover:none bg-neutral-grey-100'
          : 'cursor-pointer bg-neutral-black-base '
      } ${className}`}
      disabled={isDisabled || disable}
      onClick={handleClick}
    >
      <H6
        className="flex w-full items-center justify-center gap-2 text-[15px]"
        textColor="text-neutral-grey-base"
      >
        {label}
        {/* <B1 textColor='text-screen-white'>{label}</B1> */}
        {/* {isDisabled && <ClockLoader color="#FFFFFF" size={14} />} */}
      </H6>
    </button>
  );
};

export default Button;
