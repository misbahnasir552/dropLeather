import Image from 'next/image';
import React from 'react';

import Logo from '@/assets/icons/logo.svg';
import heroBanner from '@/assets/images/hero1.png';
import B1 from '@/components/UI/Body/B1';
import Button from '@/components/UI/Button/PrimaryButton';

const HeroBanner = (): JSX.Element => {
  return (
    <main className="relative flex min-h-[594px] items-center justify-start p-[150px] sm:max-md:items-start sm:max-md:px-[24px] sm:max-md:pt-[124px] ">
      <div className="bg-primary-600">
        <Image
          src={heroBanner}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          // width={50}
          quality={100}
          className="absolute inset-0 max-w-full object-left"
        />
      </div>
      {/* </div> */}
      <div className="relative flex flex-col items-start justify-center gap-9 rounded-lg">
        <div className="flex flex-col gap-2 ">
          <span className="flex items-center justify-start gap-2 ">
            <p className="text-2xl font-semibold text-secondary-base sm:max-md:text-base">
              Welcome to
            </p>
            <Image src={Logo} alt="logo" width={100} height={40} />
          </span>
          <p className="text-5xl font-semibold leading-tight text-secondary-base sm:max-md:text-[32px]">
            Merchant Portal
          </p>
          <B1 textColor="text-secondary-base" classes="w-3/5">
            Where every transaction begins, explore, <br /> manage and thrive
            with our powerful tools.
          </B1>
        </div>
        <Button
          label="Sign up"
          className="button-primary w-[200px] px-3 py-[19px] sm:max-md:text-sm"
          routeName="/sign-up"
        />
      </div>
    </main>
  );
};

export default HeroBanner;
