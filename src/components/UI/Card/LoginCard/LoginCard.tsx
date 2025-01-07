'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import arrowRight from '@/assets/icons/arrow-right.svg';
import arrowRightWhite from '@/assets/icons/arrow-rightWhite.svg';
import type { ILoginCard } from '@/interfaces/interface';

export default function LoginCard({
  title,
  description,
  routeName, // onClickHandler
}: ILoginCard) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    console.log('route name is', routeName);
    router.push(routeName);
  };
  return (
    <>
      <div
        className={`sm:max-md:w-full group flex w-[270px] rounded-lg border-[0.5px] border-border-light bg-screen-grey px-5 py-6 duration-300 ease-out hover:cursor-pointer hover:bg-primary-base`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className="flex flex-col gap-4">
          <p className="sm:max-md:text-xl sm:max-md:leading-6 text-2xl font-semibold leading-[30px] text-secondary-base group-hover:text-neutral-white-base">
            {title}
          </p>
          <p className="sm:max-md:leading-[18px] text-sm font-normal text-secondary-600 group-hover:text-neutral-white-base">
            {description}{' '}
          </p>
          <div className="flex w-full gap-1">
            <p className="text-sm font-semibold text-secondary-base hover:cursor-pointer group-hover:text-neutral-white-base">
              Get Started
            </p>
            {isHovered ? (
              <Image src={arrowRightWhite} alt="arrowRightW" />
            ) : (
              <Image src={arrowRight} alt="arrowRight" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
