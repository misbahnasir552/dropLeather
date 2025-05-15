'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import arrowRight from '@/assets/icons/arrow-right.svg';
import arrowRightWhite from '@/assets/icons/arrow-rightWhite.svg';
import OvalLoading from '@/components/Loader/OvalLoading';
import type { ILoginCard } from '@/interfaces/interface';
// import apiClient from '@/api/apiClient';
// import { setPageData } from '@/redux/features/formSlices/fieldSlice';
// import { setPageData } from '@/redux/features/formSlices/fieldSlice';

export default function LoginCard({
  title,
  description,
  routeName,
  type,
  onClick,
}: ILoginCard) {
  // const userData = useAppSelector((state) => state.auth);

  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async (type: any) => {
    console.log(type, 'type');

    if (routeName) {
      setLoading(true);
      console.log('route name is', routeName);
      router.push(routeName);
    } else {
      console.warn('No routeName provided');
    }

    // }
    // router.push(routeName);
    // dispatch(setJourneyType(type));
  };
  return (
    <>
      {loading && <OvalLoading />}
      <div
        className={`group flex w-[270px] rounded-lg border-[0.5px] border-border-light bg-screen-grey px-5 py-6 duration-300 ease-out hover:cursor-pointer hover:bg-primary-base sm:max-md:w-full`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => (onClick ? onClick() : handleClick(type))}
      >
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-semibold leading-[30px] text-secondary-base group-hover:text-neutral-white-base sm:max-md:text-xl sm:max-md:leading-6">
            {title}
          </p>
          <p className="text-sm font-normal text-secondary-600 group-hover:text-neutral-white-base sm:max-md:leading-[18px]">
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
