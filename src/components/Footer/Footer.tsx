import Image from 'next/image';
import React from 'react';

import emailIcon from '@/assets/icons/email-icon.svg';
import Logo from '@/assets/icons/logo.svg';
import phoneIcon from '@/assets/icons/phone-icon.svg';

import B1 from '../UI/Body/B1';
import H4 from '../UI/Headings/H4';

const Footer = () => {
  return (
    <footer className="h-full px-[150px] sm:max-md:px-6">
      <div className="h-[1px] w-full bg-border-light"></div>
      <div className="flex  w-full justify-between py-[60px] sm:max-md:flex-col sm:max-md:gap-9">
        <div className="flex w-1/2 flex-col gap-[60px]">
          <Image
            src={Logo}
            alt="logo"
            height={36}
            width={173}
            className="h-[36px] w-[173px]  sm:max-md:h-[24px] sm:max-md:w-[116px]"
          />
          <B1 classes="w-full sm:max-md:hidden">
            Copyright © 2023 easypaisa | All Rights Reserved{' '}
          </B1>
        </div>
        <div className="flex w-1/3 flex-col gap-6 sm:max-md:w-full">
          <H4>Contact us</H4>
          <div className="flex gap-3">
            <Image src={emailIcon} alt="email" height={20} width={20} />
            <B1 classes="w-full">businesspartnersupport@telenorbank.pk</B1>
          </div>
          <div className="flex gap-3">
            <Image src={phoneIcon} alt="phone" height={20} width={20} />
            <B1 classes="w-full">62632 (10 AM to 5 PM)</B1>
          </div>
        </div>
        <B1 classes="sm:max-md:block hidden">
          Copyright © 2023 easypaisa | All Rights Reserved{' '}
        </B1>
      </div>
    </footer>
    // <footer className="sm:max-md:px-[24px] flex w-full flex-col items-center justify-center gap-[60px] px-[150px] pb-[60px]">
    //   <div className="h-[1px] w-full bg-border-light"></div>
    //   <div className="sm:max-md:flex-col sm:max-md:gap-[36px] flex w-full items-start justify-between gap-[499px]">
    //     <div className="flex flex-col items-start gap-[60px]">
    //       <div>
    //         <Image
    //           src={Logo}
    //           alt="logo"
    //           height={36}
    //           width={173}
    //           className="sm:max-md:h-[24px] sm:max-md:w-[116px]  h-[36px] w-[173px]"
    //         />
    //       </div>
    //       <div
    //         id="Copyright"
    //         className="sm:max-md:hidden sm:max-md:text-sm block text-base font-normal leading-tight text-secondary-600"
    //       >
    //         Copyright © 2023 Easypaisa | All Rights Reserved{' '}
    //       </div>
    //     </div>
    //     <div className="sm:max-md:gap-4 flex flex-col items-start justify-between gap-6">
    //       <div
    //         id="FooterTitle"
    //         className="sm:max-md:text-base sm:max-md:leading-5 text-2xl font-semibold text-secondary-base"
    //       >
    //         Contact us
    //       </div>
    //       <div className="flex flex-row items-start gap-3">
    //         <Image src={emailIcon} alt="email" height={20} width={20} />
    //         <div className=" sm:max-md:text-sm text-base font-normal leading-tight text-secondary-600">
    //           businesspartnersupport@telenorbank.pk
    //         </div>
    //       </div>
    //       <div className="flex flex-row items-center gap-3">
    //         <Image src={phoneIcon} alt="phone" height={20} width={20} />
    //         <div className=" sm:max-md:text-sm text-base font-normal leading-tight text-secondary-600">
    //           62632 (10 AM to 5 PM)
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       id="Copyright"
    //       className="sm:max-md:block sm:max-md:text-sm hidden text-base font-normal leading-tight text-secondary-600"
    //     >
    //       Copyright © 2023 Easypaisa | All Rights Reserved{' '}
    //     </div>
    //   </div>
    // </footer>
  );
};

export default Footer;
