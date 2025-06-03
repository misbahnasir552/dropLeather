'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ClockLoader } from 'react-spinners';

// import GoogleIcon from "@/assets/icons/GoogleIcon.png"
import GoogleIcon from '@/assets/icons/googleIcon.svg';
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
          ? 'hover:none border-neutral-white-100 bg-neutral-black-300'
          : 'cursor-pointer rounded-lg border-[0.79px] border-neutral-white-100'
      } ${className}`}
      disabled={isDisabled || disable}
      onClick={handleClick}
    >
      <div className="flex flex-row gap-3">
        <Image src={GoogleIcon} alt="logo" width={18} height={18} />
        <div className="flex w-full items-center justify-center gap-2  text-neutral-black-50">
          {label}
          {/* <B1 textColor='text-screen-white'>{label}</B1> */}
          {isDisabled && <ClockLoader color="#FFFFFF" size={14} />}
        </div>
      </div>
    </button>
  );
};

export default Button;
