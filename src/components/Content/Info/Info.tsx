import React from 'react';

import Card from '@/components/UI/Card/Card';
import type { IInfoProp } from '@/interfaces/interface';

const Info = ({ title, cardsArray }: IInfoProp): JSX.Element => {
  return (
    <div className="inline-flex w-full flex-col items-start justify-center px-[150px] pb-[120px] pt-[80px] sm:max-md:px-[24px] sm:max-md:pb-[80px]">
      <div className="flex w-full flex-col justify-center gap-9 text-base sm:max-md:gap-5">
        <div className="flex flex-col items-start justify-center gap-2">
          {title === 'payment gateway' ? (
            <>
              <h1 className="heading-primary sm:max-md:text-[32px]">
                6 powerful reasons to chose Easypaisa <br />
                <span className="text-primary-base">Payment Gateway</span>
              </h1>
              <p className="text-base font-normal leading-tight sm:max-md:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmodtempor incididunt ut labore et dolore
              </p>
            </>
          ) : title === 'payment link' ? (
            <>
              <h1 className="heading-primary sm:max-md:text-[32px]">
                Get Registered, start accepting payments.
                <br />
                <span className="text-primary-base">It’s that simple!</span>
              </h1>
              <p className="text-base font-normal sm:max-md:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmodtempor incididunt ut labore et dolore
              </p>
            </>
          ) : title === 'qr payments' ? (
            <>
              <h1 className="heading-primary sm:max-md:text-[32px]">
                Get Registered, start accepting payments.
                <br />
                <span className="text-primary-base">It’s that simple!</span>
              </h1>
              <p className="text-base font-normal sm:max-md:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmodtempor incididunt ut labore et dolore
              </p>
            </>
          ) : title === 'subscription' ? (
            <>
              <h1 className="heading-primary sm:max-md:text-[32px]">
                Get Registered, start accepting payments.
                <br />
                <span className="text-primary-base">It’s that simple!</span>
              </h1>
              <p className="text-base font-normal leading-tight sm:max-md:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmodtempor incididunt ut labore et dolore
              </p>
            </>
          ) : title === 'mini apps' ? (
            <>
              <h1 className="heading-primary sm:max-md:text-[32px]">
                Get Registered, start accepting payments.
                <br />
                <span className="text-primary-base">It’s that simple!</span>
              </h1>
              <p className="text-base font-normal leading-tight sm:max-md:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmodtempor incididunt ut labore et dolore
              </p>
            </>
          ) : (
            <>
              <h1 className="heading-primary leading-[40px] sm:max-md:text-[32px]">
                Designed for{' '}
                <span className="text-primary-base">Entrepreneurs</span>
              </h1>
              <p className="text-base font-normal leading-tight text-secondary-600 sm:max-md:text-sm ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmodtempor incididunt ut labore et dolore
              </p>
            </>
          )}
        </div>

        {/* <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 "> */}
        <div className="flex flex-row gap-5 sm:max-md:flex-col">
          {cardsArray?.map((item, index) => {
            return (
              <Card
                key={index}
                logo={item.logo}
                label={item.label}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Info;
