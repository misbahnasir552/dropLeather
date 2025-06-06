'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import B1 from '@/components/UI/Body/B1';
import H4 from '@/components/UI/Headings/H4';
import type { ICardProps } from '@/interfaces/interface';

const Card = ({ logo, label, description }: ICardProps) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  console.log(isCardHovered);
  return (
    <div
      className={`group flex w-[492px] cursor-pointer flex-col items-start justify-start gap-[60px] rounded-[12px] border-[0.5px] border-solid border-border-dark bg-screen-grey px-[15px] py-[13px]  hover:border-[3px] hover:border-border-blue `}
      // className={`group flex min-h-[300px] cursor-pointer flex-col items-start justify-start gap-[60px] rounded-[8px] border-[0.5px] border-solid border-border-light bg-screen-grey px-5 py-6 duration-300 ease-out hover:bg-primary-base hover:text-neutral-white-base sm:max-md:gap-[24px] sm:max-md:py-4`}

      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div className="flex  flex-col items-start self-stretch ">
        <div className="flex gap-[12px]">
          <>
            <div className="h-12 w-12">
              <Image src={logo} alt={'image'} />
            </div>
          </>
          <>
            <div className="flex flex-col justify-center">
              <H4 className="">{label}</H4>
              <B1 classes="w-full group-hover:text-neutral-white-base">
                {description}
              </B1>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Card;
