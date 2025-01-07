import React from 'react';

import LoginCard from '@/components/UI/Card/LoginCard/LoginCard';

const LoginSucess = () => {
  const LoginCardData = [
    {
      title: 'Sandbox Integrations',
      description:
        'All you need is to select payment mode of your integration need and follow step by step integration guide to begin testing ',
      routeName: 'business-nature',
    },
    {
      title: 'Production Onboarding',
      description:
        'All you need is to select payment mode of your integration need and follow step by step integration guide to begin testing ',
      routeName: 'business-nature',
    },
    {
      title: 'Continue to My Dashboard',
      description:
        'All you need is to select payment mode of your integration need and follow step by step integration guide to begin testing ',
      routeName: 'business-nature',
    },
    // {
    //   title: 'Continue to My Dashboard',
    //   description:
    //     'All you need is to select payment mode of your integration need and follow step by step integration guide to begin testing ',
    //   routeName: 'xyz',
    // },
  ];

  return (
    <>
      <div className="flex flex-col gap-9 px-[150px] py-[60px] sm:max-md:gap-6 sm:max-md:px-[24px] sm:max-md:py-[36px]">
        <div className="flex flex-col gap-2">
          <p className="text-5xl font-semibold leading-[60px] text-secondary-base sm:max-md:text-[32px] sm:max-md:leading-[40px]">
            Welcome to easypaisa{' '}
            <span className="text-primary-base"> Developer Portal </span>
          </p>
          <p className="text-base font-normal leading-5 text-secondary-600 sm:max-md:text-sm sm:max-md:leading-[18px] ">
            Your Sandbox account and Store has been automatically created.
            Details have been sent to your email address. (only show first time)
          </p>
        </div>
        <div className="flex gap-5 sm:max-md:flex-col sm:max-md:gap-6">
          {LoginCardData.map((item, index) => (
            <LoginCard
              key={index}
              title={item.title}
              description={item.description}
              routeName={item.routeName}
              // onClickHandler={handleNavigate}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LoginSucess;
