'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import B1 from '@/components/UI/Body/B1';
import H4 from '@/components/UI/Headings/H4';
import type { ICardProps } from '@/interfaces/interface';

const Card = ({ logo, label, description }: ICardProps) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  return (
    <div
      className={`group flex cursor-pointer flex-col items-start justify-start gap-[60px] rounded-[8px] border-[0.5px] border-solid border-border-light bg-screen-grey px-5 py-6 duration-300 ease-out hover:bg-primary-base hover:text-neutral-white-base sm:max-md:gap-[24px] sm:max-md:py-4 `}
      // className={`group flex min-h-[300px] cursor-pointer flex-col items-start justify-start gap-[60px] rounded-[8px] border-[0.5px] border-solid border-border-light bg-screen-grey px-5 py-6 duration-300 ease-out hover:bg-primary-base hover:text-neutral-white-base sm:max-md:gap-[24px] sm:max-md:py-4`}

      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {isCardHovered ? (
        <div className="h-12 w-12">
          <Image src={logo.image2} alt={'image2'} />
        </div>
      ) : (
        <div className="h-12 w-12">
          <Image src={logo.image1} alt={'image'} />
        </div>
      )}

      <div className="flex min-h-[250px] min-w-[270px] flex-col items-start gap-4 self-stretch sm:max-md:gap-2">
        <div className="sm:max-md:text-base">
          <>
            <div className="flex flex-col gap-4">
              <H4 className="w-1/3 group-hover:text-neutral-white-base">
                {label}
              </H4>
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
