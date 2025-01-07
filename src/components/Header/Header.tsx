import React from 'react';

import H1 from '@/components/UI/Headings/H1';
import type { IHeaderProps } from '@/interfaces/interface';

import B1 from '../UI/Body/B1';

function Header({ title, description, centerTitle }: IHeaderProps) {
  const titleCase = centerTitle ? 'text-center w-full' : 'text-start';
  const widthCase = centerTitle ? 'w-full' : 'max-w-[900px]';
  return (
    <>
      <div className="flex flex-col justify-center gap-2 align-middle">
        <H1
          className={`${widthCase} ${titleCase} font-semibold sm:max-md:text-start sm:max-md:text-[32px]`}
        >
          <span className="text-secondary-base sm:max-md:block">
            {title.main} {''}
          </span>
          <span className=" text-primary-base">{title.sub}</span>
        </H1>
        {/* <p className="text-base font-normal leading-tight text-secondary-600 sm:max-md:text-sm "> */}
        <B1>{description}</B1>
        {/* </p> */}
      </div>
    </>
  );
}

export default Header;
