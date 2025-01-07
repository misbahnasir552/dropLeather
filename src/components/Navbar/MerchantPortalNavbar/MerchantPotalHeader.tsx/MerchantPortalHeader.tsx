import Image from 'next/image';
import React from 'react';

// import Link from "next/link";
import Logo from '@/assets/icons/logo.svg';
import B2 from '@/components/UI/Body/B2';
import H6 from '@/components/UI/Headings/H6';

function MerchantPortalHeader() {
  return (
    <div className="flex w-full border-b-2 border-border-light py-4 sm:px-6 md:px-[150px]">
      <div className="flex w-full items-center justify-between ">
        <Image
          src={Logo}
          width={173}
          height={28}
          alt="logo"
          className="cursor-pointer"
        />
        <div className="flex cursor-pointer items-center gap-6">
          <B2 textColor="text-secondary-base">Logout</B2>
          <div className="h-[10px] w-[1px] bg-border-dark" />
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full border-2 bg-secondary-base p-[10px]">
            <H6 textColor="text-screen-white">F</H6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MerchantPortalHeader;
