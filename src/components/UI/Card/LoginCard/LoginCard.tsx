'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import arrowRight from '@/assets/icons/arrow-right.svg';
import arrowRightWhite from '@/assets/icons/arrow-rightWhite.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { ILoginCard } from '@/interfaces/interface';
import { setPageData } from '@/redux/features/formSlices/fieldSlice';
// import { setJourneyType } from '@/redux/features/adminSlices/corporateSlices/corporateJourneyTypeSlice';

export default function LoginCard({
  title,
  description,
  routeName, // onClickHandler
  type, // isDisabled,
}: ILoginCard) {
  const userData = useAppSelector((state) => state.auth);

  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  // const [journeyType, setJourneyType] = useState('');
  const dispatch = useAppDispatch();

  // console.log("isdisabled",isDisabled)
  const handleClick = async (type: any) => {
    console.log(type, 'type');

    console.log('route name is', routeName);
    // if (routeName) {
    if (userData?.isrequestRevision) {
      dispatch(setPageData([]));
      try {
        const response = await apiClient.get(
          `/corporate/requestRevisionDynamicFields?email=${userData.email}`,
        );
        console.log('LOGIN CARD API', response.data);

        dispatch(setPageData(response.data));

        if (type === 'viewApplicationStatus') {
          console.log('App Status ROUTE ');
          router.push(routeName);
        } else if (
          response.data.page?.[0]?.name === 'Application Form' ||
          response.data.page?.[1]?.name === 'Application Form'
        ) {
          console.log('IF LOGIN ROUTE ');

          router.push('business-nature/application-form');
        } else {
          console.log('LOGIN ROUTE ');

          router.push('business-nature/attachments');
        }
      } catch (e) {
        console.log('Set Page info for Rquest Revision Failed!', e);
      }
    } else {
      router.push(routeName);
    }
    // }
    // router.push(routeName);
    // dispatch(setJourneyType(type));
  };
  return (
    <>
      {/*     
    {isDisabled?
        <div
          className={`sm:max-md:w-full group flex w-[270px] rounded-lg border-[0.5px] border-border-light bg-screen-grey px-5 py-6 `}
         
        >
          <div className="flex flex-col gap-4">
            <p className="sm:max-md:text-xl sm:max-md:leading-6 text-2xl font-semibold leading-[30px] text-secondary-400 ">
              {title}
            </p>
            <p className="sm:max-md:leading-[18px] text-sm font-normal text-secondary-300 ">
              {description}{' '}
            </p>
            
          </div>
        </div>
    
    :( */}

      <div
        className={`group flex w-[270px] rounded-lg border-[0.5px] border-border-light bg-screen-grey px-5 py-6 duration-300 ease-out hover:cursor-pointer hover:bg-primary-base sm:max-md:w-full`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleClick(type)}
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
      {/* )
      } */}
    </>
  );
}
