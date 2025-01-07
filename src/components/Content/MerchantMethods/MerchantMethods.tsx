import Image from 'next/image';
import React from 'react';

import B1 from '@/components/UI/Body/B1';
import H1 from '@/components/UI/Headings/H1';
import { MerchantMethodsData } from '@/utils/data';

const MerchantMethods = () => {
  return (
    <div id="NewRootRoot" className="flex w-full flex-col">
      <div className="flex flex-col gap-5 pb-[93px] sm:max-md:pb-[80px] ">
        {MerchantMethodsData.map((item, index) => (
          // <div key={index}>
          <div id={item.id} key={index} className={item.className}>
            <Image
              src={item.image.src}
              alt={item.image.alt}
              layout="fill"
              objectFit="cover"
              quality={100}
              className="absolute inset-0 object-left"
            />
            <div
              className={
                typeof item.description === 'string'
                  ? 'relative flex max-w-[560px] shrink-0 flex-col items-start justify-center gap-12 rounded-lg bg-neutral-white-base px-[32px] py-[40px] shadow-[0px_4px_16px_0px_rgba(51,_51,_51,_0.08)] sm:max-md:max-w-full sm:max-md:gap-6 sm:max-md:px-[20px] sm:max-md:py-4'
                  : // ? 'relative flex max-w-[560px] shrink-0 flex-col items-start justify-center gap-12 rounded-lg bg-neutral-white-base px-[32px] py-[40px] shadow-[0px_4px_16px_0px_rgba(51,_51,_51,_0.08)] sm:max-md:gap-6 sm:max-md:px-[20px] sm:max-md:py-4'

                    'relative flex shrink-0 flex-col place-items-center gap-12 rounded-lg bg-neutral-white-base p-10 shadow-[0px_4px_16px_0px_rgba(51,_51,_51,_0.08)] sm:max-md:gap-6 sm:max-md:px-[20px] sm:max-md:py-4'
              }
            >
              <H1>
                {item.label.main} {''}
                <span className="text-primary-base">{item.label.sub}</span>
              </H1>
              {/* <div className="sm:max-md:text-[32px] text-5xl font-semibold leading-tight text-secondary-base">
                {item.label.main} {""}
                <span className="text-primary-base">{item.label.sub}</span>
              </div> */}
              {typeof item.description === 'string' ? (
                <>
                  {/* <div className="sm:max-md:text-sm sm:max-md:text-secondary-400 text-base font-normal leading-tight text-secondary-600">
                    {item.description}
                  </div> */}

                  <B1>{item.description}</B1>
                </>
              ) : (
                <>
                  <div className="grid gap-9 md:grid-cols-1 lg:grid-cols-3">
                    <div className="text-base font-normal leading-tight text-secondary-600 sm:max-md:text-sm sm:max-md:text-secondary-400">
                      <h1 className="font-extrabold">
                        {item.heading?.head1} {''}
                      </h1>{' '}
                      <br></br>
                      {item.description.desc1}
                    </div>
                    <div className="text-base font-normal leading-tight text-secondary-600 sm:max-md:text-sm sm:max-md:text-secondary-400">
                      <h1 className="font-extrabold">
                        {item.heading?.head2} {''}
                      </h1>{' '}
                      <br></br>
                      <br></br>
                      {item.description.desc2}
                    </div>
                    <div className="text-base font-normal leading-tight text-secondary-600 sm:max-md:text-sm sm:max-md:text-secondary-400">
                      <h1 className="font-extrabold">
                        {item.heading?.head3} {''}
                      </h1>
                      <br></br>
                      <br></br>
                      {item.description.desc3}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchantMethods;
