import Image from 'next/image';
import React from 'react';

import albarakabankLogo from '@/assets/images/partners/albaraka-banking.png';
import alfalahbankLogo from '@/assets/images/partners/alfalah-banking.png';
import alliedbankLogo from '@/assets/images/partners/allied-banking.png';
import askaribankLogo from '@/assets/images/partners/askari-banking.png';
import faysalbankLogo from '@/assets/images/partners/faysal banking.png';
import habibbankLogo from '@/assets/images/partners/habib-banking.png';
import islamibankLogo from '@/assets/images/partners/islami-banking.png';
import khushalibankLogo from '@/assets/images/partners/khushali-banking.png';
import mufgbankLogo from '@/assets/images/partners/mufg-banking.png';
import mustakeembankLogo from '@/assets/images/partners/mustakeem-banking.png';
import soneribankLogo from '@/assets/images/partners/soneri-banking.png';
import ublbankLogo from '@/assets/images/partners/ubl-banking.png';
import Header from '@/components/Header/Header';

const Partners = (): JSX.Element => {
  const partnersImages = [
    albarakabankLogo,
    alliedbankLogo,
    mufgbankLogo,
    soneribankLogo,
    ublbankLogo,
    mustakeembankLogo,
    khushalibankLogo,
    askaribankLogo,
    alfalahbankLogo,
    faysalbankLogo,
    habibbankLogo,
    islamibankLogo,
  ];

  return (
    <>
      <div className="grid w-full flex-col gap-9 px-[150px] align-middle sm:max-md:gap-[20px] sm:max-md:px-[24px]">
        {/* <div className="flex flex-col justify-center gap-9 align-middle">
          <h1 className="text-center text-5xl font-semibold sm:max-md:text-start sm:max-md:text-[32px]">
            We power Pakistan’s biggest{' '}
            <span className="text-primary-base">online brands</span>
          </h1>
        </div> */}

        <Header
          title={{ main: ' We power Pakistan’s biggest', sub: 'online brands' }}
          centerTitle={true}
        />

        <div className="grid w-full  grid-cols-6 gap-5 sm:max-md:grid-cols-4 sm:max-md:gap-[24px]">
          {partnersImages.map((item, index) => (
            <div key={index} className="flex aspect-[3/4] sm:max-md:p-[0px]">
              {/* <div key={index} className="flex h-[173px] w-full sm:max-md:px-[0px] sm:max-md:py-[0px]"> */}

              {/* <div key={index} className="flex justify-center align-middle px-5 py-9 sm:max-md:px-[0px] sm:max-md:py-[0px]"> */}

              <Image
                src={item}
                key={index}
                alt={`Partner Logo ${index}`}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Partners;
