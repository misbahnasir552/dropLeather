import Image from 'next/image';
import React from 'react';

import elipseBottomLeft from '@/assets/images/Ellipse Bottom Left.svg';
import elipseTopRight from '@/assets/images/Ellipse Top Right.svg';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-primary-900 px-[380px] align-middle sm:max-md:px-[24px]">
      <div className="h-full">
        <Image
          src={elipseBottomLeft}
          alt="bottomLeftElipse"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0"
          priority
          quality={75}
        />
        <Image
          src={elipseTopRight}
          alt="topRightElipse"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0"
          priority
          quality={75}
        />
      </div>
      <div className="z-5 relative h-max w-[680px] rounded-lg border-[1px] border-border-light bg-neutral-white-base px-[60px] py-9 sm:max-md:w-full sm:max-md:px-[20px] sm:max-md:py-8">
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
