import React from 'react';

import subscriptionBG from '@/assets/images/subscription.jpg';
import AcceptPaymentBanner from '@/components/Content/AcceptPaymentBanner/AcceptPaymentBanner';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Card from '@/components/UI/Card/Card';
import UIWrapper from '@/components/UI/Wrappers/UIWrapper';
import { subscriptionCards } from '@/utils/data';

const Subscription = () => {
  return (
    <>
      <AcceptPaymentBanner
        banner={subscriptionBG}
        title={{
          main: 'Automate recurring payments',
          sub: 'with easypaisa subscriptions',
        }}
        description="Collect recurring payments with multiple payment options to enable
              growth for your subscription based businesses"
      />
      <div className="flex flex-col pb-[120px] sm:max-md:pb-[80px]">
        <UIWrapper>
          <Header
            title={{
              main: '6 powerful reasons to chose Easypaisa ',
              sub: 'Payment Gateway',
            }}
            description={
              ''
              // 'Lorem ipsum dolor sit amet consectetur adipiscing elitsed doeiusmodtempor incididunt ut labore et dolore'
            }
          />
          <div className="flex flex-row gap-5 sm:max-md:flex-col">
            {subscriptionCards?.map((item, index) => {
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
        </UIWrapper>
      </div>

      <Footer />
    </>
  );
};

export default Subscription;
